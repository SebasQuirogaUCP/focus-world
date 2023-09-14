import { StateCreator } from "zustand";

export type UserStoreState = {
  user: {
    name: string | undefined;
    image: string | undefined;
    email: string | undefined;
  };
};

export const UserStore: StateCreator<UserStoreState> = (set) => ({
  user: { email: undefined, image: undefined, name: undefined },
});
