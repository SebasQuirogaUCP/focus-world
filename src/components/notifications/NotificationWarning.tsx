import { Notification } from "@mantine/core";

export const NotificationWarning = (message: string) => {
  return (
    <Notification withBorder withCloseButton color="orange" variant="default">
      {message}
    </Notification>
  );
};
