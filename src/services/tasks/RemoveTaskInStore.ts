import { ITaskState } from "@/models/tasks/ITaskState";
import { WithStoreState } from "@/store/useAppStore";

export const RemoveTaskInStore = (taskId: string) => {
  WithStoreState((state, setState) => {
    const updatedTasks: ITaskState[] = state.tasks.filter(
      (task) => task.id !== taskId
    );
    setState({
      tasks: updatedTasks,
    });
  });
};
