import { ITaskState } from "@/models/tasks/ITaskState";
import { ERROR_MESSAGE } from "@/services/notifications/NotificationMessages";
import { AITaskAssitance } from "@/services/tasks/AITaskAssistance";
import { IsError } from "@/utils/IsError";
import { ActionIcon, Menu, useMantineTheme } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconDots } from "@tabler/icons-react";
import { NotificationError } from "../notifications/NotificationError";
import { NotificationSuccess } from "../notifications/NotificationSuccess";

type Props = {
  task: ITaskState;
  onAIResponse: (aiResponse: string) => void;
  onEditTaskItem: (taskId: string) => void;
  onRemoveTask: (taskId: string) => void;
};

export const TaskItemMenuOptions = ({
  task,
  onAIResponse,
  onEditTaskItem,
  onRemoveTask,
}: Props) => {
  const [opened, { open, close }] = useDisclosure();
  const { colors } = useMantineTheme();

  const askChatGPT = async () => {
    task.editMode = true;

    const chatGPTResponse = await AITaskAssitance<string | undefined>(
      task.description
    );

    if (IsError(chatGPTResponse) || chatGPTResponse === undefined) {
      return NotificationError(ERROR_MESSAGE);
    }

    onAIResponse(chatGPTResponse);
    return NotificationSuccess("Hey, this is working");
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
          onClick={() => onEditTaskItem(task.id)}
          icon={
            <span
              role="img"
              aria-label="sheep"
              style={{ padding: "0px 0px 5px 3px", fontSize: "18px" }}
            >
              ✍🏼
            </span>
          }
        >
          Edit Task
        </Menu.Item>

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
          onClick={() => onRemoveTask(task.id)}
        >
          Remove Task
        </Menu.Item>

        <Menu.Divider />

        <Menu.Item
          disabled={task.editMode}
          onClick={askChatGPT}
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
