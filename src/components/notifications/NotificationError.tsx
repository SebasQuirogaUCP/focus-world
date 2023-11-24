import { Notification } from "@mantine/core";

export const NotificationError = (message: string) => {
  return (
    <Notification withBorder withCloseButton color="red" variant="default">
      {message}
    </Notification>
  );
};
