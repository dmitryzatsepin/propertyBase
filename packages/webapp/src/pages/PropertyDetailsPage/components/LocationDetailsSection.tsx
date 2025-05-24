// packages/webapp/src/pages/PropertyDetailsPage/components/LocationDetailsSection.tsx
import React from "react";
import { Title, SimpleGrid } from "@mantine/core";
import { DetailItem } from "./DetailItem";
import { PropertySectionProps } from "./types";

export const LocationDetailsSection: React.FC<PropertySectionProps> = ({
  property,
  displayValue,
}) => {
  return (
    <section>
      <Title order={4} mb="md">
        Location Details
      </Title>
      <DetailItem
        label="Full Path"
        value={displayValue(property.location?.locationPath)}
        fullWidthValue
      />
      <SimpleGrid cols={{ base: 1, sm: 2 }} mt="sm">
        <DetailItem
          label="City"
          value={displayValue(property.location?.city)}
        />
        <DetailItem
          label="Community"
          value={displayValue(property.location?.community)}
        />
        <DetailItem
          label="Subcommunity"
          value={displayValue(property.location?.subcommunity)}
        />
        <DetailItem
          label="Tower/Building"
          value={displayValue(property.location?.property)}
        />
      </SimpleGrid>
      {/* TODO: Карта */}
    </section>
  );
};
