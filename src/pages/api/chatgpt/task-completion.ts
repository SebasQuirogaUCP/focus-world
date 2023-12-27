import { HttpSuccess } from "@/services/http/HttpSuccess";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // const { user, userMessage } = validateRequest(req);

  // if (!user || !userMessage) {
  //   const errorMessage = !user
  //     ? "User not found"
  //     : "Task Description not found";

  //   return HttpError(res, errorMessage, 500);
  // }

  // const chatGPTResponse = await SendChatCompletion({
  //   systemMessage: GPT_TASK_HELP_SYSTEM_MESSAGE,
  //   userMessage,
  // });

  // return HttpSuccess(res, chatGPTResponse);
  return HttpSuccess(res);
}

const validateRequest = (req: NextApiRequest) => {
  // TODO: Work in progress
  // const user = GetUserFromRequest(req);
  // const userMessage = req.body.taskDescription;
  // return { user, userMessage };
};
