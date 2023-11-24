import { ITaskState } from "@/models/tasks/ITaskState";
import { AddTaskInStore } from "@/services/tasks/AddTaskInStore";
import { CompleteTaskItem } from "@/services/tasks/CompleteTaskItem";
import { EditTaskItem } from "@/services/tasks/EditTaskItem";
import { RemoveTaskInStore } from "@/services/tasks/RemoveTaskInStore";
import { UpdateTaskItem } from "@/services/tasks/UpdateTaskItem";
import { useAppStore } from "@/store/useAppStore";
import {
  ActionIcon,
  Button,
  Card,
  Drawer,
  Grid,
  Group,
  Stack,
  Textarea,
  Tooltip,
  useMantineTheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconHandGrab, IconListCheck, IconWand } from "@tabler/icons-react";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { BuildDnDStyles } from "../utils/BuildDnDStyles";
import { TaskItemMenuOptions } from "./TaskItemMenuOptions";

export const TaskDrawer = () => {
  const { colors } = useMantineTheme();

  const [opened, { open, close }] = useDisclosure(false);

  const existingTasks = useAppStore((s) => s.tasks);

  const [tasks, setTasks] = useState<ITaskState[]>(existingTasks);

  const [newTaskDescription, setNewTaskDescription] = useState<string>();

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
      return;
    }
  };

  const onUpdateTask = (updatedTaskItem: ITaskState) => {
    updatedTaskItem.state = "PROGRESS";
    UpdateTaskItem(updatedTaskItem);
    EditTaskItem(updatedTaskItem.id, false);
    setNewTaskDescription(undefined);
  };

  const onEditTaskItem = (taskId: string) => {
    EditTaskItem(taskId, true);
  };

  const onRemoveTask = (taskId: string) => {
    RemoveTaskInStore(taskId);
  };

  const onAIResponse = (aiResponse: string) => {
    console.info(aiResponse);
    setNewTaskDescription(aiResponse);
  };

  const onCompleteTask = (taskId: string) => {
    CompleteTaskItem(taskId);
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
            fullWidth
            variant="outline"
            size="xs"
            mb={"md"}
            color="primary"
            onClick={() =>
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
              ])
            }
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
                          <Grid>
                            <Grid.Col span={11} pr={0}>
                              <>
                                <Textarea
                                  disabled={!task.editMode}
                                  rightSection={
                                    <TaskItemMenuOptions
                                      task={task}
                                      onAIResponse={onAIResponse}
                                      onEditTaskItem={onEditTaskItem}
                                      onRemoveTask={onRemoveTask}
                                      onCompleteTask={onCompleteTask}
                                    />
                                  }
                                  value={
                                    task.editMode && newTaskDescription
                                      ? newTaskDescription
                                      : task.description
                                  }
                                  onChange={(e) =>
                                    setNewTaskDescription(e.target.value)
                                  }
                                  styles={{
                                    input: {
                                      border: "none",
                                      padding: "0 0",
                                      "&[data-disabled]": {
                                        backgroundColor: "transparent",
                                        color: "black",
                                      },
                                      textDecoration:
                                        task.state === "COMPLETED"
                                          ? "line-through"
                                          : undefined,
                                    },
                                    rightSection: {
                                      display: "flex",
                                      justifyContent: "end",
                                      alignItems: "flex-start",
                                    },
                                  }}
                                />
                                {task.editMode && (
                                  <Group spacing={0}>
                                    <Button
                                      variant="subtle"
                                      color="green"
                                      size="xs"
                                      px={0}
                                      disabled={
                                        newTaskDescription === "" ||
                                        !newTaskDescription
                                      }
                                      onClick={() => {
                                        task.editMode && task.initializing
                                          ? onSaveTask()
                                          : onUpdateTask({
                                              ...task,
                                              description:
                                                newTaskDescription ?? "",
                                            });
                                      }}
                                    >
                                      {task.initializing ? "Save" : "Update"}
                                    </Button>

                                    <Button
                                      variant="subtle"
                                      color="dark"
                                      size="xs"
                                      px={"xs"}
                                    >
                                      <Tooltip
                                        label={"AI Assistant"}
                                        styles={{ tooltip: { fontSize: 10 } }}
                                        position="bottom"
                                      >
                                        <IconWand
                                          stroke={1}
                                          color="black"
                                          size={20}
                                        />
                                      </Tooltip>
                                    </Button>
                                  </Group>
                                )}
                              </>
                            </Grid.Col>

                            <Grid.Col span={1} pl={0}>
                              <ActionIcon>
                                <IconHandGrab
                                  style={{ width: "70%", stroke: "1.5" }}
                                />
                              </ActionIcon>
                            </Grid.Col>
                          </Grid>
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
// 1. Apply the onClick for saving (changing editMode to false) and removing - DONE
// 2. Create servicies and logic for AI assi - NEXT
// 3. Refactor component
