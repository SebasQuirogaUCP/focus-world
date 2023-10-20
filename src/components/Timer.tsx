import { Center, Flex, Group, Text } from "@mantine/core";

type Props = {
  counter: string | undefined;
};

export const Timer = ({ counter }: Props) => {
  if (!counter) return <></>;

  return (
    <Center>
      <Group>
        <Text
          align="center"
          style={{
            fontSize: "100px",
            fontFamily: "Helvetica Neue",
          }}
          color="primary"
          py={0}
        >
          {counter.slice(0, 5)}
        </Text>
        <Flex
          mih={100}
          gap="md"
          justify="flex-end"
          align="flex-end"
          direction="row"
          wrap="wrap"
        >
          <Text
            align="end"
            size={"xl"}
            style={{
              fontFamily: "Helvetica Neue",
            }}
            color="primary"
          >
            {counter.slice(6, 8)}
          </Text>
        </Flex>
      </Group>
    </Center>
  );
};
