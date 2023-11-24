import { ITaskState } from "@/models/tasks/ITaskState";
import { WithStoreState } from "@/store/useAppStore";

export const UpdateTaskItem = (updatedTask: ITaskState) => {
  WithStoreState((state, setState) => {
    const tasks = [...state.tasks];

    const taskIndex = tasks.findIndex((t) => t.id === updatedTask.id);

    tasks[taskIndex] = updatedTask;

    console.info(tasks);

    setState({
      tasks,
    });
  });
};
