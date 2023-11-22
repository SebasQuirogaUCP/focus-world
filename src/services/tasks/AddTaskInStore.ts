import { ITaskState } from "@/models/tasks/ITaskState";
import { WithStoreState } from "@/store/useAppStore";

export const AddTaskInStore = (task: ITaskState) => {
  WithStoreState((state, setState) => {
    const newTasks: ITaskState[] = [...state.tasks, task];
    setState({
      tasks: newTasks,
    });
  });
};
