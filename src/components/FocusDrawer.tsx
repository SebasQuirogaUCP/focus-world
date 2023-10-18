import {
  ActionIcon,
  Button,
  Center,
  Drawer,
  Flex,
  Grid,
  Group,
  Select,
  Text,
  TextInput,
  Tooltip,
  useMantineTheme,
} from "@mantine/core";
import { useDisclosure, useInterval } from "@mantine/hooks";
import { IconFocus2 } from "@tabler/icons-react";
import { useMemo, useState } from "react";
import { useStylesFocusDrawer } from "./stylesHooks/useStylesFocusDrawer";

const hoursToMsConst = 3.6e6;
const minutesToMsConst = 60e3;

export const padTo2Digits = (num: number) => {
  return num.toString().padStart(2, "0");
};

// BUG: when it get to ±30 seconds it changes the minutes
export const convertMsToHMS = (ms: number) => {
  let seconds = Math.floor(ms / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);
  seconds = seconds % 60;
  minutes = minutes % 60;
  hours = hours % 24;
  return `${padTo2Digits(hours)}:${padTo2Digits(minutes)}:${padTo2Digits(
    seconds
  )}`;
};


export const FocusDrawer = () => {
  const { colors } = useMantineTheme();

  const { classes } = useStylesFocusDrawer();

  const [opened, { open, close }] = useDisclosure(false);

  const [hmsTimer, setHMSTimer] = useState<string>();

  const [focusPreferences, setFocusPreferences] = useState<{
    hours: number;
    minutes: number;
    breakTime: number;
  }>({
    hours: 0,
    minutes: 25,
    breakTime: 5,
  });

  console.info(hmsTimer);

  let timer = useMemo(() => {
    console.info("Executed");
    return (
      focusPreferences.hours * hoursToMsConst +
      focusPreferences.minutes * minutesToMsConst
    );
  }, [focusPreferences]);

  const interval = useInterval(() => {
    setHMSTimer(convertMsToHMS(timer));
    timer = timer - 1000;
    if (timer <= 0) {
      interval.stop();
    }
  }, 1000);

  const startTimer = () => {
    interval.start();
  };

  const stopTimer = () => {
    interval.stop();
  };

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
                onChange={(e) =>
                  setFocusPreferences({
                    hours: Number(e.target.value),
                    minutes: focusPreferences.minutes,
                    breakTime: focusPreferences.breakTime,
                  })
                }
              />
              <TextInput
                type="number"
                label="Minutes"
                defaultValue={25}
                className={classes.inputPrimaryBackground}
                onChange={(e) =>
                  setFocusPreferences({
                    minutes: Number(e.target.value),
                    hours: focusPreferences.hours,
                    breakTime: focusPreferences.breakTime,
                  })
                }
              />
              <TextInput
                type="number"
                label="Break Time"
                defaultValue={5}
                className={classes.inputPrimaryBackground}
                onChange={(e) =>
                  setFocusPreferences({
                    breakTime: Number(e.target.value),
                    hours: focusPreferences.hours,
                    minutes: focusPreferences.minutes,
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

            <Group grow mt={"lg"}>
              <Button
                variant="filled"
                radius={"lg"}
                color={`${interval.active ? "red" : "primary"}`}
                styles={{ root: { color: colors.secondary[8] } }}
                onClick={interval.active ? stopTimer : startTimer}
              >
                {interval.active ? "Stop" : "Start"}
              </Button>
            </Group>
          </Grid.Col>

          <Grid.Col span={6}>
            <Center>
              <Group>
                <Text
                  align="center"
                  style={{
                    fontSize: "100px",
                    fontFamily: "Helvetica Neue",
                  }}
                  color="primary"
                  py={0}
                >
                  {hmsTimer?.slice(0, 5)}
                </Text>
                <Flex
                  mih={100}
                  gap="md"
                  justify="flex-end"
                  align="flex-end"
                  direction="row"
                  wrap="wrap"
                >
                  <Text
                    align="end"
                    size={"xl"}
                    style={{
                      fontFamily: "Helvetica Neue",
                    }}
                    color="primary"
                  >
                    {hmsTimer?.slice(6, 8)}
                  </Text>
                </Flex>
              </Group>
            </Center>
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
