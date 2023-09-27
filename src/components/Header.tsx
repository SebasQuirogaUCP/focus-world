import {
  ActionIcon,
  Avatar,
  Divider,
  Group,
  Menu,
  Modal,
  Text,
  Tooltip,
  UnstyledButton,
  createStyles,
  rem,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconChartHistogram,
  IconChevronDown,
  IconHeart,
  IconLogout,
  IconMenu2,
  IconMessage,
  IconPlayerPause,
  IconSettings,
  IconStar,
  IconSwitchHorizontal,
} from "@tabler/icons-react";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { FocusDrawer } from "./FocusDrawer";
import { CustomLogin } from "./Login";

const useStyles = createStyles((theme) => ({
  headerBackground: {
    backgroundColor: theme.colors.secondary[8],
  },
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

  unknownUser: {
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
  },
  burger: {
    [theme.fn.largerThan("xs")]: {
      display: "none",
    },
  },

  userActive: {
    backgroundColor: theme.colors.primary[0],
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
      backgroundColor: theme.colors.primary[0],
      borderColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[7]
          : theme.colors.gray[2],
    },
  },
}));

type Props = {
  toggleSideNavBar: () => void;
};

export function Header({ toggleSideNavBar }: Props) {
  const { classes, theme, cx } = useStyles();
  const [userMenuOpened, setUserMenuOpened] = useState(false);
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

              <Divider
                orientation="vertical"
                my={"xs"}
                size={"xs"}
                color="primary"
              />
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
                      <Avatar src={user.image} radius="xl" size={25} />
                      <Text
                        weight={500}
                        size="sm"
                        sx={{ lineHeight: 1 }}
                        mr={3}
                      >
                        {user.name}
                      </Text>
                      <IconChevronDown size={rem(12)} stroke={1.5} />
                    </Group>
                  </UnstyledButton>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item>
                    <Group>
                      <Avatar src={user.image} />
                      <div>
                        <Text size={"sm"}>{user.name}</Text>
                        <Text size={"xs"} color="dimmed" pt={0}>
                          {user.email}
                        </Text>

                        <Group spacing={"xs"}>
                          <IconSettings
                            size="0.9rem"
                            color={"gray"}
                            stroke={1.5}
                          />
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
                  <Menu.Item
                    icon={<IconPlayerPause size="0.9rem" stroke={1.5} />}
                  >
                    Pause subscription
                  </Menu.Item>
                  <Menu.Item
                    color="red"
                    icon={<IconLogout size="0.9rem" stroke={1.5} />}
                    onClick={() => signOut()}
                  >
                    Sign Out
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </Group>
          )}
        </Group>
      </Group>
    </div>
  );
}
