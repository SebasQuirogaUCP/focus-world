import { createStyles } from "@mantine/core";

export const useStylesFocusDrawer = createStyles((theme) => ({
  inputPrimaryBackground: {
    input: {
      backgroundColor: theme.colors.secondary,
      borderColor: theme.colors.primary[5],
      borderStyle: "dashed",
      color: theme.colors.primary[5],
    },
    label: {
      color: theme.colors.primary[5],
    },
  },
}));
