import { IError } from "@/models/utils/IError";

export const IsError = (error: any): error is IError =>
  error?.error !== undefined;
