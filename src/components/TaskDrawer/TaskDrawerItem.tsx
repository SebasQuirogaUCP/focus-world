import { ITaskState } from "@/models/tasks/ITaskState";
import { ActionIcon, Grid, Group, Textarea } from "@mantine/core";
import { IconHandGrab } from "@tabler/icons-react";
import { TaskDrawerEditButtons } from "./TaskDrawerEditButtons";
import { TaskItemMenuOptions } from "./TaskItemMenuOptions";

type Props = {
  task: ITaskState;
  onAIResponse: (aiResponse: string) => void;
  onEditTaskItem: (taskId: string) => void;
  onRemoveTask: (taskId: string) => void;
  onSaveTask: () => void;
  onUpdateTask: (updatedTaskState: ITaskState) => void;
  onCompleteTask: (taskId: string) => void;
  onChangeTaskDescription: (taskDescription: string | undefined) => void;
  newTaskDescription: string | undefined;
};

export const TaskDrawerItem = ({
  task,
  newTaskDescription,
  onAIResponse,
  onCompleteTask,
  onSaveTask,
  onUpdateTask,
  onEditTaskItem,
  onRemoveTask,
  onChangeTaskDescription,
}: Props) => {
  return (
    <Grid>
      <Grid.Col span={11} pr={0}>
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
          onChange={(e) => onChangeTaskDescription(e.target.value)}
          styles={{
            input: {
              border: "none",
              padding: "0 0",
              "&[data-disabled]": {
                backgroundColor: "transparent",
                color: "black",
              },
              textDecoration:
                task.state === "COMPLETED" ? "line-through" : undefined,
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
            <TaskDrawerEditButtons
              disabled={newTaskDescription === "" || !newTaskDescription}
              onClick={() => {
                task.editMode && task.initializing
                  ? onSaveTask()
                  : onUpdateTask({
                      ...task,
                      description: newTaskDescription ?? "",
                    });
              }}
              initializingTask={task.initializing}
            />
          </Group>
        )}
      </Grid.Col>

      <Grid.Col span={1} pl={0}>
        <ActionIcon>
          <IconHandGrab style={{ width: "70%", stroke: "1.5" }} />
        </ActionIcon>
      </Grid.Col>
    </Grid>
  );
};
