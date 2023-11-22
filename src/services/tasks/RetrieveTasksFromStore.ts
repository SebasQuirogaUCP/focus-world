import { WithStoreState } from "@/store/useAppStore";

export const RetrieveTasksFromStore = () => {
  return WithStoreState((state) => state.tasks);
};
