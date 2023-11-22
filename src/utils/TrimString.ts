export const TrimString = (str: string | undefined) => {
  if (!str) return;

  const trimmedString = str.trim();

  if (!trimmedString) return;

  return trimmedString;
};
