import { SetTimerGlobalPreferences } from "@/services/timer/SetTimerPreferences";
import { useAppStore } from "@/store/useAppStore";
import {
  ActionIcon,
  Button,
  Drawer,
  Grid,
  Group,
  Select,
  TextInput,
  Tooltip,
  useMantineTheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconFocus2 } from "@tabler/icons-react";
import { useState } from "react";
import { useStylesFocusDrawer } from "./stylesHooks/useStylesFocusDrawer";

export const FocusDrawer = () => {
  const { colors } = useMantineTheme();

  const { classes } = useStylesFocusDrawer();

  const [opened, { open, close }] = useDisclosure(false);

  const [hours, minutes, breakTime] = useAppStore((s) => [
    s.hours,
    s.minutes,
    s.breakTime,
  ]);

  const [localTimerSettings, setLocalTimerSettings] = useState<{
    hours: number;
    minutes: number;
    breakTime: number;
  }>({
    breakTime,
    hours,
    minutes,
  });

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
          <Grid.Col span={12}>
            <Group grow>
              <TextInput
                type="number"
                label="Hours"
                defaultValue={hours}
                className={classes.inputPrimaryBackground}
                onChange={(e) =>
                  setLocalTimerSettings({
                    hours: Number(e.target.value),
                    minutes,
                    breakTime,
                  })
                }
              />
              <TextInput
                type="number"
                label="Minutes"
                defaultValue={minutes}
                className={classes.inputPrimaryBackground}
                onChange={(e) =>
                  setLocalTimerSettings({
                    minutes: Number(e.target.value),
                    hours,
                    breakTime,
                  })
                }
              />
              <TextInput
                type="number"
                label="Break Time"
                defaultValue={breakTime}
                className={classes.inputPrimaryBackground}
                onChange={(e) =>
                  setLocalTimerSettings({
                    breakTime: Number(e.target.value),
                    hours,
                    minutes,
                  })
                }
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

            <Button
              variant="filled"
              color="primary"
              radius={"lg"}
              mt={"lg"}
              onClick={() => {
                SetTimerGlobalPreferences({
                  active: true,
                  breakTime: localTimerSettings.breakTime,
                  hours: localTimerSettings.hours,
                  minutes: localTimerSettings.minutes,
                });
                close();
              }}
            >
              Save
            </Button>
          </Grid.Col>
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
