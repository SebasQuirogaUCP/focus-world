import {
  ActionIcon,
  Badge,
  Code,
  Group,
  Navbar,
  Text,
  TextInput,
  Tooltip,
  UnstyledButton,
  rem,
  useMantineTheme,
} from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import {
  IconArrowBadgeLeftFilled,
  IconBulb,
  IconCheckbox,
  IconPlus,
  IconSearch,
  IconUser,
} from "@tabler/icons-react";
import Link from "next/link";
import { useStyles } from "./hooks/useStyles";

const links = [
  { icon: IconBulb, label: "Activity", notifications: 3 },
  { icon: IconCheckbox, label: "Tasks", notifications: 4 },
  { icon: IconUser, label: "Contacts" },
];

const collections = [
  { emoji: "👍", label: "Tasks" },
  { emoji: "🚚", label: "Projects" },
  { emoji: "💸", label: "Due Dates" },
  { emoji: "💰", label: "Priorities" },
  { emoji: "✨", label: "Reminders" },
  { emoji: "🛒", label: "Labels" },
  { emoji: "📅", label: "Events" },
  { emoji: "🙈", label: "Completed Tasks" },
];

type Props = {
  open: boolean;
  toggleSideNavBar: () => void;
};

export const SideNavBar = ({ open, toggleSideNavBar }: Props) => {
  const { classes } = useStyles();
  const { height } = useViewportSize();
  const { colors } = useMantineTheme();

  if (!open) return <></>;

  const mainLinks = links.map((link) => (
    <UnstyledButton key={link.label} className={classes.mainLink}>
      <div className={classes.mainLinkInner}>
        <link.icon size={20} className={classes.mainLinkIcon} stroke={1.5} />
        <span>{link.label}</span>
      </div>
      {link.notifications && (
        <Badge size="sm" variant="filled" className={classes.mainLinkBadge}>
          {link.notifications}
        </Badge>
      )}
    </UnstyledButton>
  ));

  const collectionLinks = collections.map((collection) => (
    <Link
      href="/"
      onClick={(event) => event.preventDefault()}
      key={collection.label}
      className={classes.collectionLink}
    >
      <span style={{ marginRight: rem(9), fontSize: rem(16) }}>
        {collection.emoji}
      </span>{" "}
      {collection.label}
    </Link>
  ));

  return (
    <Navbar
      height={height}
      width={{ sm: 300 }}
      p="md"
      className={classes.navbar}
    >
      <Group noWrap>
        <TextInput
          placeholder="Search"
          size="xs"
          icon={<IconSearch size="0.8rem" stroke={1.5} />}
          rightSectionWidth={70}
          rightSection={<Code className={classes.searchCode}>Ctrl + K</Code>}
          styles={{ rightSection: { pointerEvents: "none" } }}
        />
        <ActionIcon onClick={toggleSideNavBar} color="primary">
          <IconArrowBadgeLeftFilled size={"20"} color={colors.primary[0]} />
        </ActionIcon>
      </Group>

      <Navbar.Section className={classes.section}>
        <div className={classes.mainLinks}>{mainLinks}</div>
      </Navbar.Section>
      <Navbar.Section className={classes.section}>
        <Group className={classes.collectionsHeader} position="apart">
          <Text size="xs" weight={500} color="dimmed">
            Collections
          </Text>
          <Tooltip label="Create collection" withArrow position="right">
            <ActionIcon variant="default" size={18}>
              <IconPlus size="0.8rem" stroke={1.5} />
            </ActionIcon>
          </Tooltip>
        </Group>
        <div className={classes.collections}>{collectionLinks}</div>
      </Navbar.Section>
    </Navbar>
  );
};
