import OpenAI from "openai";

type Props = {
  userMessage: string;
  systemMessage: string;
};

// TODO: Every first AI Asistance in each item task should have a clean conversation: "New conversation"
export const SendChatCompletion = async ({
  systemMessage,
  userMessage,
}: Props) => {
  const openai = new OpenAI({ apiKey: process.env.OPEN_API_KEY ?? "" });

  const chatGPTResponse = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: systemMessage,
      },
      {
        role: "user",
        content: userMessage,
      },
    ],
    model: "gpt-3.5-turbo-0301",
    presence_penalty: 2,
  });

  return chatGPTResponse.choices[0].message.content;
};
