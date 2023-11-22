import { ITaskState } from "@/models/tasks/ITaskState";
import { WithStoreState } from "@/store/useAppStore";

export const ReorderTasksInStore = (
  list: ITaskState[],
  startIndex: number,
  endIndex: number
) => {
  const reorderedTasks = Array.from(list);
  const [removed] = reorderedTasks.splice(startIndex, 1);
  reorderedTasks.splice(endIndex, 0, removed);

  WithStoreState((_, setState) => {
    setState({ tasks: reorderedTasks });
  });
};
