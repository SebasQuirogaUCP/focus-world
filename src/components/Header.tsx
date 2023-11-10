import {
  ActionIcon,
  Avatar,
  Divider,
  Group,
  Modal,
  Text,
  Tooltip,
  UnstyledButton,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconChartHistogram, IconMenu2 } from "@tabler/icons-react";
import { useSession } from "next-auth/react";
import { FocusDrawer } from "./FocusDrawer";
import { HeaderMenu } from "./HeaderMenu";
import { CustomLogin } from "./Login";
import { TaskDrawer } from "./TasksDrawer";
import { useStylesHeader } from "./stylesHooks/useStylesHeader";

type Props = {
  toggleSideNavBar: () => void;
};

export function Header({ toggleSideNavBar }: Props) {
  const { classes, cx } = useStylesHeader();
  const [opened, { open, close }] = useDisclosure(false);

  const session = useSession();
  const user = session.data?.user;
  return (
    <div className={classes.headerBackground}>
      <Modal onClose={close} opened={opened} title="Log in">
        <CustomLogin />
      </Modal>

      <Group position="apart" spacing={"lg"}>
        <ActionIcon
          onClick={() => toggleSideNavBar()}
          color="primary"
          ml={"md"}
        >
          <IconMenu2 size={"20"} />
        </ActionIcon>

        <Group position="right">
          {!user ? (
            <UnstyledButton onClick={open}>
              <Group spacing={7} className={cx(classes.unknownUser)}>
                <Avatar src={null} radius="xl" size={25} />
                <Text weight={500} size="sm" sx={{ lineHeight: 1 }} mr={3}>
                  LogIn
                </Text>
              </Group>
            </UnstyledButton>
          ) : (
            <Group spacing={"xs"}>
              <ActionIcon color="primary">
                <Tooltip label="Stats">
                  <IconChartHistogram size={"25"} stroke={"1"} />
                </Tooltip>
              </ActionIcon>

              <FocusDrawer />

              <TaskDrawer />

              <Divider
                orientation="vertical"
                my={"xs"}
                size={"xs"}
                color="primary"
              />
              <HeaderMenu />
            </Group>
          )}
        </Group>
      </Group>
    </div>
  );
}
