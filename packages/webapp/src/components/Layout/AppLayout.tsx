// packages/webapp/src/components/Layout/AppLayout.tsx
import React, { useState, useEffect, useCallback } from "react";
import {
  Title,
  Tooltip,
  UnstyledButton,
  Text,
  ScrollArea,
  Stack,
  Box,
  Image,
} from "@mantine/core";
import {
  Outlet,
  Link as RouterLink,
  useLocation,
  useNavigate,
} from "react-router-dom";
import {
  mainLinksData,
  getSubLinksForMainSection,
  NavLinkItem,
} from "../../config/navigation.config";
import logoApp from "../../assets/property.png"; // Убедись, что путь правильный
import classes from "./AppLayout.module.css";

export function AppLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  // Функция для определения активного главного раздела на основе текущего URL
  const getActiveMainIdFromPath = useCallback((currentPath: string) => {
    // Сначала ищем точное совпадение с одной из под-ссылок
    for (const mainLink of mainLinksData) {
      if (mainLink.subLinks.some((subLink) => subLink.path === currentPath)) {
        return mainLink.id;
      }
    }
    // Если точного совпадения нет, ищем по началу пути (для вложенных маршрутов, не покрытых subLinks)
    // Исключаем корневой путь '/' из этой логики startsWith, чтобы он не делал первый раздел активным по умолчанию для всех подпутей
    for (const mainLink of mainLinksData) {
      if (
        mainLink.subLinks.some(
          (subLink) =>
            currentPath.startsWith(subLink.path) && subLink.path !== "/"
        )
      ) {
        return mainLink.id;
      }
    }
    // Если мы на корневом пути '/', и у первого главного раздела первая под-ссылка тоже '/', делаем его активным
    if (currentPath === "/" && mainLinksData[0]?.subLinks[0]?.path === "/") {
      return mainLinksData[0].id;
    }

    // Если ничего не подошло, возвращаем ID первого элемента или дефолтное значение
    return mainLinksData[0]?.id || "dashboard";
  }, []); // mainLinksData - внешняя константа, location.pathname передается как аргумент

  const [activeMainId, setActiveMainId] = useState<string>(() =>
    getActiveMainIdFromPath(location.pathname)
  );
  const [activeSubPath, setActiveSubPath] = useState<string>(location.pathname);

  useEffect(() => {
    const newActiveMainId = getActiveMainIdFromPath(location.pathname);
    setActiveMainId(newActiveMainId);
    setActiveSubPath(location.pathname);
  }, [location.pathname, getActiveMainIdFromPath]);

  const handleMainLinkClick = (mainLinkId: string) => {
    const firstSubLink = getSubLinksForMainSection(mainLinkId)[0];
    if (firstSubLink) {
      navigate(firstSubLink.path);
      // Состояния activeMainId и activeSubPath обновятся через useEffect
    } else {
      // Если у главного раздела нет под-ссылок (маловероятно по нашей структуре)
      // Можно просто установить activeMainId, если нет навигации
      setActiveMainId(mainLinkId);
      // Или перейти на какой-то "общий" путь для этой секции, если он есть
      // navigate(`/section/${mainLinkId}`);
    }
  };

  const mainLinksRendered = mainLinksData.map((link) => (
    <Tooltip
      label={link.label}
      position="right"
      withArrow
      transitionProps={{ duration: 0 }}
      key={link.id}
    >
      <UnstyledButton
        onClick={() => handleMainLinkClick(link.id)}
        className={classes.mainLink}
        data-active={link.id === activeMainId || undefined}
      >
        <link.icon size={22} stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  ));

  const subLinksRendered = getSubLinksForMainSection(activeMainId).map(
    (
      linkItem: NavLinkItem // Переименовал link в linkItem для ясности
    ) => (
      <RouterLink
        to={linkItem.path}
        key={linkItem.path}
        className={classes.link}
        data-active={linkItem.path === activeSubPath || undefined}
        // onClick={() => setActiveSubPath(linkItem.path)} // Обновляется через useEffect
      >
        <Text component="span" size="sm">
          {linkItem.label}
        </Text>
      </RouterLink>
    )
  );

  const activeMainLabel =
    mainLinksData.find((link) => link.id === activeMainId)?.label || "Menu";

  return (
    <Box style={{ display: "flex", minHeight: "100vh" }}>
      {" "}
      {/* Добавил minHeight */}
      <nav className={classes.navbar}>
        <div className={classes.wrapper}>
          <div className={classes.aside}>
            <div className={classes.logo}>
              <Image src={logoApp} alt="App Logo" h={30} w="auto" />
            </div>
            {/* Обернул в Stack для корректного вертикального расположения и отступов */}
            <Stack gap="xs" align="center" style={{ width: "100%" }}>
              {mainLinksRendered}
            </Stack>
          </div>
          <div className={classes.mainNavArea}>
            <Title order={4} className={classes.title}>
              {activeMainLabel}
            </Title>
            <ScrollArea style={{ flex: 1 }}>
              {/* Обернул под-ссылки в Stack для управления отступами, если нужно */}
              <Stack gap={0}>{subLinksRendered}</Stack>
            </ScrollArea>
          </div>
        </div>
      </nav>
      <main className={classes.pageContent}>
        <Outlet />
      </main>
    </Box>
  );
}
