// packages/webapp/src/components/Layout/NavbarLinksGroup/NavbarLinksGroup.tsx
import React, { useState, useEffect, useCallback } from "react";
import {
  Group,
  Box,
  Collapse,
  ThemeIcon,
  UnstyledButton,
  rem,
  Stack,
} from "@mantine/core";
// Убрали Text из импорта, если он не используется напрямую для link.label
import { IconChevronRight } from "@tabler/icons-react"; // Убрали TablerIconsProps
import { Link as RouterLink, useLocation } from "react-router-dom";
import classes from "./NavbarLinksGroup.module.css";
import { NavGroupData, SingleNavLink } from "../../../config/navigation.config";

type LinksGroupProps = Omit<NavGroupData, "id" | "adminOnly">;

export function LinksGroup({
  icon: Icon,
  label,
  initiallyOpened,
  links,
  link: groupLinkPath,
}: LinksGroupProps) {
  const location = useLocation();
  const hasLinks = Array.isArray(links) && links.length > 0;

  const isActivePath = useCallback(
    (path: string | undefined) => (path ? location.pathname === path : false),
    [location.pathname]
  );

  const isGroupOrAnySublinkActive = useCallback(() => {
    if (isActivePath(groupLinkPath)) return true;
    if (hasLinks && links) {
      return links.some((item) => isActivePath(item.link));
    }
    return false;
  }, [groupLinkPath, links, hasLinks, isActivePath]);

  // Начальное состояние: если initiallyOpened, то true, иначе false.
  // Автоматическое открытие по активности будет в useEffect.
  const [opened, setOpened] = useState(initiallyOpened || false);

  useEffect(() => {
    // Если initiallyOpened явно передано, оно имеет приоритет.
    if (typeof initiallyOpened === "boolean") {
      setOpened(initiallyOpened);
    } else {
      // Если группа или ее под-ссылка активна, открываем ее.
      // Это позволит группе раскрыться при прямой навигации на под-ссылку.
      if (isGroupOrAnySublinkActive()) {
        setOpened(true);
      }
      // Мы не закрываем группу здесь, если она перестала быть активной,
      // чтобы пользователь мог сам управлять ее состоянием.
    }
  }, [location.pathname, initiallyOpened, isGroupOrAnySublinkActive]); // Зависим от пути и initiallyOpened

  const handleToggleOpen = () => {
    if (hasLinks) {
      setOpened((o) => !o);
    }
  };

  const items = hasLinks
    ? links.map((link: SingleNavLink) => (
        <RouterLink
          to={link.link}
          key={link.label}
          className={classes.link}
          data-active={isActivePath(link.link) || undefined}
        >
          {link.icon && (
            <link.icon
              style={{ marginRight: rem(8) }}
              size="1rem"
              stroke={1.5}
            />
          )}
          {link.label}
        </RouterLink>
      ))
    : null;

  const controlIsActiveForStyling = isGroupOrAnySublinkActive();

  if (!hasLinks && groupLinkPath) {
    return (
      <UnstyledButton
        component={RouterLink}
        to={groupLinkPath}
        className={classes.control}
        data-active={controlIsActiveForStyling || undefined}
      >
        <Group justify="space-between" gap={0} wrap="nowrap">
          <Box style={{ display: "flex", alignItems: "center" }}>
            <ThemeIcon
              variant={controlIsActiveForStyling ? "filled" : "light"}
              size={30}
            >
              <Icon size="1.1rem" stroke={1.5} />
            </ThemeIcon>
            <Box ml="md">{label}</Box>
          </Box>
        </Group>
      </UnstyledButton>
    );
  }

  return (
    <>
      <UnstyledButton
        onClick={handleToggleOpen}
        className={classes.control}
        data-active={controlIsActiveForStyling || undefined}
      >
        <Group justify="space-between" gap={0} wrap="nowrap">
          <Box style={{ display: "flex", alignItems: "center" }}>
            <ThemeIcon
              variant={controlIsActiveForStyling ? "filled" : "light"}
              size={30}
            >
              <Icon size="1.1rem" stroke={1.5} />
            </ThemeIcon>
            <Box ml="md">{label}</Box>
          </Box>
          {hasLinks && (
            <IconChevronRight
              className={classes.chevron}
              stroke={1.5}
              size="1rem"
              style={{ transform: opened ? "rotate(90deg)" : "none" }}
            />
          )}
        </Group>
      </UnstyledButton>
      {hasLinks ? (
        <Collapse in={opened}>
          <Stack gap={0} className={classes.subLinksContainer}>
            {items}
          </Stack>
        </Collapse>
      ) : null}
    </>
  );
}
