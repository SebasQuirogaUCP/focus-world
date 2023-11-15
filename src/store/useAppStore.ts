import { create } from "zustand";
import { TaskStoreState, TasksStore } from "./TasksStore";
import { TimerStore, TimerStoreState } from "./TimerStore";
import { UserStore, UserStoreState } from "./UserStore";

type AppStoreState = UserStoreState & TimerStoreState & TaskStoreState;

export const useAppStore = create<AppStoreState>()((...s) => ({
  ...UserStore(...s),
  ...TimerStore(...s),
  ...TasksStore(...s),
}));

export const WithStoreState = <T>(
  callback: (
    state: AppStoreState,
    setState: (state: Partial<AppStoreState>) => void
  ) => T
) => {
  return callback(useAppStore.getState(), useAppStore.setState);
};
