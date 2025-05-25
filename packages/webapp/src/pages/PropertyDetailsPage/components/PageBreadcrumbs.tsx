// packages/webapp/src/pages/PropertyDetailsPage/components/PageBreadcrumbs.tsx
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Breadcrumbs, Anchor } from "@mantine/core";

export interface BreadcrumbItem {
  title: string;
  href: string;
}

interface PageBreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const PageBreadcrumbs: React.FC<PageBreadcrumbsProps> = ({ items }) => {
  if (!items || items.length === 0) {
    return null;
  }

  const breadcrumbLinks = items.map((item) => (
    <Anchor
      component={RouterLink}
      to={item.href}
      key={item.href} // Используем href как ключ, если title может повторяться
      underline="hover"
      c="dimmed"
      fz="sm"
    >
      {item.title}
    </Anchor>
  ));

  return (
    <Breadcrumbs mb="lg" separator=">" separatorMargin="xs">
      {breadcrumbLinks}
    </Breadcrumbs>
  );
};
