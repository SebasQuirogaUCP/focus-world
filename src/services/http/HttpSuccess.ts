import { NextApiResponse } from "next";

export const HttpSuccess = <T>(res: NextApiResponse, body?: string | T) => {
  return body ? res.status(200).json(<T>body) : res.status(200).end();
};
