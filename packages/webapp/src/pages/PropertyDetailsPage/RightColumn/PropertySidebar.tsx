// packages/webapp/src/pages/PropertyDetailsPage/RightColumn/PropertySidebar.tsx
import React from "react";
import { Stack } from "@mantine/core";
import { AgentInformationCard } from "./components/AgentInformationCard";
import { MapPlaceholder } from "./components/MapPlaceholder";
import type { PropertyWithDetails } from "../../components/types"; // Путь к общим типам

interface PropertySidebarProps {
  agent: PropertyWithDetails["agent"]; // Передаем только нужную часть property
}

export const PropertySidebar: React.FC<PropertySidebarProps> = ({ agent }) => {
  return (
    <Stack gap="xl">
      <AgentInformationCard agent={agent} />
      <MapPlaceholder />
    </Stack>
  );
};
