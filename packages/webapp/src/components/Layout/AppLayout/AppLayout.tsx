// packages/webapp/src/components/Layout/AppLayout.tsx
import { ScrollArea, Group, Box, Code, Text, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { Outlet } from "react-router-dom";
import {
  getFilteredNavigationData,
  NavGroupData,
} from "../../../config/navigation.config";
import { LinksGroup } from "../NavbarLinksGroup/NavbarLinksGroup";
import { UserButton } from "../UserButton/UserButton";
// import { Logo } from './Logo';
import classes from "./AppLayout.module.css";

export function AppLayout() {
  const isAdmin = true;
  const visibleNavigationData = getFilteredNavigationData(isAdmin);

  const links = visibleNavigationData.map((item: NavGroupData) => (
    <LinksGroup {...item} key={item.id || item.label} />
  ));

  return (
    <Box style={{ display: "flex", minHeight: "100vh" }}>
      <nav className={classes.navbar}>
        <div className={classes.header}>
          <Group justify="space-between">
            {/* <Logo style={{ width: 120 }} />*/}
            <Text size="xl" fw={700}>
              Property Base
            </Text>
            <Code fw={700}>v1.0.0</Code>
          </Group>
          <TextInput
            placeholder="Search"
            size="xs"
            leftSection={<IconSearch size={12} stroke={1.5} />}
            mt="sm"
          />
        </div>

        <ScrollArea className={classes.links}>
          <div className={classes.linksInner}>{links}</div>
        </ScrollArea>

        <div className={classes.footer}>
          <UserButton />
        </div>
      </nav>
      <main className={classes.pageContent}>
        <Outlet />
      </main>
    </Box>
  );
}
