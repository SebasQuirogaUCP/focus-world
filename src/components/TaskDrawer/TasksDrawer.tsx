import { ITaskState } from "@/models/tasks/ITaskState";
import { AddTaskInStore } from "@/services/tasks/AddTaskInStore";
import { EditTaskItem } from "@/services/tasks/EditTaskItem";
import { TaskExistInStore } from "@/services/tasks/TaskExistInStore";
import { UpdateTaskItem } from "@/services/tasks/UpdateTaskItem";
import { useAppStore } from "@/store/useAppStore";
import {
  ActionIcon,
  Button,
  Card,
  Drawer,
  Stack,
  Tooltip,
  useMantineTheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconListCheck } from "@tabler/icons-react";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { BuildDnDStyles } from "../utils/BuildDnDStyles";
import { TaskDrawerItem } from "./TaskDrawerItem";

export const TaskDrawer = () => {
  const { colors } = useMantineTheme();

  const [opened, { open, close }] = useDisclosure(false);

  const existingTasks = useAppStore((s) => s.tasks);

  const [tasks, setTasks] = useState<ITaskState[]>(existingTasks);

  const [newTaskDescription, setNewTaskDescription] = useState<string>();

  const [isTaskItemCreation, setIsTaskItemCreation] = useState<boolean>(false);

  useEffect(() => {
    setTasks(existingTasks);
  }, [existingTasks]);

  const onSaveTask = () => {
    if (newTaskDescription) {
      const newTask: ITaskState = {
        createdAt: new Date().toLocaleDateString(),
        description: newTaskDescription,
        editMode: false,
        id: nanoid(),
        state: "PENDING",
        aiGenerated: false,
        initializing: false,
      };
      AddTaskInStore(newTask);
      setNewTaskDescription(undefined);
      setIsTaskItemCreation(false);
      return;
    }
  };

  const onUpdateTask = (updatedTaskItem: ITaskState) => {
    updatedTaskItem.state = "PROGRESS";
    UpdateTaskItem(updatedTaskItem);
    EditTaskItem(updatedTaskItem.id, false);
    setNewTaskDescription(undefined);
    setIsTaskItemCreation(false);
  };

  const onCancelTask = (task: ITaskState) => {
    const isNewTask = TaskExistInStore(task.id);

    if (isNewTask) {
      const newTasks = tasks.filter((t) => t.id !== task.id);
      setTasks(newTasks);
      return;
    }

    EditTaskItem(task.id, false);
    setNewTaskDescription(undefined);
    setIsTaskItemCreation(false);
  };

  const onEditTaskItem = (taskId: string) => {
    setIsTaskItemCreation(true);
    EditTaskItem(taskId, true);
  };

  const onAIResponse = (aiResponse: string) => {
    setNewTaskDescription(aiResponse);
  };

  const onChangeTaskDescription = (taskDescription: string | undefined) => {
    if (!taskDescription || taskDescription === "") return;
    setNewTaskDescription(taskDescription);
  };

  return (
    <>
      <Drawer
        opened={opened}
        onClose={close}
        title="Tasks"
        position="right"
        overlayProps={{ opacity: 0.5, blur: 4 }}
        styles={{
          header: { backgroundColor: colors.secondary },
          content: { backgroundColor: colors.secondary },
          title: { color: colors.primary[8], fontWeight: 500 },
        }}
      >
        <Stack>
          <Button
            disabled={isTaskItemCreation}
            fullWidth
            variant="outline"
            size="xs"
            mb={"md"}
            color="primary"
            onClick={() => {
              setIsTaskItemCreation(true);
              setTasks([
                ...tasks,
                {
                  createdAt: new Date().toLocaleDateString(),
                  description: "",
                  id: nanoid(),
                  state: "PENDING",
                  editMode: true,
                  initializing: true,
                },
              ]);
            }}
          >
            Create Task
          </Button>

          <Droppable droppableId="droppable" direction="vertical">
            {(provided, snapshot) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {tasks.map((task: ITaskState, index: number) => (
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                    {(provided, snapshot) => {
                      return (
                        <Card
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={BuildDnDStyles(
                            snapshot.isDragging,
                            provided.draggableProps.style,
                            colors.primary[8],
                            task.editMode
                          )}
                        >
                          <TaskDrawerItem
                            task={task}
                            onAIResponse={onAIResponse}
                            onEditTaskItem={onEditTaskItem}
                            onSaveTask={onSaveTask}
                            onUpdateTask={onUpdateTask}
                            onCancelTask={onCancelTask}
                            onChangeTaskDescription={onChangeTaskDescription}
                            newTaskDescription={newTaskDescription}
                          />
                        </Card>
                      );
                    }}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </Stack>
      </Drawer>

      <ActionIcon onClick={open} color="primary">
        <Tooltip label="Tasks">
          <IconListCheck size={"25"} stroke={"1"} />
        </Tooltip>
      </ActionIcon>
    </>
  );
};

// TODO:
// 1. Solve bugs hint => It seems like when editing or creating a new item, the state variable is messed up.
