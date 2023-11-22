import { RemoveTaskInStore } from "@/services/tasks/RemoveTaskInStore";
import { ActionIcon, Menu, useMantineTheme } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconDots } from "@tabler/icons-react";

type Props = {
  taskId: string;
};

export const TaskItemMenuOptions = ({ taskId }: Props) => {
  const [opened, { open, close }] = useDisclosure();
  const { colors } = useMantineTheme();

  const onRemoveTask = (taskId: string) => {
    RemoveTaskInStore(taskId);
  };

  return (
    <Menu
      width={200}
      shadow="md"
      opened={opened}
      onClose={close}
      styles={{
        dropdown: { position: "fixed", borderRadius: "10px" },
        item: { padding: "0px 10px 0px 10px", fontSize: "12px" },
      }}
    >
      <Menu.Target>
        <ActionIcon variant="subtle" aria-label="Settings" onClick={open}>
          <IconDots
            style={{
              width: "70%",
              backgroundColor: "transparent",
              color: colors.primary[8],
            }}
            stroke={1.5}
          />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item
          icon={
            <span
              role="img"
              aria-label="sheep"
              style={{ padding: "0px 0px 5px 3px", fontSize: "18px" }}
            >
              😎
            </span>
          }
        >
          Task Completed
        </Menu.Item>

        <Menu.Item
          icon={
            <span
              role="img"
              aria-label="sheep"
              style={{ padding: "0px 0px 5px 3px", fontSize: "18px" }}
            >
              🙀
            </span>
          }
          onClick={() => onRemoveTask(taskId)}
        >
          Remove Task
        </Menu.Item>

        <Menu.Divider />

        <Menu.Item
          icon={
            <span
              role="img"
              aria-label="sheep"
              style={{ padding: "0px 0px 5px 3px", fontSize: "18px" }}
            >
              🪄
            </span>
          }
        >
          AI Asistance
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
