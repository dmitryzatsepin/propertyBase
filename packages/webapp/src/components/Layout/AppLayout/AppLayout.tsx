// packages/webapp/src/components/Layout/AppLayout.tsx
import React from "react";
import {
  ScrollArea,
  Group,
  Stack,
  Box,
  Code,
  Text,
  TextInput,
} from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import {
  getFilteredNavigationData,
  NavGroupData,
} from "../../../config/navigation.config";
import { LinksGroup } from "../NavbarLinksGroup/NavbarLinksGroup";
import { UserButton } from "../UserButton/UserButton";
// import { Logo } from './Logo';
import classes from "./AppLayout.module.css";

export const AppLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const isAdmin = true; // TODO: Заменить на реальную логику определения админа
  const visibleNavigationData = getFilteredNavigationData(isAdmin);

  const links = visibleNavigationData.map((item: NavGroupData) => (
    <LinksGroup {...item} key={item.id || item.label} />
  ));

  return (
    <Box style={{ display: "flex", minHeight: "100vh" }}>
      <nav className={classes.navbar}>
        <div className={classes.header}>
          <Group justify="space-between">
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
          <Stack gap="md" className={classes.linksInner}>
            {links}
          </Stack>
        </ScrollArea>

        <div className={classes.footer}>
          <UserButton />
        </div>
      </nav>
      {/* Теперь children (который будет Outlet из роутера) рендерится здесь */}
      <main className={classes.pageContent}>{children}</main>
    </Box>
  );
};
