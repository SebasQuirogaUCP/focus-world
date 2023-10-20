import { TimerActiveState } from "@/components/data/TimerActiveState";
import { WithStoreState } from "@/store/useAppStore";

export const SetTimerActiveState = ({ active }: TimerActiveState) => {
  WithStoreState((state, setState) => {
    active;
  });
};
