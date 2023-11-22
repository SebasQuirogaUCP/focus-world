import { IError } from "@/models/utils/IError";
import { Err } from "@/utils/Err";
import { NextApiResponse } from "next";

export const HttpError = (
  res: NextApiResponse,
  error: IError | string,
  statusCode?: number
) => {
  const isString = typeof error === "string";

  return res.status(statusCode ?? 500).json(isString ? Err(error) : error);
};
