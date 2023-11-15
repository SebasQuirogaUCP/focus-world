import { TaskState } from "@/components/data/TaskState";
import { WithStoreState } from "@/store/useAppStore";

export const ReorderTasksInStore = (
  list: TaskState[],
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
