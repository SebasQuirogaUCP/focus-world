import { IError } from "@/models/utils/IError";
import { Err } from "@/utils/Err";
import { useSession } from "next-auth/react";
import { HttpPost } from "../http/HttpPost";

// TODO: For security reasons, there must be a MIDDLEWARE that adds the 'x-focus-world' header, instead of hard-coded from the frontend
export const AITaskAssitance = async (taskDescription: string) => {
  const token = useSession();

  if (token.data?.user?.email) {
    const chatGPTResponse = await HttpPost<Array<string> | undefined | IError>(
      "api/chatgpt/task-completion",
      {
        taskDescription,
      },
      [["x-focus-world", token.data?.user?.email]]
    );

    return chatGPTResponse;
  }
  return Err("Not user found");
};
