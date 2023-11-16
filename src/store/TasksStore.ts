import { TaskState } from "@/components/data/TaskState";
import { StateCreator } from "zustand";

export type TaskStoreState = { tasks: TaskState[] };

export const TasksStore: StateCreator<TaskStoreState> = (set) => ({
  tasks: [
    {
      createdAt: new Date(),
      id: "1",
      description: "Testing DnD",
      state: "PROGRESS",
      editMode: false,
    },
    {
      createdAt: new Date(),
      id: "2",
      description: "Opening Teams",
      state: "PROGRESS",
      editMode: false,
    },
    {
      createdAt: new Date(),
      id: "3",
      description: "Just for fun",
      state: "PROGRESS",
      editMode: false,
    },
  ],
});
