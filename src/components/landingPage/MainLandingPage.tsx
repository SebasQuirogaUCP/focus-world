import { Button, Center, Group, Text, useMantineTheme } from "@mantine/core";
import { useInterval } from "@mantine/hooks";
import { Josefin_Slab } from "@next/font/google";
import { useEffect, useState } from "react";

const font = Josefin_Slab({ subsets: ["latin"], weight: ["200"] });

export const MainLandingPage = () => {
  const theme = useMantineTheme();

  const [seconds, setSeconds] = useState(0);

  const interval = useInterval(() => setSeconds((s) => s + 1), 1000);

  useEffect(() => {
    interval.start();
    return interval.stop;
  }, []);

  return (
    <Center h={"80%"}>
      <Group w={"60%"}>
        <Text
          fw={"bold"}
          size={45}
          style={{
            color: theme.colors.primary[8],
          }}
        >
          Increase your productivity and focus with BeatTime
          {seconds % 2 === 0 ? "_" : ""}
        </Text>
        <Text
          fw={"lighter"}
          size={25}
          mb={"lg"}
          style={{ fontFamily: font.className }}
        >
          BeatTime is the ultimate productivity app that combines task
          management, Pomodoro technique, and integration with Google Calendar
          and Spotify. Stay focused, motivated, and achieve more.
        </Text>
        <Button variant="outline" color="primary" mr={"md"}>
          How does it work?
        </Button>
        <Button variant="filled" color="primary">
          Get started
        </Button>
      </Group>
    </Center>
  );
};
