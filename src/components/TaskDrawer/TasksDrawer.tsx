import { useAppStore } from "@/store/useAppStore";
import {
  ActionIcon,
  Button,
  Card,
  Drawer,
  Grid,
  Stack,
  Textarea,
  Tooltip,
  useMantineTheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconHandGrab, IconListCheck } from "@tabler/icons-react";
import { CSSProperties, useState } from "react";
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
  primaryColor: string
): CSSProperties => {
  return {
    padding: `0px 10px 0 10px`,
    margin: `0 0 10px 0`,
    // border: `2px dashed ${primaryColor}`,
    cursor: "pointer",
    ...draggableStyle,
    left: "0 !important",
    border: `1px solid ${primaryColor}`,
    borderRadius: "10px",
  };
};

export const TaskDrawer = () => {
  const { colors } = useMantineTheme();

  const [opened, { open, close }] = useDisclosure(false);

  const [newTasks, setNewTasks] = useState<string[]>();

  const tasks = useAppStore((s) => s.tasks);

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
          >
            Create Task
          </Button>

          <Droppable droppableId="droppable" direction="vertical">
            {(provided, snapshot) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {tasks.map((item: TaskState, index: number) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => {
                      return (
                        <Card
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style,
                            colors.primary[8]
                          )}
                        >
                          <Grid>
                            <Grid.Col span={11} pr={0}>
                              <Textarea
                                rightSection={<TaskDrawerHeader />}
                                value={item.description}
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
// 1. DnD only vertically to avoid scrollbar on the x Axis
