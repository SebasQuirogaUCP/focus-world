import {
  Avatar,
  Button,
  Group,
  Menu,
  Modal,
  Text,
  UnstyledButton,
  createStyles,
  rem,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconChevronDown,
  IconDoorEnter,
  IconHeart,
  IconLogout,
  IconMessage,
  IconPlayerPause,
  IconSettings,
  IconStar,
  IconSwitchHorizontal,
  IconTrash,
} from "@tabler/icons-react";
import { useState } from "react";
import { CustomLogin } from "./CustomLogin";

const useStyles = createStyles((theme) => ({
  mainSection: {
    paddingBottom: theme.spacing.sm,
  },

  user: {
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.radius.sm,
    transition: "background-color 100ms ease",

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
    },

    [theme.fn.smallerThan("xs")]: {
      display: "none",
    },
  },

  burger: {
    [theme.fn.largerThan("xs")]: {
      display: "none",
    },
  },

  userActive: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
  },

  tabs: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  tabsList: {
    borderBottom: "0 !important",
  },

  tab: {
    fontWeight: 500,
    height: rem(38),
    backgroundColor: "transparent",

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[5]
          : theme.colors.gray[1],
    },

    "&[data-active]": {
      backgroundColor:
        theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
      borderColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[7]
          : theme.colors.gray[2],
    },
  },
}));

type HeaderTabsProps = {
  user: { name: string; image: string };
  tabs: string[];
};

export function CustomHeader({ user, tabs }: HeaderTabsProps) {
  const { classes, theme, cx } = useStyles();
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const [opened, { open, close }] = useDisclosure(true);

  return (
    <div>
      <Modal onClose={close} opened={opened} title="Log in">
        <CustomLogin />
      </Modal>

      <Group position="right">
        <Button
          variant="light"
          size="xs"
          rightIcon={<IconDoorEnter size={14} />}
          onClick={open}
        >
          Log In
        </Button>

        <Menu
          width={260}
          position="bottom-end"
          transitionProps={{ transition: "pop-top-right" }}
          onClose={() => setUserMenuOpened(false)}
          onOpen={() => setUserMenuOpened(true)}
          withinPortal
        >
          <Menu.Target>
            <UnstyledButton
              className={cx(classes.user, {
                [classes.userActive]: userMenuOpened,
              })}
            >
              <Group spacing={7}>
                <Avatar
                  src={user.image}
                  alt={user.name}
                  radius="xl"
                  size={20}
                />
                <Text weight={500} size="sm" sx={{ lineHeight: 1 }} mr={3}>
                  {user.name}
                </Text>
                <IconChevronDown size={rem(12)} stroke={1.5} />
              </Group>
            </UnstyledButton>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item>
              <Group>
                <Avatar src="avatar.png" alt="it's me" />
                <div>
                  <Text size={"sm"}>Sebas Quiroga</Text>
                  <Text size={"xs"} color="dimmed" pt={0}>
                    sebasqui1995@gmail.com
                  </Text>

                  <Group spacing={"xs"}>
                    <IconSettings size="0.9rem" color={"gray"} stroke={1.5} />
                    <Text size={"xs"} ml={0}>
                      Settings
                    </Text>
                  </Group>
                </div>
              </Group>
            </Menu.Item>

            <Menu.Item
              icon={
                <IconHeart
                  size="0.9rem"
                  color={theme.colors.red[6]}
                  stroke={1.5}
                />
              }
            >
              Liked posts
            </Menu.Item>
            <Menu.Item
              icon={
                <IconStar
                  size="0.9rem"
                  color={theme.colors.yellow[6]}
                  stroke={1.5}
                />
              }
            >
              Saved posts
            </Menu.Item>
            <Menu.Item
              icon={
                <IconMessage
                  size="0.9rem"
                  color={theme.colors.blue[6]}
                  stroke={1.5}
                />
              }
            >
              Your comments
            </Menu.Item>

            <Menu.Label>Settings</Menu.Label>
            <Menu.Item icon={<IconSettings size="0.9rem" stroke={1.5} />}>
              Account settings
            </Menu.Item>
            <Menu.Item
              icon={<IconSwitchHorizontal size="0.9rem" stroke={1.5} />}
            >
              Change account
            </Menu.Item>
            <Menu.Item icon={<IconLogout size="0.9rem" stroke={1.5} />}>
              Logout
            </Menu.Item>

            <Menu.Divider />

            <Menu.Label>Danger zone</Menu.Label>
            <Menu.Item icon={<IconPlayerPause size="0.9rem" stroke={1.5} />}>
              Pause subscription
            </Menu.Item>
            <Menu.Item
              color="red"
              icon={<IconTrash size="0.9rem" stroke={1.5} />}
            >
              Delete account
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
    </div>
  );
}
