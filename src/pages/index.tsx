import { LandingPageHeader } from "@/components/landingPage/LandingPageHeader";
import { MainLandingPage } from "@/components/landingPage/MainLandingPage";
import { AppShell, MantineProvider } from "@mantine/core";
import { useToggle } from "@mantine/hooks";

export default function Home() {
  const [sideNavBarOpen, toggleOpenSideNavBar] = useToggle([true, true]);

  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: "light",
        colors: {
          primary: [
            "#C3ACD0",
            "#C3ACD0",
            "#C3ACD0",
            "#C3ACD0",
            "#C3ACD0",
            "#674188",
            "#674188",
            "#674188",
            "#674188",
            "#674188",
          ],

          secondary: [
            "#F7EFE5",
            "#F7EFE5",
            "#F7EFE5",
            "#F7EFE5",
            "#F7EFE5",
            "#FFFBF5",
            "#FFFBF5",
            "#FFFBF5",
            "#FFFBF5",
            "#FFFBF5",
          ],
        },
      }}
    >
      <AppShell
        padding="md"
        // header={<Header toggleSideNavBar={toggleOpenSideNavBar} />}
        header={<LandingPageHeader />}
        styles={(theme) => ({
          main: {
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[8]
                : theme.colors.gray[0],
          },
        })}
      >
        <MainLandingPage />
        {/* <Timer /> */}
      </AppShell>
    </MantineProvider>
  );
}
