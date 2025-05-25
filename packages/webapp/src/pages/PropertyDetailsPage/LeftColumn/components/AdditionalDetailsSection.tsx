// packages/webapp/src/pages/PropertyDetailsPage/components/AdditionalDetailsSection.tsx
import React from "react";
import { Title, SimpleGrid } from "@mantine/core";
import {
  IconHomeCheck,
  IconHomeQuestion,
  IconKey,
  IconReceipt,
} from "@tabler/icons-react";
import { DetailItem, PropertySectionProps } from "../../components";
import { displayValue } from "../../../../utils/displayFormatters";

export const AdditionalDetailsSection: React.FC<PropertySectionProps> = ({
  property,
}) => {
  // Можно добавить проверку, есть ли хоть одно значение в этой секции, чтобы не рендерить пустую
  return (
    <section>
      <Title order={4} mb="md">
        Additional Details
      </Title>
      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
        <DetailItem
          label="Unit Number"
          value={displayValue(property.unitNumber)}
        />
        <DetailItem label="Floor" value={displayValue(property.floor)} />
        <DetailItem label="Stories" value={displayValue(property.stories)} />
        <DetailItem
          label="Completion Status"
          value={displayValue(property.completionStatus?.name)}
          icon={<IconHomeCheck size={18} />}
        />
        <DetailItem
          label="Furnishing Status"
          value={displayValue(property.furnishedStatus?.name)}
          icon={<IconHomeQuestion size={18} />}
        />
        <DetailItem
          label="Ownership Type"
          value={displayValue(property.ownershipType?.name)}
          icon={<IconKey size={18} />}
        />
        <DetailItem
          label="Property Purpose"
          value={displayValue(property.propertyPurpose?.name)}
        />
        <DetailItem
          label="Rent Frequency"
          value={displayValue(property.rentFrequency?.name)}
          icon={<IconReceipt size={18} />}
        />
        <DetailItem
          label="No. of Cheques"
          value={displayValue(property.numberOfCheques)}
        />
        <DetailItem
          label="Service Charge (AED/sqft)"
          value={displayValue(
            property.serviceChargeAEDPerSQFT
              ? parseFloat(property.serviceChargeAEDPerSQFT.toString())
              : null
          )}
        />
        <DetailItem
          label="DTCM Permit"
          value={displayValue(property.dtcmPermit)}
        />
        <DetailItem
          label="Permit Number"
          value={displayValue(property.permitNumber)}
        />
        <DetailItem
          label="External Property ID"
          value={displayValue(property.externalPropertyId)}
        />
        <DetailItem
          label="Title Deed No./Year"
          value={displayValue(property.titleDeedNumberYear)}
        />
        <DetailItem
          label="Developer Bitrix ID"
          value={displayValue(property.developerBitrixId)}
        />
        <DetailItem
          label="Seller/Landlord PA Bitrix IDs"
          value={displayValue(property.sellerLandlordPABitrixIds)}
        />
      </SimpleGrid>
    </section>
  );
};
