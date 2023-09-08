import { Header } from "@/components/Header";
import { AppShell, Navbar } from "@mantine/core";

export default function Home() {
  return (
    <AppShell
      padding="md"
      navbar={
        <Navbar width={{ base: 300 }} height={500} p="xs">
          {/* Navbar content */}
        </Navbar>
      }
      header={
        <Header
          tabs={["Settings"]}
          user={{
            name: "",
            image: "",
          }}
        />
        // <Header height={60} p="xs">
        // </Header>
      }
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
  );
}
