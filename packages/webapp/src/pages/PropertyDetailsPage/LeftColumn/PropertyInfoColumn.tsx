// packages/webapp/src/pages/PropertyDetailsPage/LeftColumn/PropertyInfoColumn.tsx
import React from "react";
import { Paper, Stack, Divider, Title, Text } from "@mantine/core";
import {
  KeyInformationSection,
  LocationDetailsSection,
  DescriptionsSection,
  AdditionalDetailsSection,
  MediaSection,
  RelationsSection,
} from "./components"; // Импорт из локальной папки components внутри LeftColumn
import type { PropertySectionProps } from "../components/types"; // Путь к общим типам

export const PropertyInfoColumn: React.FC<PropertySectionProps> = ({
  property, // displayValue больше не проп
}) => {
  return (
    <Paper shadow="sm" p="lg" radius="md">
      <Title order={3} mb="xs">
        {property.propertyTitle} ({property.propertyRefNo})
      </Title>
      {property.location?.locationPath && (
        <Text c="dimmed" mb="lg">
          {property.location.locationPath}
        </Text>
      )}

      <Stack gap="xl">
        <KeyInformationSection property={property} />
        <Divider />
        <LocationDetailsSection property={property} />
        <Divider />
        <DescriptionsSection property={property} />
        <Divider />
        <AdditionalDetailsSection property={property} />
        <Divider />
        <MediaSection property={property} />
        <Divider />
        <RelationsSection property={property} />
      </Stack>
    </Paper>
  );
};
