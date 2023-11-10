import { TaskState } from "@/components/data/TaskState";
import { WithStoreState } from "@/store/useAppStore";

export const AddTaskInStore = (task: TaskState) => {
  WithStoreState((state, setState) => {
    const newTasks: TaskState[] = [...state.tasks, task];
    setState({
      tasks: newTasks,
    });
  });
};
