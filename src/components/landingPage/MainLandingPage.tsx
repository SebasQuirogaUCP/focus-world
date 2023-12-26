import { Button, Center, Grid, Text } from "@mantine/core";
import Image from "next/image";

export const MainLandingPage = () => {
  return (
    <Center h={"80%"}>
      <Grid>
        <Grid.Col span={6}>
          <Text fw={"bold"} size={45}>
            Increase your productivity and focus with BeatTime
          </Text>
          <Text fw={"lighter"} size={25} mb={"lg"}>
            BeatTime is the ultimate productivity app that combines task
            management, Pomodoro technique, and integration with Google Calendar
            and Spotify. Stay focused, motivated, and achieve more.
          </Text>
          <Button variant="filled" color="primary">
            Get Started
          </Button>
        </Grid.Col>

        <Grid.Col span={6}>
          <Center>
            <Image src={"/OIG.jpeg"} width={700} height={700} alt={""}></Image>
          </Center>
        </Grid.Col>
      </Grid>
    </Center>
  );
};
