export type ITaskState = {
  id: string;
  description: string;
  createdAt: string;
  state: "PROGRESS" | "COMPLETED" | "PENDING";
  aiGenerated?: boolean;
  editMode: boolean;
};
