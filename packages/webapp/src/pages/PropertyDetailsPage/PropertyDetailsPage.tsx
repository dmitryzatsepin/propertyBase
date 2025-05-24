// packages/webapp/src/pages/PropertyDetailsPage/PropertyDetailsPage.tsx
import React from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import {
  Container,
  Title,
  Loader,
  Alert,
  Paper,
  Divider,
  Button,
  Stack,
  Group,
  Text,
} from "@mantine/core"; // Добавил Group
import { IconAlertCircle, IconArrowLeft, IconEdit } from "@tabler/icons-react";
import { trpc } from "../../utils/trpc";
import {
  KeyInformationSection,
  LocationDetailsSection,
  DescriptionsSection,
  AdditionalDetailsSection,
  MediaSection,
  RelationsSection,
} from "./components";

// Хелпер displayValue
const displayValue = (
  value: string | number | boolean | Date | null | undefined,
  suffix = "",
  trueVal = "Yes",
  falseVal = "No"
) => {
  if (
    value === null ||
    value === undefined ||
    (typeof value === "string" && value.trim() === "")
  )
    return "-";
  if (
    typeof value === "object" &&
    value !== null &&
    typeof (value as Date).toLocaleDateString === "function"
  ) {
    return (value as Date).toLocaleDateString();
  }
  if (typeof value === "boolean") return value ? trueVal : falseVal;
  if (typeof value === "number") return `${value.toLocaleString()}${suffix}`;
  return `${value}${suffix}`;
};

const PropertyDetailsPage: React.FC = () => {
  const { propertyId } = useParams<{ propertyId: string }>();

  const {
    data: propertyData,
    isLoading,
    error,
  } = trpc.property.getById.useQuery(
    { id: propertyId! },
    { enabled: !!propertyId }
  );

  if (!propertyId) {
    return (
      <Container>
        <Alert title="Error" color="red" icon={<IconAlertCircle />}>
          Property ID not found in URL.
        </Alert>
      </Container>
    );
  }
  if (isLoading) {
    return (
      <Container
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "calc(100vh - 200px)",
        }}
      >
        <Loader />
      </Container>
    );
  }
  if (error) {
    return (
      <Container>
        <Alert icon={<IconAlertCircle />} title="Error!" color="red" mt="md">
          Failed to load property details: {error.message}
        </Alert>
      </Container>
    );
  }
  if (!propertyData) {
    return (
      <Container>
        <Text mt="md">Property not found.</Text>
      </Container>
    );
  }

  console.log(
    "Тип propertyData.location.createdAt:",
    typeof propertyData.location?.createdAt
  );
  console.log(
    "Тип propertyData.availabilityDate:",
    typeof propertyData.availabilityDate
  );

  const property = propertyData;

  return (
    <Container fluid p="md">
      <Group justify="space-between" mb="lg">
        <Button
          component={RouterLink}
          to="/properties"
          leftSection={<IconArrowLeft size={16} />}
          variant="outline"
        >
          Back to List
        </Button>
        <Title order={2} style={{ textAlign: "center", flexGrow: 1 }}>
          {property.propertyTitle} ({property.propertyRefNo})
        </Title>
        <Button
          component={RouterLink}
          to={`/properties/${property.id}/edit`}
          leftSection={<IconEdit size={16} />}
        >
          Edit Property
        </Button>
      </Group>

      <Paper shadow="sm" p="lg" radius="md">
        <Stack gap="xl">
          <KeyInformationSection
            property={property}
            displayValue={displayValue}
          />
          <Divider />
          <LocationDetailsSection
            property={property}
            displayValue={displayValue}
          />
          <Divider />
          <DescriptionsSection
            property={property}
            displayValue={displayValue}
          />
          <Divider />
          <AdditionalDetailsSection
            property={property}
            displayValue={displayValue}
          />
          <Divider />
          <MediaSection property={property} displayValue={displayValue} />{" "}
          {/* displayValue не нужен для MediaSection, но оставим для консистентности или уберем */}
          <Divider />
          <RelationsSection
            property={property}
            displayValue={displayValue}
          />{" "}
          {/* displayValue не нужен для RelationsSection */}
          {/* TODO: Изображения, Документы, Планы этажей */}
        </Stack>
      </Paper>
    </Container>
  );
};

export default PropertyDetailsPage;
