import { TimerActiveState } from "@/components/data/TimerActiveState";
import { StateCreator } from "zustand";

export type TimerStoreState = TimerActiveState;

export const TimerStore: StateCreator<TimerStoreState> = (set) => ({
  active: false,
  breakTime: 5,
  hours: 0,
  minutes: 25,
});
