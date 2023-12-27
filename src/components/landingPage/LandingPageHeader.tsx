import { LandingPageMenuOptions } from "@/models/landingPage/LandingPagePaths";
import { Button, Container, Grid, Group } from "@mantine/core";
import Image from "next/image";
import { useStyles } from "../hooks/useStyles";

type Props = {
  routerCB: (menuOption: LandingPageMenuOptions) => void;
};

export const LandingPageHeader = ({ routerCB }: Props) => {
  const { classes, cx } = useStyles();

  return (
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
            <Button variant="filled" color="primary" size={"xs"}>
              Login
            </Button>
            <Button variant="outline" color="primary" size={"xs"} mr={"sm"}>
              Sign In
            </Button>
          </Group>
        </Grid.Col>
      </Grid>
    </div>
  );
};
