// packages/webapp/src/pages/PropertyDetailsPage/components/KeyInformationSection.tsx
import React from "react";
import { Title, SimpleGrid, Text, Badge } from "@mantine/core";
import {
  IconBuildingSkyscraper,
  IconHomeCheck,
  IconHomeDollar,
  IconDimensions,
  IconBed,
  IconBath,
  IconCalendar,
  IconUserCircle,
} from "@tabler/icons-react";
import { DetailItem } from "./DetailItem";
import { PropertySectionProps } from "./types";

export const KeyInformationSection: React.FC<PropertySectionProps> = ({
  property,
  displayValue,
}) => {
  return (
    <section>
      <Title order={4} mb="md">
        Key Information
      </Title>
      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
        <DetailItem
          label="Price"
          value={
            <Text size="xl" c="blue.6" fw={700}>
              {displayValue(
                property.price ? parseFloat(property.price.toString()) : null,
                " AED"
              )}
            </Text>
          }
        />
        {property.priceOnApplication && (
          <DetailItem
            label=""
            value={
              <Badge color="teal" size="lg">
                Price on Application
              </Badge>
            }
          />
        )}
        <DetailItem
          label="Property Type"
          value={displayValue(property.propertyType?.name)}
          icon={<IconBuildingSkyscraper size={18} />}
        />
        <DetailItem
          label="Status"
          value={displayValue(property.propertyStatus?.name)}
          icon={<IconHomeCheck size={18} />}
        />
        <DetailItem
          label="Offering Type"
          value={displayValue(property.offeringType?.name)}
          icon={<IconHomeDollar size={18} />}
        />
        <DetailItem
          label="Size (sqft)"
          value={displayValue(
            property.sizeSqft ? parseFloat(property.sizeSqft.toString()) : null
          )}
          icon={<IconDimensions size={18} />}
        />
        <DetailItem
          label="Plot Size (sqft)"
          value={displayValue(
            property.plotSize ? parseFloat(property.plotSize.toString()) : null
          )}
          icon={<IconDimensions size={18} />}
        />
        <DetailItem
          label="Bedrooms"
          value={displayValue(property.numberOfBedrooms)}
          icon={<IconBed size={18} />}
        />
        <DetailItem
          label="Bathrooms"
          value={displayValue(property.numberOfBathrooms)}
          icon={<IconBath size={18} />}
        />
        <DetailItem
          label="Parking Spaces"
          value={displayValue(property.parking)}
        />
        <DetailItem
          label="Agent"
          value={displayValue(property.agent?.name)}
          icon={<IconUserCircle size={18} />}
        />
        <DetailItem
          label="Availability Date"
          value={displayValue(
            property.availabilityDate
              ? new Date(property.availabilityDate)
              : null
          )}
          icon={<IconCalendar size={18} />}
        />
        <DetailItem
          label="Build Year"
          value={displayValue(property.buildYear)}
        />
        <DetailItem label="Off-Plan" value={displayValue(property.offPlan)} />
      </SimpleGrid>
    </section>
  );
};
