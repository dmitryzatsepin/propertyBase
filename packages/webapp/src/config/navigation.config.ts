// packages/webapp/src/config/navigation.config.ts
import {
  IconGauge,
  IconSettings,
  IconUser,
  IconTableImport,
  IconMapPin,
  IconHomeCog,
  IconHome2,
  IconDeviceDesktopAnalytics,
  IconFingerprint,
  IconCalendarStats,
} from "@tabler/icons-react";

// Типы для ссылок
export interface NavLinkItem {
  icon: React.ElementType;
  label: string;
  path: string;
}

export interface MainLinkItem {
  icon: React.ElementType;
  label: string;
  id: string;
  subLinks: NavLinkItem[];
}

// Основные разделы (для левой части Double Navbar)
export const mainLinksData: MainLinkItem[] = [
  {
    icon: IconHome2, // Используем IconHome2
    label: "Home", // Изменили label для соответствия
    id: "home", // Изменили id
    subLinks: [
      { icon: IconGauge, label: "Overview", path: "/" }, // Оставили IconGauge для под-ссылки
    ],
  },
  {
    icon: IconDeviceDesktopAnalytics, // Используем IconDeviceDesktopAnalytics
    label: "Analytics", // Изменили label
    id: "analytics", // Изменили id
    subLinks: [
      // Добавь сюда под-ссылки для аналитики, если нужно, или оставь одну
      {
        icon: IconDeviceDesktopAnalytics,
        label: "View Reports",
        path: "/analytics/reports",
      },
    ],
  },
  {
    icon: IconCalendarStats, // Используем IconCalendarStats
    label: "Releases", // Изменили label (как в примере Mantine)
    id: "releases", // Изменили id
    subLinks: [
      { icon: IconCalendarStats, label: "Version History", path: "/releases" },
    ],
  },
  {
    icon: IconTableImport,
    label: "Import Tools",
    id: "import-tools",
    subLinks: [
      {
        icon: IconTableImport,
        label: "Import Locations (Excel)",
        path: "/import/locations-excel",
      },
    ],
  },
  {
    icon: IconSettings,
    label: "Settings",
    id: "settings",
    subLinks: [
      { icon: IconUser, label: "Account", path: "/settings/account" },
      { icon: IconFingerprint, label: "Security", path: "/settings/security" }, // Используем IconFingerprint для под-ссылки
      {
        icon: IconSettings,
        label: "Application",
        path: "/settings/application",
      },
    ],
  },
  // Оставим пару оригинальных, если они тебе нужны
  {
    icon: IconMapPin,
    label: "Locations",
    id: "locations",
    subLinks: [
      { icon: IconMapPin, label: "Manage Locations", path: "/locations" },
    ],
  },
  {
    icon: IconHomeCog,
    label: "Properties",
    id: "properties",
    subLinks: [
      { icon: IconHomeCog, label: "Manage Properties", path: "/properties" },
    ],
  },
];

// Функция для получения под-ссылок (оставляем как есть)
export const getSubLinksForMainSection = (
  activeMainLinkId: string
): NavLinkItem[] => {
  const activeMainLink = mainLinksData.find(
    (link) => link.id === activeMainLinkId
  );
  return activeMainLink ? activeMainLink.subLinks : [];
};
