import { create } from "zustand";
import { TimerStore, TimerStoreState } from "./TimerStore";
import { UserStore, UserStoreState } from "./UserStore";

type AppStoreState = UserStoreState & TimerStoreState;

export const useAppStore = create<AppStoreState>()((...s) => ({
  ...UserStore(...s),
  ...TimerStore(...s),
}));

export const WithStoreState = <T>(
  callback: (
    state: AppStoreState,
    setState: (state: Partial<AppStoreState>) => void
  ) => T
) => {
  return callback(useAppStore.getState(), useAppStore.setState);
};
