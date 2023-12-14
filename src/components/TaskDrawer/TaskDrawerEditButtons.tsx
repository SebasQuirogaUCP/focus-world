import { Button, Tooltip } from "@mantine/core";
import { IconWand } from "@tabler/icons-react";

type Props = {
  disabled: boolean;
  onSaveOrUpdate: () => void;
  onCancel: () => void;
  initializingTask: boolean;
};

export const TaskDrawerEditButtons = ({
  disabled,
  onSaveOrUpdate: onClick,
  onCancel,
  initializingTask,
}: Props) => {
  return (
    <>
      <Button
        variant="subtle"
        color="green"
        size="xs"
        disabled={disabled}
        onClick={onClick}
      >
        {initializingTask ? "Save" : "Update"}
      </Button>

      <Button variant="subtle" color="red" size="xs" onClick={onCancel}>
        Cancel
      </Button>

      <Button variant="subtle" color="dark" size="xs" px={"xs"}>
        <Tooltip
          label={"AI Assistant"}
          styles={{ tooltip: { fontSize: 10 } }}
          position="bottom"
        >
          <IconWand stroke={1} color="black" size={20} />
        </Tooltip>
      </Button>
    </>
  );
};
