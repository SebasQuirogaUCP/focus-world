import { NextApiRequest } from "next";
import { User } from "next-auth";

export const GetUserFromRequest = (req: NextApiRequest) => {
  const user = req.headers["x-focus-world"] as string | undefined;
  if (!user) return;

  return JSON.parse(user) as User;
};
