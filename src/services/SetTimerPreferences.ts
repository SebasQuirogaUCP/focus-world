import { TimerActiveState } from "@/components/data/TimerActiveState";
import { WithStoreState } from "@/store/useAppStore";

export const SetTimerGlobalPreferences = ({
  active,
  breakTime,
  hours,
  minutes,
}: TimerActiveState) => {
  WithStoreState((state, setState) => {
    setState({
      active,
      breakTime,
      hours,
      minutes,
    });
  });
};

export const SetTimerActivePreferences = ({
  active,
}: Pick<TimerActiveState, "active">) => {
  WithStoreState((state, setState) => {
    setState({
      active,
    });
  });
};
