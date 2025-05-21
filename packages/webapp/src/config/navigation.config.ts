// packages/webapp/src/config/navigation.config.ts
import {
  IconGauge, // Dashboard
  IconHomeCog, // Properties
  IconMapPin, // Locations
  IconPhoto, // Marketing (Brochures)
  IconUpload, // Listings (Upload to portals)
  IconUsers, // Users
  IconSettings, // Settings
  IconListDetails, // List view
  IconSquarePlus, // Add
  IconFileExport, // Export
  IconTemplate, // Templates
  IconKey, // API Keys / Integrations
  IconCurrencyDollar, // Currency
  IconMail, // Email templates
  IconFileImport, // Для нашего импорта
} from "@tabler/icons-react";

export interface NavLinkItem {
  icon: React.ElementType;
  label: string;
  path: string;
  adminOnly?: boolean; // Флаг для элементов, доступных только администратору
}

export interface MainLinkItem {
  icon: React.ElementType;
  label: string;
  id: string; // Уникальный идентификатор для основного раздела
  subLinks: NavLinkItem[];
  adminOnly?: boolean; // Флаг для целых разделов, доступных только администратору
}

export const mainLinksData: MainLinkItem[] = [
  {
    icon: IconGauge,
    label: "Dashboard",
    id: "dashboard",
    subLinks: [
      { icon: IconGauge, label: "Overview", path: "/" },
      // Можно добавить быстрые действия как под-ссылки или кнопки на странице
    ],
  },
  {
    icon: IconHomeCog,
    label: "Properties",
    id: "properties",
    subLinks: [
      { icon: IconListDetails, label: "All Properties", path: "/properties" },
      { icon: IconSquarePlus, label: "Add Property", path: "/properties/add" },
      // Редактирование будет на странице конкретного объекта, например /properties/:id/edit
      // Массовые действия - на странице списка объектов
    ],
  },
  {
    icon: IconMapPin,
    label: "Locations",
    id: "locations",
    adminOnly: true, // Только для администратора
    subLinks: [
      {
        icon: IconListDetails,
        label: "Manage Locations",
        path: "/locations/manage",
      },
      {
        icon: IconFileImport,
        label: "Import Locations (Excel)",
        path: "/import/locations-excel",
      }, // Переместил сюда, логично
      // Добавить/редактировать локацию может быть на странице /locations/manage
    ],
  },
  {
    icon: IconPhoto,
    label: "Marketing",
    id: "marketing",
    subLinks: [
      {
        icon: IconFileExport,
        label: "Brochures",
        path: "/marketing/brochures",
      },
      {
        icon: IconTemplate,
        label: "Brochure Templates",
        path: "/marketing/templates",
      },
    ],
  },
  {
    icon: IconUpload,
    label: "Listings",
    id: "listings",
    adminOnly: true, // Только для администратора
    subLinks: [
      {
        icon: IconUpload,
        label: "Export to Portals",
        path: "/listings/export",
      },
      {
        icon: IconKey,
        label: "Integration Settings",
        path: "/listings/settings",
      },
    ],
  },
  {
    icon: IconUsers,
    label: "Users",
    id: "users",
    adminOnly: true, // Только для администратора
    subLinks: [
      { icon: IconListDetails, label: "User List", path: "/users" },
      // Добавление/редактирование - на странице списка или отдельных страницах
    ],
  },
  {
    icon: IconSettings,
    label: "Settings",
    id: "settings",
    adminOnly: true, // Только для администратора
    subLinks: [
      {
        icon: IconCurrencyDollar,
        label: "System Settings",
        path: "/settings/system",
      }, // Объединил валюты и языки
      {
        icon: IconMail,
        label: "Notification Templates",
        path: "/settings/templates/notifications",
      },
    ],
  },
];

// Дополнительные элементы (поиск, уведомления, профиль)
// Их обычно размещают в Header или в другом месте, а не как часть основного DoubleNavbar.
// Но если ты хочешь их в Navbar, можно добавить как специальные основные секции.
// Например, для профиля:
/*
export const userProfileLink: MainLinkItem = {
  icon: IconUserCircle,
  label: 'Profile',
  id: 'profile',
  subLinks: [
    { icon: IconUserCircle, label: 'My Profile', path: '/profile' },
    { icon: IconLogout, label: 'Logout', path: '/logout' }, // Потребует IconLogout
  ]
};
*/

// Функция для получения под-ссылок (остается такой же)
export const getSubLinksForMainSection = (
  activeMainLinkId: string
): NavLinkItem[] => {
  const activeMainLink = mainLinksData.find(
    (link) => link.id === activeMainLinkId
  );
  return activeMainLink ? activeMainLink.subLinks : [];
};

// Функция для фильтрации ссылок по роли (заглушка, позже будет реальная проверка роли)
export const getFilteredMainLinks = (isAdmin: boolean): MainLinkItem[] => {
  if (isAdmin) {
    return mainLinksData; // Администратор видит все
  }
  // Пользователь видит только те разделы, которые не помечены как adminOnly:true
  // и те разделы, у которых все subLinks не помечены как adminOnly:true (если такая логика нужна)
  return mainLinksData.filter((link) => !link.adminOnly);
};
