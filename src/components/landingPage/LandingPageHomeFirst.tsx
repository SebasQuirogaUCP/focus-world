import { Button, Highlight, Text, useMantineTheme } from "@mantine/core";
import { useInterval } from "@mantine/hooks";
import { Josefin_Slab } from "@next/font/google";
import { useEffect, useState } from "react";

const font = Josefin_Slab({ subsets: ["latin"], weight: ["500"] });

export const LandingPageHomeFirst = () => {
  const theme = useMantineTheme();

  const [seconds, setSeconds] = useState(0);

  const interval = useInterval(() => setSeconds((s) => s + 1), 1000);

  useEffect(() => {
    interval.start();
    return interval.stop;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Text
        fw={"bold"}
        size={45}
        style={{
          color: theme.colors.primary[8],
        }}
      >
        Your Ultimate Productivity Hub!
        {seconds % 2 === 0 ? "_" : ""}
      </Text>
      <Text fw={250} size={23} mb={"lg"}>
        <Highlight
          highlight={[
            "Pomodoro",
            "leaderboard",
            "plugins",
            "Spotify, Google Calendar Sync, ChatGPT",
          ]}
          highlightColor={"orange"}
        >
          Supercharge your productivity with BeatTime – the ultimate all-in-one
          app! Seamlessly blending task management and the Pomodoro technique,
          BeatTime propels you to new heights. Ascend the daily leaderboard by
          accomplishing as many tasks as possible and watch your productivity
          soar. Unlock a world of possibilities with seamless plugins like
          Spotify, Google Calendar Sync, ChatGPT and more. Customize your
          experience, stay in the flow, and conquer your to-do list
          effortlessly. Embrace productivity like never before – welcome to
          BeatTime!
        </Highlight>
      </Text>

      <Button variant="outline" color="primary" mr={"md"}>
        How does it work?
      </Button>
      <Button variant="filled" color="primary">
        Get started
      </Button>
    </>
  );
};
