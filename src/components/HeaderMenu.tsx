import { Avatar, Group, Menu, Text, UnstyledButton, rem } from "@mantine/core";
import {
  IconChevronDown,
  IconHeart,
  IconLogout,
  IconMessage,
  IconPlayerPause,
  IconSettings,
  IconStar,
  IconSwitchHorizontal,
} from "@tabler/icons-react";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { useStylesHeader } from "./stylesHooks/useStylesHeader";

export function HeaderMenu() {
  const { classes, theme, cx } = useStylesHeader();
  const [userMenuOpened, setUserMenuOpened] = useState(false);

  const session = useSession();
  const user = session.data?.user;
  return (
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
            <Avatar src={user?.image} radius="xl" size={25} />
            <Text weight={500} size="sm" sx={{ lineHeight: 1 }} mr={3}>
              {user?.name}
            </Text>
            <IconChevronDown size={rem(12)} stroke={1.5} />
          </Group>
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item>
          <Group>
            <Avatar src={user?.image} />
            <div>
              <Text size={"sm"}>{user?.name}</Text>
              <Text size={"xs"} color="dimmed" pt={0}>
                {user?.email}
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
            <IconHeart size="0.9rem" color={theme.colors.red[6]} stroke={1.5} />
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
        <Menu.Item icon={<IconSwitchHorizontal size="0.9rem" stroke={1.5} />}>
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
          icon={<IconLogout size="0.9rem" stroke={1.5} />}
          onClick={() => signOut()}
        >
          Sign Out
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
