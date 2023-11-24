import { Notification } from "@mantine/core";

export const NotificationSuccess = (message: string) => {
  return (
    <Notification withBorder withCloseButton color="green" variant="default">
      {message}
    </Notification>
  );
};
