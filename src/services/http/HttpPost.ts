import { IHeaders } from "@/models/http/IHeaders";
import { IHttpPost } from "@/models/http/IHttpPost";
import { IError } from "@/models/utils/IError";
import { Err } from "@/utils/Err";
import { ExtractResponse } from "@/utils/ExtractResponse";
import { TrimString } from "@/utils/TrimString";

export const HttpPost: IHttpPost = async <T>(
  uri: string | undefined,
  data: object | string | undefined,
  headers?: IHeaders[]
): Promise<T | IError> => {
  const trimmedUri = TrimString(uri);

  if (!trimmedUri) return Err("URI is required for POST");

  const response = await fetch(trimmedUri, {
    method: "POST",
    body: typeof data === "string" ? data : JSON.stringify(data),

    headers: [
      ["Content-Type", "application/json"],
      ["Accept", "application/json"],
      ...(headers ?? []),
    ],
  });

  return await ExtractResponse<T>(trimmedUri, response);
};
