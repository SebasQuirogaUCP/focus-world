import { Button, List, Stack, Text, useMantineTheme } from "@mantine/core";

export const LandingPageHomeSecond = () => {
  const theme = useMantineTheme();

  return (
    <>
      <Stack>
        <Text
          fw={"bold"}
          size={45}
          style={{
            color: theme.colors.primary[8],
          }}
        >
          Take control of your tasks with ease
        </Text>
        <Text fw={"250"} size={23} mb={"lg"}>
          BeatTime&apos;s Task Management feature allows you to effortlessly
          create, edit, and prioritize tasks. Stay organized and focused on what
          matters most.
        </Text>

        <List spacing="xs" size={20} center>
          <List.Item icon={<span>🌟</span>} fw={"250"}>
            Define your daily objectives
          </List.Item>
          <List.Item icon={<span>⏰</span>} fw={"250"}>
            Break them down into manageable 25-minute subtasks
          </List.Item>
          <List.Item icon={<span>🎧</span>} fw={"250"}>
            Enhance your focus by listening to your favorite playlist. Connect
            to it using the Spotify plugin.
          </List.Item>
          <List.Item icon={<span>🚀</span>} fw={"250"}>
            Immerse yourself and start boosting your productivity
          </List.Item>
          <List.Item icon={<span>📊</span>} fw={"250"}>
            Measure your productivity with the Metrics plugin!
          </List.Item>
          <List.Item icon={<span>📅</span>} fw={"250"}>
            No enough time? Sync them with Google Calendar using our Google
            Calendar plugin
          </List.Item>
          <List.Item icon={<span>🏆</span>} fw={"250"}>
            Check the leaderboard to see how you compare with others – you might
            be on top again!
          </List.Item>
        </List>

        <Button variant="outline" color="primary" mt={"lg"}>
          I want to join
        </Button>
      </Stack>
    </>
  );
};
