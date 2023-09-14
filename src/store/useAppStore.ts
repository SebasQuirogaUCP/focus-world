import { create } from "zustand";
import { UserStore, UserStoreState } from "./UserStore";

type AppStoreState = UserStoreState;

export const useAppStore = create<AppStoreState>()((...s) => ({
  ...UserStore(...s),
}));

export const WithStoreState = <T>(
  callback: (
    state: AppStoreState,
    setState: (state: Partial<AppStoreState>) => void
  ) => T
) => {
  return callback(useAppStore.getState(), useAppStore.setState);
};
