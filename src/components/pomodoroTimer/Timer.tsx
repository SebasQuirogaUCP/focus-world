// import { CircularProgressbar } from 'react-circular-progressbar';
import { Center, useMantineTheme } from "@mantine/core";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

type Props = {
  counter: string | undefined;
};

export const Timer = ({ counter }: Props) => {
  const { colors } = useMantineTheme();

  if (!counter) return <></>;

  // TODO:Add brightness and neumorphism design? (like if it were flying)
  return (
    <Center>
      <div style={{ width: "400px" }}>
        <CircularProgressbar
          value={80}
          text={`${counter.slice(0, 5)}`}
          strokeWidth={3}
          counterClockwise
          styles={buildStyles({
            pathColor: colors.primary[8],
            textColor: colors.primary[8],
          })}
        />
      </div>
    </Center>
  );
};
