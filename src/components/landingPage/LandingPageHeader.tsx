import {
  ActionIcon,
  Button,
  Container,
  Grid,
  Group,
  Menu,
} from "@mantine/core";
import {
  IconArrowsLeftRight,
  IconMessageCircle,
  IconPhoto,
  IconSettings,
  IconTrash,
} from "@tabler/icons-react";
import Image from "next/image";
import { useStyles } from "../hooks/useStyles";

export const LandingPageHeader = () => {
  const { classes, cx } = useStyles();

  return (
    <div className={classes.headerBackground}>
      <Grid>
        <Grid.Col span={8}>
          <Container>
            <Group position="left" grow>
              <Image src={""} alt={"BeatTime logo"} />

              <ActionIcon color="primary">Productivity Boost</ActionIcon>
              <ActionIcon color="primary">Focus Mode</ActionIcon>
              <ActionIcon color="primary">Task Manager</ActionIcon>
              <Menu shadow="md" width={200}>
                <Menu.Target>
                  <ActionIcon color="primary">More</ActionIcon>
                </Menu.Target>

                <Menu.Dropdown>
                  <Menu.Label>Application</Menu.Label>
                  <Menu.Item icon={<IconSettings size={14} />}>
                    Settings
                  </Menu.Item>
                  <Menu.Item icon={<IconMessageCircle size={14} />}>
                    Messages
                  </Menu.Item>
                  <Menu.Item icon={<IconPhoto size={14} />}>Gallery</Menu.Item>

                  <Menu.Divider />

                  <Menu.Label>Danger zone</Menu.Label>
                  <Menu.Item icon={<IconArrowsLeftRight size={14} />}>
                    Transfer my data
                  </Menu.Item>
                  <Menu.Item color="red" icon={<IconTrash size={14} />}>
                    Delete my account
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </Group>
          </Container>
        </Grid.Col>
        <Grid.Col span={4}>
          <Group position="right">
            <Button variant="filled" color="primary" size={"xs"}>
              Login
            </Button>
            <Button variant="outline" color="primary" size={"xs"} mr={"sm"}>
              Sign In
            </Button>
          </Group>
        </Grid.Col>
      </Grid>
    </div>
  );
};
