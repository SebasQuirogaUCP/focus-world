import { IError } from "@/models/utils/IError";

export const Err = (message: string): IError => {
  console.error(message);

  return { error: message };
};
