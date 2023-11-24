import { WithStoreState } from "@/store/useAppStore";

export const CompleteTaskItem = (taskId: string) => {
  WithStoreState((state, setState) => {
    const completedTask = state.tasks.find((t) => t.id === taskId);

    if (completedTask) {
      completedTask.state = "COMPLETED";

      const newTasks = state.tasks.filter((t) => t.id !== taskId);
      newTasks.push(completedTask);

      setState({ tasks: newTasks });
    }
  });
};
