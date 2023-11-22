import { ITimerActiveState } from "@/models/timer/ITimerActiveState";
import { StateCreator } from "zustand";

export type TimerStoreState = ITimerActiveState;

export const TimerStore: StateCreator<TimerStoreState> = (set) => ({
  active: false,
  breakTime: 5,
  hours: 0,
  minutes: 25,
});
