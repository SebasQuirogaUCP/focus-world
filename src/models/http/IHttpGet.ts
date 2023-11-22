import { IError } from "../utils/IError";
import { IHeaders } from "./IHeaders";

export type IHttpGet = <T>(
  uri: string | undefined,
  headers?: IHeaders[]
) => Promise<T | IError>;
