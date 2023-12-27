import { LandingPageMenuOptions } from "@/models/landingPage/LandingPagePaths";
import { Button, Container, Grid, Group, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { CustomLogin } from "../CustomLogin";
import { useStyles } from "../hooks/useStyles";

type Props = {
  routerCB: (menuOption: LandingPageMenuOptions) => void;
};

export const LandingPageHeader = ({ routerCB }: Props) => {
  const { classes, cx } = useStyles();
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal onClose={close} opened={opened} title="Log in">
        <CustomLogin />
      </Modal>
      <div className={classes.headerBackground}>
        <Grid>
          <Grid.Col span={8}>
            <Container>
              <Group position="left" spacing={"md"}>
                <Image src={""} alt={"BeatTime logo"} />
                <Button
                  variant="subtle"
                  color="primary"
                  onClick={() => routerCB("home")}
                >
                  Home
                </Button>
                <Button
                  variant="subtle"
                  color="primary"
                  onClick={() => routerCB("leaderboard")}
                >
                  Leaderboard
                </Button>
              </Group>
            </Container>
          </Grid.Col>
          <Grid.Col span={4}>
            <Group position="right">
              <Button
                variant="filled"
                color="primary"
                size={"xs"}
                onClick={open}
              >
                Login
              </Button>
              <Button variant="outline" color="primary" size={"xs"} mr={"sm"}>
                Sign In
              </Button>
              <Button
                variant="outline"
                color="primary"
                size={"xs"}
                mr={"sm"}
                onClick={() => signOut()}
              >
                Sign Out
              </Button>
            </Group>
          </Grid.Col>
        </Grid>
      </div>
    </>
  );
};
