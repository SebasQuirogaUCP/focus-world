import { IError } from "@/models/utils/IError";
import { HttpPost } from "../http/HttpPost";

// TODO: For security reasons, there must be a MIDDLEWARE that adds the 'x-focus-world' header, instead of hard-coded from the frontend
export const AITaskAssitance = async <T>(taskDescription: string) => {
  const chatGPTResponse = await HttpPost<T | undefined | IError>(
    "api/chatgpt/task-completion",
    {
      taskDescription,
    },
    // TODO: This needs to be injected by a Middleware
    [["x-focus-world", JSON.stringify({ user: "testing" })]]
  );

  return <T>chatGPTResponse;
};
