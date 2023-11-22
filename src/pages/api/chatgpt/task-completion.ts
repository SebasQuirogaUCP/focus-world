import { ChatGPTMessages } from "@/services/chatGPT/ChatGPTMessages";
import { SendChatCompletion } from "@/services/chatGPT/SendChatCompletion";
import { HttpError } from "@/services/http/HttpError";
import { HttpSuccess } from "@/services/http/HttpSuccess";
import { GetUserFromRequest } from "@/services/token/GetUserFromRequest";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { user, userMessage } = validateRequest(req);

  if (!user || !userMessage) {
    const errorMessage = !user
      ? "User not found"
      : "Task Description not found";

    return HttpError(res, errorMessage, 500);
  }

  const chatGPTResponse = await SendChatCompletion({
    systemMessage: ChatGPTMessages.GPT_TASK_HELP_SYSTEM_MESSAGE,
    userMessage,
  });

  return HttpSuccess(res, chatGPTResponse);
}

const validateRequest = (req: NextApiRequest) => {
  const user = GetUserFromRequest(req);

  const userMessage = req.body.taskDescription;

  return { user, userMessage };
};
