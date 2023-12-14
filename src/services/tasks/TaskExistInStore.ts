import { WithStoreState } from "@/store/useAppStore";

export const TaskExistInStore = (taskId: string) => {
  return WithStoreState((state) => {
    const isNewTask = state.tasks.find((task) => task.id === taskId);
    return isNewTask === undefined ? true : false;
  });
};
