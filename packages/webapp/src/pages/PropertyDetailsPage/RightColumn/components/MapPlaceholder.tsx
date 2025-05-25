// packages/webapp/src/pages/PropertyDetailsPage/components/MapPlaceholder.tsx
import React from "react";
import { Paper, Title, Box, Text } from "@mantine/core";

export const MapPlaceholder: React.FC = () => {
  return (
    <Paper shadow="sm" p="lg" radius="md">
      <Title order={4} mb="md">
        Map
      </Title>
      <Box
        h={200}
        bg="gray.2"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text c="dimmed">Map Placeholder</Text>
      </Box>
    </Paper>
  );
};
