import { LandingPageMain } from "@/components/landingPage/LandingPageMain";
import { AppShell, MantineProvider } from "@mantine/core";

export default function Home() {
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
        // header={<LandingPageHeader />}
        styles={(theme) => ({
          main: {
            backgroundColor: "white",
          },
        })}
      >
        <LandingPageMain />

        {/* <Timer /> */}
      </AppShell>
    </MantineProvider>
  );
}
