import { IError } from "../utils/IError";
import { IHeaders } from "./IHeaders";

export type IHttpPost = <T>(
  uri: string | undefined,
  data: object | string | undefined,
  headers?: IHeaders[]
) => Promise<T | IError>;
