// packages/webapp/src/config/navigation.config.ts
import {
  IconGauge,
  IconHomeCog,
  IconMapPin,
  IconPhoto,
  IconUpload,
  IconUsers,
  IconSettings,
  IconListDetails,
  IconSquarePlus,
  IconFileImport,
  IconFileExport,
  IconTemplate,
  IconKey,
  IconCurrencyDollar,
  IconMail,
} from "@tabler/icons-react";

export interface SingleNavLink {
  label: string;
  link: string;
  icon?: React.ElementType;
  adminOnly?: boolean;
}

export interface NavGroupData {
  label: string;
  icon: React.ElementType;
  initiallyOpened?: boolean;
  links?: SingleNavLink[];
  link?: string;
  adminOnly?: boolean;
  id?: string;
}

export const navigationData: NavGroupData[] = [
  { label: "Dashboard", icon: IconGauge, link: "/", id: "dashboard" }, // Одиночная ссылка
  {
    label: "Properties",
    icon: IconHomeCog,
    id: "properties",
    links: [
      { label: "All Properties", link: "/properties", icon: IconListDetails },
      { label: "Add Property", link: "/properties/add", icon: IconSquarePlus },
    ],
  },
  {
    label: "Locations",
    icon: IconMapPin,
    id: "locations",
    adminOnly: true,
    links: [
      {
        label: "Manage Locations",
        link: "/locations/manage",
        icon: IconListDetails,
      },
      {
        label: "Import Locations (Excel)",
        link: "/import/locations-excel",
        icon: IconFileImport,
      },
    ],
  },
  {
    label: "Marketing",
    icon: IconPhoto,
    id: "marketing",
    links: [
      {
        label: "Brochures",
        link: "/marketing/brochures",
        icon: IconFileExport,
      },
      {
        label: "Brochure Templates",
        link: "/marketing/templates",
        icon: IconTemplate,
      },
    ],
  },
  {
    label: "Listings",
    icon: IconUpload,
    id: "listings",
    adminOnly: true,
    links: [
      {
        label: "Export to Portals",
        link: "/listings/export",
        icon: IconUpload,
      },
      {
        label: "Integration Settings",
        link: "/listings/settings",
        icon: IconKey,
      },
    ],
  },
  {
    label: "Users",
    icon: IconUsers,
    id: "users",
    adminOnly: true,
    links: [{ label: "User List", link: "/users", icon: IconListDetails }],
  },
  {
    label: "Settings",
    icon: IconSettings,
    id: "settings",
    adminOnly: true,
    links: [
      {
        label: "System Settings",
        link: "/settings/system",
        icon: IconCurrencyDollar,
      },
      {
        label: "Notification Templates",
        link: "/settings/templates/notifications",
        icon: IconMail,
      },
    ],
  },
];

export const getFilteredNavigationData = (isAdmin: boolean): NavGroupData[] => {
  if (isAdmin) {
    return navigationData;
  }
  return navigationData
    .filter((group) => !group.adminOnly) // Фильтруем группы
    .map((group) => {
      if (group.links) {
        // Если есть под-ссылки, фильтруем и их
        return {
          ...group,
          links: group.links.filter((link) => !link.adminOnly),
        };
      }
      return group;
    })
    .filter((group) => group.link || (group.links && group.links.length > 0));
};
