import { ITaskState } from "@/models/tasks/ITaskState";
import { StateCreator } from "zustand";

export type TaskStoreState = { tasks: ITaskState[] };

export const TasksStore: StateCreator<TaskStoreState> = (set) => ({
  tasks: [
    {
      createdAt: new Date().toLocaleDateString(),
      id: "1",
      description: "Testing DnD",
      state: "PROGRESS",
      editMode: false,
    },
    {
      createdAt: new Date().toLocaleDateString(),
      id: "2",
      description: "Opening Teams",
      state: "PROGRESS",
      editMode: false,
    },
    {
      createdAt: new Date().toLocaleDateString(),
      id: "3",
      description: "Just for fun",
      state: "PROGRESS",
      editMode: false,
    },
  ],
});
