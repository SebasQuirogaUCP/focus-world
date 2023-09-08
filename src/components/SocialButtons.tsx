import { Button, ButtonProps, Group } from "@mantine/core";
import { DiscordIcon, GithubIcon, TwitterIcon } from "@mantine/ds";
import { GoogleIcon } from "./loginIcons/Google";

const GoogleButton = (props: ButtonProps) => {
  return (
    <Button variant="default" color="gray" {...props}>
      <GoogleIcon />
    </Button>
  );
};

const DiscordButton = (props: ButtonProps) => {
  return (
    <Button
      sx={(theme) => ({
        backgroundColor: theme.colorScheme === "dark" ? "#5865F2" : "#5865F2",
        "&:not([data-disabled]):hover": {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.fn.lighten("#5865F2", 0.05)
              : theme.fn.darken("#5865F2", 0.05),
        },
      })}
      {...props}
    >
      <DiscordIcon size="1rem" />
    </Button>
  );
};

const TwitterButton = (
  props: ButtonProps & React.ComponentPropsWithoutRef<"a">
) => {
  return (
    <Button component="a" variant="default" {...props}>
      <TwitterIcon size="1rem" color="#00ACEE" />
    </Button>
  );
};

const GithubButton = (props: ButtonProps) => {
  return (
    <Button
      {...props}
      sx={(theme) => ({
        backgroundColor:
          theme.colors.dark[theme.colorScheme === "dark" ? 9 : 6],
        color: "#fff",
        "&:hover": {
          backgroundColor:
            theme.colors.dark[theme.colorScheme === "dark" ? 9 : 6],
        },
      })}
    >
      <GithubIcon size="1rem" />
    </Button>
  );
};

export function SocialButtons() {
  return (
    <Group position="center" sx={{ padding: 15 }}>
      <GoogleButton />
      <TwitterButton target="_blank" />
      <GithubButton />
      <DiscordButton />
    </Group>
  );
}
