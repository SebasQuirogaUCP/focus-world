export type TaskState = {
  id: string;
  description: string;
  createdAt: Date;
  state: "PROGRESS" | "COMPLETED" | "PENDING";
  aiGenerated?: boolean;
};
