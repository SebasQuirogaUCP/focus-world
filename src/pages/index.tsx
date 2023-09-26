import { Header } from "@/components/Header";
import { SideNavBar } from "@/components/SideNavBar";
import { AppShell, MantineProvider } from "@mantine/core";
import { useToggle } from "@mantine/hooks";

//TODO: Migrate index.tsx logic to _app.tsx and viceversa
export default function Home() {
  const [sideNavBarOpen, toggleOpenSideNavBar] = useToggle([false, true]);

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
        navbar={
          <SideNavBar
            open={sideNavBarOpen}
            toggleSideNavBar={toggleOpenSideNavBar}
          />
        }
        header={<Header toggleSideNavBar={toggleOpenSideNavBar} />}
        styles={(theme) => ({
          main: {
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[8]
                : theme.colors.gray[0],
          },
        })}
      >
        {/* Your application here */}
      </AppShell>
    </MantineProvider>
  );
}
