import { Button, Text, useMantineTheme } from "@mantine/core";
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
        Supercharge your productivity with BeatTime
        {seconds % 2 === 0 ? "_" : ""}
      </Text>
      <Text fw={250} size={23} mb={"lg"}>
        Propel yourself to new heights by conquering tasks, gaining points and
        ascending the daily leaderboard; keep the flow 😎 and watch your
        productivity soar as you unlock a world of possibilities with seamless
        plugins, including Spotify, Google Calendar Sync, ChatGPT, and more.
        Effortlessly conquer your to-do list with BeatTime&apos;s intuitive
        interface 🎯. Welcome to a new era of productivity! 💻✨. Your most
        productive self awaits! 🌟
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
