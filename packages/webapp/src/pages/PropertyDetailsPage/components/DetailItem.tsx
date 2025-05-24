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
      <Text fw={500} size="sm" style={{ flexShrink: 0 }}>
        {label}:
      </Text>
      {fullWidthValue && <Box style={{ flexGrow: 1 }} />}{" "}
      {/* Заполнитель, если значение должно быть справа */}
    </Group>
    <Text ml={icon ? "md" : 0}>{value}</Text>{" "}
    {/* Небольшой отступ, если есть иконка */}
  </Box>
);
