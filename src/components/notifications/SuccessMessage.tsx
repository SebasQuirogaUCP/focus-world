import { Notification } from "@mantine/core";

type Props = {
  message: string;
};

export const SuccessMessage = ({ message }: Props) => {
  return (
    <Notification withBorder withCloseButton color="green" variant="default">
      {message}
    </Notification>
  );
};
