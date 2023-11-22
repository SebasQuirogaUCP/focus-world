import { IHeaders } from "@/models/http/IHeaders";
import { IHttpGet } from "@/models/http/IHttpGet";
import { Err } from "@/utils/Err";
import { ExtractResponse } from "@/utils/ExtractResponse";
import { TrimString } from "@/utils/TrimString";

export const HttpGet: IHttpGet = async <T>(
  uri: string | undefined,
  headers?: IHeaders[]
) => {
  const trimmedUri = TrimString(uri);

  if (!trimmedUri) return Err("URI is required to GET");

  const response = await fetch(trimmedUri, {
    method: "GET",
    headers: [
      ["Content-Type", "application/json"],
      ["Accept", "application/json"],
      ...(headers ?? []),
    ],
  });

  return await ExtractResponse<T>(trimmedUri, response);
};
