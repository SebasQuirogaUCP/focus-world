import { useAppStore } from "@/store/useAppStore";
import {
  ActionIcon,
  Card,
  Drawer,
  Tooltip,
  useMantineTheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconListCheck } from "@tabler/icons-react";
import { CSSProperties } from "react";
import {
  Draggable,
  DraggingStyle,
  Droppable,
  NotDraggingStyle,
} from "react-beautiful-dnd";
import { TaskState } from "./data/TaskState";

const grid = 8;

const getItemStyle = (
  isDragging: boolean,
  draggableStyle: DraggingStyle | NotDraggingStyle | undefined
): CSSProperties => {
  return {
    userSelect: "none",
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,
    backgroundColor: isDragging ? "lightgreen" : "grey",
    cursor: "pointer",
    ...draggableStyle,
  };
};

export const TaskDrawer = () => {
  const { colors } = useMantineTheme();

  const [opened, { open, close }] = useDisclosure(false);

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
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {tasks.map((item: TaskState, index: number) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <Card
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                    >
                      {item.description}
                    </Card>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
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
