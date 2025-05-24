// packages/webapp/src/pages/PropertyDetailsPage/components/DescriptionsSection.tsx
import React from "react";
import { Title, Text } from "@mantine/core";
import { IconFileDescription } from "@tabler/icons-react";
import { DetailItem } from "./DetailItem";
import { PropertySectionProps } from "./types";

export const DescriptionsSection: React.FC<PropertySectionProps> = ({
  property,
  displayValue,
}) => {
  if (!property.propertyDescription && !property.propertyDescriptionAR) {
    return null; // Не рендерим секцию, если нет описаний
  }

  return (
    <section>
      <Title order={4} mb="md">
        Descriptions
      </Title>
      {property.propertyDescription && (
        <DetailItem
          label="Description (EN)"
          value={
            <Text style={{ whiteSpace: "pre-wrap" }}>
              {displayValue(property.propertyDescription)}
            </Text>
          }
          icon={<IconFileDescription size={18} />}
          fullWidthValue
        />
      )}
      {property.propertyDescriptionAR && (
        <DetailItem
          label="Description (AR)"
          value={
            <Text
              style={{
                whiteSpace: "pre-wrap",
                textAlign: "right",
                direction: "rtl",
              }}
            >
              {displayValue(property.propertyDescriptionAR)}
            </Text>
          }
          icon={<IconFileDescription size={18} />}
          fullWidthValue
          // mt={property.propertyDescription ? 'md' : undefined} // Добавить отступ, если есть оба описания
        />
      )}
    </section>
  );
};
