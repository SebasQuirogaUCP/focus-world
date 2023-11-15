export const ComputeCircularProgress = (
  initialValue: number,
  currentValue: number
) => {
  return (currentValue * 100) / initialValue;
};
