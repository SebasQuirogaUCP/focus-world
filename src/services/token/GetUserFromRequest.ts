import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

export const GetUserFromRequest = async (req: NextRequest) => {
  const nextAuthToken = await getToken({ req });
  // TODO: Look for the user id on the database to validate it exists

  if (!nextAuthToken || !nextAuthToken?.sub) return;

  // TODO: Retriving user from the database and returning it
  return nextAuthToken;
};
