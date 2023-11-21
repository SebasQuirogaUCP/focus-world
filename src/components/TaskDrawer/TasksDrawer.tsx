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
import { CSSProperties, useEffect, useState } from "react";
import {
  Draggable,
  DraggingStyle,
  Droppable,
  NotDraggingStyle,
} from "react-beautiful-dnd";
import { TaskState } from "../data/TaskState";
import { TaskDrawerHeader } from "./TaskDrawerHeader";

const getItemStyle = (
  isDragging: boolean,
  draggableStyle: DraggingStyle | NotDraggingStyle | undefined,
  primaryColor: string,
  editMode: boolean
): CSSProperties => {
  return {
    padding: `0px 10px 0 10px`,
    margin: `0 0 10px 0`,
    cursor: "pointer",
    ...draggableStyle,
    left: "0 !important",
    border: editMode
      ? `2px dashed ${primaryColor}`
      : `1px solid ${primaryColor}`,
    borderRadius: "10px",
  };
};

export const TaskDrawer = () => {
  const { colors } = useMantineTheme();

  const [opened, { open, close }] = useDisclosure(false);

  const existingTasks = useAppStore((s) => s.tasks);

  const [tasks, setTasks] = useState<TaskState[]>(existingTasks);

  useEffect(() => {
    setTasks(existingTasks);
  }, [existingTasks]);

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
                  createdAt: new Date(),
                  description: "",
                  id: nanoid(),
                  state: "PENDING",
                  editMode: true,
                },
              ])
            }
          >
            Create Task
          </Button>

          <Droppable droppableId="droppable" direction="vertical">
            {(provided, snapshot) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {tasks.map((task: TaskState, index: number) => (
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                    {(provided, snapshot) => {
                      return (
                        <Card
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getItemStyle(
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
                                  rightSection={<TaskDrawerHeader />}
                                  value={task.description}
                                  onChange={() => {}}
                                  styles={{
                                    input: { border: "none", padding: "0 0" },
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
                                    >
                                      Save
                                    </Button>

                                    <Button
                                      variant="subtle"
                                      color="red"
                                      size="xs"
                                      pl={"xs"}
                                      pr={0}
                                    >
                                      Remove
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
// 0. Arreglar estilos de botones (paddings)
// 1. Apply the onClick for saving (changing editMode to false) and removing
// 2. Create servicies and logic for AI assi
