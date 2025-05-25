// packages/webapp/src/pages/PropertyDetailsPage/components/DetailItem.tsx
import React from "react";
import { Box, Group, Text } from "@mantine/core";

export interface DetailItemProps {
  label: string;
  value: React.ReactNode;
  icon?: React.ReactNode;
  fullWidthValue?: boolean; // Новый проп для контроля ширины
}

export const DetailItem: React.FC<DetailItemProps> = ({
  label,
  value,
  icon,
  fullWidthValue,
}) => (
  <Box>
    <Group gap="xs" mb={4} wrap="nowrap">
      {icon}
      <Text component="span" fw={500} size="sm" style={{ flexShrink: 0 }}>
        {label}:
      </Text>{" "}
      {/* Изменили Text для label на span */}
      {fullWidthValue && <Box style={{ flexGrow: 1 }} />}
    </Group>
    {/* Рендерим value напрямую, без обертки в Text */}
    <Box ml={icon ? "md" : 0}>{value}</Box>{" "}
    {/* Обернули в Box (div) для отступа, если есть иконка */}
  </Box>
);
