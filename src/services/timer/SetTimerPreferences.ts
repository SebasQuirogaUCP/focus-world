import { ITimerActiveState } from "@/models/timer/ITimerActiveState";
import { WithStoreState } from "@/store/useAppStore";

export const SetTimerGlobalPreferences = ({
  active,
  breakTime,
  hours,
  minutes,
}: ITimerActiveState) => {
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
}: Pick<ITimerActiveState, "active">) => {
  WithStoreState((state, setState) => {
    setState({
      active,
    });
  });
};
