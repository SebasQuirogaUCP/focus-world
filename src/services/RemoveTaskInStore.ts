import { TaskState } from "@/components/data/TaskState";
import { WithStoreState } from "@/store/useAppStore";

export const RemoveTaskInStore = (taskId: string) => {
  WithStoreState((state, setState) => {
    const updatedTasks: TaskState[] = state.tasks.filter(
      (task) => task.id !== taskId
    );
    setState({
      tasks: updatedTasks,
    });
  });
};
