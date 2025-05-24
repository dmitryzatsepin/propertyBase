// packages/webapp/src/pages/PropertyDetailsPage/components/RelationsSection.tsx
import React from "react";
import { Title, Group, Badge, Stack, Box } from "@mantine/core";
import { IconWorld, IconTools, IconShieldLock } from "@tabler/icons-react";
import { PropertySectionProps } from "./types";
import { PropertyPortal, PropertyAmenity } from "./types";

export const RelationsSection: React.FC<PropertySectionProps> = ({
  property,
}) => {
  const hasPortals = property.portals && property.portals.length > 0;
  const hasPrivateAmenities =
    property.privateAmenities && property.privateAmenities.length > 0;
  const hasCommercialAmenities =
    property.commercialAmenities && property.commercialAmenities.length > 0;

  if (!hasPortals && !hasPrivateAmenities && !hasCommercialAmenities) {
    return null;
  }

  return (
    <section>
      <Stack gap="lg">
        {hasPortals && (
          <Box>
            <Title order={4} mb="sm">
              Listed on Portals
            </Title>
            <Group gap="sm">
              {property.portals.map((portal: PropertyPortal) => (
                <Badge
                  key={portal.id}
                  leftSection={<IconWorld size={14} />}
                  variant="light"
                  radius="sm"
                >
                  {portal.name}
                </Badge>
              ))}
            </Group>
          </Box>
        )}

        {hasPrivateAmenities && (
          <Box>
            <Title order={4} mb="sm">
              Private Amenities
            </Title>
            <Group gap="sm" wrap="wrap">
              {" "}
              {/* Добавил wrap="wrap" */}
              {property.privateAmenities.map((amenity: PropertyAmenity) => (
                <Badge
                  key={amenity.id}
                  leftSection={<IconTools size={14} />}
                  variant="outline"
                  radius="sm"
                >
                  {amenity.name}
                </Badge>
              ))}
            </Group>
          </Box>
        )}

        {hasCommercialAmenities && (
          <Box>
            <Title order={4} mb="sm">
              Commercial Amenities
            </Title>
            <Group gap="sm" wrap="wrap">
              {" "}
              {/* Добавил wrap="wrap" */}
              {property.commercialAmenities.map((amenity: PropertyAmenity) => (
                <Badge
                  key={amenity.id}
                  leftSection={<IconShieldLock size={14} />}
                  variant="filled"
                  radius="sm"
                >
                  {amenity.name}
                </Badge>
              ))}
            </Group>
          </Box>
        )}
      </Stack>
    </section>
  );
};
