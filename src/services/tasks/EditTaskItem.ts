import { WithStoreState } from "@/store/useAppStore";

export const EditTaskItem = (taskItemId: string, editMode: boolean) => {
  WithStoreState((state, setState) => {
    const taskIndex = state.tasks.findIndex((task) => task.id === taskItemId);

    const tasks = [...state.tasks];

    tasks[taskIndex].editMode = editMode;

    setState({
      tasks,
    });
  });
};
