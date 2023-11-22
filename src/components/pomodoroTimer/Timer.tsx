// import { CircularProgressbar } from 'react-circular-progressbar';
import { ComputeCircularProgress } from "@/services/timer/ComputeCircularProgress";
import { SetTimerActivePreferences } from "@/services/timer/SetTimerPreferences";
import { useAppStore } from "@/store/useAppStore";
import { Button, Center, Group, useMantineTheme } from "@mantine/core";
import { useInterval } from "@mantine/hooks";
import { useEffect, useMemo, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  hoursToMsConst,
  minutesToMsConst,
} from "../../services/timer/TimeConstants";
import { ConvertMsToHMS } from "../utils/ConvertMsToHMS";

export const Timer = () => {
  const { colors } = useMantineTheme();

  const [hours, minutes, breakTime] = useAppStore((s) => [
    s.hours,
    s.minutes,
    s.breakTime,
  ]);

  let timer = useMemo(() => {
    return hours * hoursToMsConst + minutes * minutesToMsConst;
  }, [hours, minutes]);

  const initialValue = timer;

  const [hmsTimer, setHMSTimer] = useState<string>(ConvertMsToHMS(timer));

  const [circularProgress, setCircularProgress] = useState<number>(100);

  useEffect(() => {
    setCircularProgress(ComputeCircularProgress(initialValue, timer));
    setHMSTimer(ConvertMsToHMS(timer));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hours, minutes]);

  const interval = useInterval(() => {
    timer = timer - 1000;
    setHMSTimer(ConvertMsToHMS(timer));
    setCircularProgress(ComputeCircularProgress(initialValue, timer));
    if (timer <= 0) {
      interval.stop();
    }
  }, 1000);

  const startTimer = () => {
    SetTimerActivePreferences({ active: true });
    interval.start();
  };

  const stopTimer = () => {
    interval.stop();
  };

  return (
    <Center>
      <div style={{ width: "300px" }}>
        <CircularProgressbar
          value={circularProgress}
          // text={`${counter.slice(0, 5)}`}
          text={hmsTimer}
          strokeWidth={3}
          counterClockwise
          styles={buildStyles({
            pathColor: colors.primary[8],
            textColor: colors.primary[8],
          })}
        />
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
      </div>
    </Center>
  );
};

// TODO: Add brightness and neumorphism design to the CircularProgressBar? (like if it were flying)
// TODO: The ms timer should look smaller than minutes and hours
