// packages/webapp/src/pages/PropertyDetailsPage/components/AgentInformationCard.tsx
import React from "react";
import { Paper, Title, Text } from "@mantine/core";
import { IconUserCircle } from "@tabler/icons-react";
import { DetailItem } from "../../components/DetailItem"; // Предполагаем, что DetailItem здесь тоже пригодится
import type { PropertyAgent } from "../../components/types"; // Импортируем тип агента
import { displayValue } from "../../../../utils/displayFormatters";

interface AgentInformationCardProps {
  agent: PropertyAgent | null;
}

export const AgentInformationCard: React.FC<AgentInformationCardProps> = ({
  agent,
}) => {
  if (!agent) {
    return null; // Или какой-то плейсхолдер, если агент не указан
  }

  return (
    <Paper shadow="sm" p="lg" radius="md">
      <Title order={4} mb="md">
        Agent Information
      </Title>
      <DetailItem
        label="Agent"
        value={displayValue(agent.name)}
        icon={<IconUserCircle size={18} />}
      />
      {agent.email && (
        <Text size="sm" c="dimmed" mt={4}>
          {agent.email}
        </Text>
      )}
      {/* TODO: Фото агента, компания, телефон, кнопки связи с агентом */}
    </Paper>
  );
};
