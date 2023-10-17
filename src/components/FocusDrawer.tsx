import {
  ActionIcon,
  Button,
  Drawer,
  Grid,
  Group,
  Select,
  TextInput,
  Tooltip,
  useMantineTheme
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconFocus2 } from "@tabler/icons-react";
import { useStylesFocusDrawer } from "./stylesHooks/useStylesFocusDrawer";

export const FocusDrawer = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const { colors } = useMantineTheme();

  const { classes } = useStylesFocusDrawer();

  return (
    <>
      <Drawer
        opened={opened}
        onClose={close}
        title="Focus Settings"
        position="bottom"
        overlayProps={{ opacity: 0.5, blur: 4 }}
        styles={{
          header: { backgroundColor: colors.secondary },
          content: { backgroundColor: colors.secondary },
          title: { color: colors.primary[8], fontWeight: 500 },
        }}
      >
        <Grid>
          <Grid.Col span={6}>
            <Group grow>
              <TextInput
                type="number"
                label="Hours"
                defaultValue={0}
                className={classes.inputPrimaryBackground}
              />
              <TextInput
                type="number"
                label="Minutes"
                defaultValue={25}
                className={classes.inputPrimaryBackground}
              />
              <TextInput
                type="number"
                label="Break Time"
                defaultValue={5}
                className={classes.inputPrimaryBackground}
              />
            </Group>

            <Group mt={"xs"} grow>
              <Select
                data={["Ambient", "Instrumental", "Piano", "Gaming"]}
                label="Select you favorite music type"
                placeholder="Pick value"
                defaultValue="Ambient"
                className={classes.inputPrimaryBackground}
              />

              <Button variant="light" color="green" radius={"lg"} mt={"lg"}>
                Connect you Spotify
              </Button>
            </Group>

            <Group grow mt={"lg"}>
              <Button
                variant="filled"
                radius={"lg"}
                color="primary"
                styles={{ root: { color: colors.secondary[8] } }}
              >
                Start
              </Button>
            </Group>
          </Grid.Col>

          <Grid.Col span={6}></Grid.Col>
        </Grid>
      </Drawer>

      <ActionIcon onClick={open} color="primary">
        <Tooltip label="Focus">
          <IconFocus2 size={"25"} stroke={"1"} />
        </Tooltip>
      </ActionIcon>
    </>
  );
};
