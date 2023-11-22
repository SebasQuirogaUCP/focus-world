import { Err } from "./Err";

export const ExtractResponse = async <T>(uri: string, response: Response) => {
  try {
    const jsonResponse = await response.json();

    if (!jsonResponse) return Err(`Error retriving JSON response ${uri}`);

    return <T>jsonResponse;
  } catch {
    try {
      const textResponse = await response.text();

      if (!textResponse)
        return Err(`Error retriving TEXT response from ${uri}`);

      return <T>textResponse;
    } catch {
      return Err("Response can not be parsed to neither JSON nor TEXT");
    }
  }
};
