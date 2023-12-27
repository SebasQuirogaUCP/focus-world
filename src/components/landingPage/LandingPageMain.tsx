import { LandingPageMenuOptions } from "@/models/landingPage/LandingPagePaths";
import { ActionIcon, Center, Grid, Group } from "@mantine/core";
import { useToggle } from "@mantine/hooks";
import {
  IconArrowBadgeLeftFilled,
  IconArrowBadgeRightFilled,
} from "@tabler/icons-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { LandingPageHeader } from "./LandingPageHeader";
import { LandingPageHomeFirst } from "./LandingPageHomeFirst";
import { LandingPageHomeSecond } from "./LandingPageHomeSecond";
import { Leaderboard } from "./Leaderboard";

export const LandingPageMain = () => {
  const [menu, setMenuOption] = useState<LandingPageMenuOptions>("home");

  const [homePage, toggleHomePage] = useToggle([true, false]);

  const session = useSession();

  const router = useRouter();

  const onMenuChange = (menuOption: LandingPageMenuOptions) => {
    setMenuOption(menuOption);
  };

  useEffect(() => {
    if (session.status === "authenticated") {
      router.push("/main");
    }
  }, [router, session.status]);

  return (
    <>
      <LandingPageHeader routerCB={onMenuChange} />
      <Center h={"80%"}>
        <Group w={"80%"}>
          {menu === "home" ? (
            <Grid>
              <Grid.Col span={11} order={homePage ? 0 : 1}>
                {homePage ? (
                  <LandingPageHomeFirst />
                ) : (
                  <LandingPageHomeSecond />
                )}
              </Grid.Col>
              <Grid.Col span={1}>
                <Center h={"100%"} w={"100%"}>
                  <ActionIcon
                    size={50}
                    color={"primary"}
                    onClick={() => toggleHomePage()}
                  >
                    {homePage ? (
                      <IconArrowBadgeRightFilled size={50} />
                    ) : (
                      <IconArrowBadgeLeftFilled size={50} />
                    )}
                  </ActionIcon>
                </Center>
              </Grid.Col>
            </Grid>
          ) : (
            <Leaderboard />
          )}
        </Group>
      </Center>
    </>
  );
};
