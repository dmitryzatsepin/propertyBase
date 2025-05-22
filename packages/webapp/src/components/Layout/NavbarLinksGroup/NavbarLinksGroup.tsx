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
} from "@mantine/core"; // Добавил Stack
import { IconChevronRight } from "@tabler/icons-react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import classes from "./NavbarLinksGroup.module.css";
import { NavGroupData } from "../../../config/navigation.config";

type LinksGroupProps = Omit<NavGroupData, "id" | "adminOnly">;

export function LinksGroup({
  icon: Icon,
  label,
  initiallyOpened,
  links,
  link: groupLinkPath, // Это путь, если сама группа является ссылкой (например, Dashboard)
}: LinksGroupProps) {
  const location = useLocation();
  const hasLinks = Array.isArray(links) && links.length > 0;

  // Определяет, активна ли ТОЧНО ЭТА ссылка (для под-ссылок или одиночной группы)
  const isPathExactlyActive = useCallback(
    (path: string | undefined) => {
      return path ? location.pathname === path : false;
    },
    [location.pathname]
  );

  // Определяет, активна ли группа В ЦЕЛОМ (т.е. либо сама группа, либо одна из ее под-ссылок)
  const isGroupOrAnySublinkActive = useCallback(() => {
    if (isPathExactlyActive(groupLinkPath)) return true; // Сама группа активна
    if (hasLinks && links) {
      return links.some((item) => isPathExactlyActive(item.link)); // Активна одна из под-ссылок
    }
    return false;
  }, [groupLinkPath, links, hasLinks, isPathExactlyActive]);

  // Состояние opened для раскрытия группы
  const [opened, setOpened] = useState(initiallyOpened || false);

  // Эффект для раскрытия группы, если она становится активной (например, при прямой навигации)
  useEffect(() => {
    if (isGroupOrAnySublinkActive()) {
      if (!opened) setOpened(true);
    }
    // Не закрываем автоматически, чтобы пользователь мог сам управлять
  }, [isGroupOrAnySublinkActive, opened]); // Используем isGroupOrAnySublinkActive

  const handleToggleOpen = () => {
    if (hasLinks) {
      setOpened((o) => !o);
    }
    // Если это одиночная ссылка, навигация уже произошла через RouterLink
  };

  const items = hasLinks
    ? links.map((link) => (
        <RouterLink
          to={link.link}
          key={link.label}
          className={classes.link}
          data-active={isPathExactlyActive(link.link) || undefined} // Точное совпадение для подсветки под-ссылки
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

  const controlIsActiveForStyling = isGroupOrAnySublinkActive(); // Для стилизации основного контрола группы

  if (!hasLinks && groupLinkPath) {
    // Одиночная ссылка группы
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

  // Группа с под-ссылками
  return (
    <>
      <UnstyledButton
        onClick={handleToggleOpen}
        className={classes.control}
        data-active={controlIsActiveForStyling || undefined} // Подсветка группы, если она или ее дети активны
      >
        <Group justify="space-between" gap={0} wrap="nowrap">
          <Box style={{ display: "flex", alignItems: "center" }}>
            {/* Для ThemeIcon основной группы: если хочешь другой стиль, когда активна только под-ссылка, а не сама группа */}
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
          {/* Можно обернуть items в Stack для отступов между под-ссылками */}
          <Stack gap={0} className={classes.subLinksContainer}>
            {" "}
            {/* Используем класс для отступа линии и самих ссылок */}
            {items}
          </Stack>
        </Collapse>
      ) : null}
    </>
  );
}
