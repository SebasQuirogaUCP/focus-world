import { Button, ButtonProps, Group } from "@mantine/core";
import { signIn } from "next-auth/react";
import {
  DiscordIcon,
  GithubIcon,
  GoogleIcon,
  TwitterIcon,
} from "./utils/Icons";

const GoogleButton = (props: ButtonProps) => {
  return (
    <Button variant="default" color="gray" {...props} onClick={() => signIn()}>
      <GoogleIcon size={"1rem"} />
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
      onClick={() => signIn()}
    >
      <DiscordIcon size="1rem" />
    </Button>
  );
};

const TwitterButton = (
  props: ButtonProps & React.ComponentPropsWithoutRef<"a">
) => {
  return (
    <Button component="a" variant="default" {...props} onClick={() => signIn()}>
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
      onClick={() => signIn()}
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
