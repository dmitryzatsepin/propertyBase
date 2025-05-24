// packages/webapp/src/pages/PropertyDetailsPage/PropertyDetailsPage.tsx
import React from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Title,
  Text,
  Loader,
  Alert,
  Paper,
  SimpleGrid,
  Group,
  Badge,
  List,
  Box,
} from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";
import { trpc } from "../../utils/trpc"; // Проверь путь

const PropertyDetailsPage: React.FC = () => {
  const { propertyId } = useParams<{ propertyId: string }>();

  const {
    data: property,
    isLoading,
    error,
  } = trpc.property.getById.useQuery(
    { id: propertyId! }, // Добавляем '!', так как propertyId должен быть здесь, если роут совпал
    {
      enabled: !!propertyId, // Запрос будет выполнен только если propertyId существует
    }
  );

  if (!propertyId) {
    return (
      <Container>
        <Alert title="Error" color="red">
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
          height: "200px",
        }}
      >
        <Loader />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Alert
          icon={<IconAlertCircle size="1rem" />}
          title="Error!"
          color="red"
        >
          Failed to load property details: {error.message}
        </Alert>
      </Container>
    );
  }

  if (!property) {
    return (
      <Container>
        <Text>Property not found.</Text>
      </Container>
    );
  }

  // Функция для отображения значения или дефиса, если оно null/undefined
  const displayValue = (
    value: string | number | null | undefined,
    suffix = ""
  ) => {
    if (value === null || value === undefined || value === "") return "-";
    if (typeof value === "number") return `${value.toLocaleString()}${suffix}`;
    return `${value}${suffix}`;
  };

  return (
    <Container fluid>
      <Paper shadow="xs" p="md">
        <Title order={2} mb="lg">
          {property.propertyTitle} ({property.propertyRefNo})
        </Title>

        <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg" mb="lg">
          <Box>
            <Text fw={500}>Price:</Text>
            <Text size="xl" c="blue">
              {displayValue(
                property.price ? parseFloat(property.price.toString()) : null,
                " AED"
              )}
            </Text>
            {property.priceOnApplication && (
              <Badge color="teal">Price on Application</Badge>
            )}
          </Box>
          <Box>
            <Text fw={500}>Type:</Text>
            <Text>{property.propertyType?.name || "-"}</Text>
          </Box>
          <Box>
            <Text fw={500}>Status:</Text>
            <Text>{property.propertyStatus?.name || "-"}</Text>
          </Box>
          <Box>
            <Text fw={500}>Offering Type:</Text>
            <Text>{property.offeringType?.name || "-"}</Text>
          </Box>
          <Box>
            <Text fw={500}>Size (sqft):</Text>
            <Text>
              {displayValue(
                property.sizeSqft
                  ? parseFloat(property.sizeSqft.toString())
                  : null
              )}
            </Text>
          </Box>
          <Box>
            <Text fw={500}>Agent:</Text>
            <Text>{property.agent?.name || "-"}</Text>
          </Box>
        </SimpleGrid>

        <Title order={4} mt="xl" mb="sm">
          Location
        </Title>
        <Text>
          <strong>Full Path:</strong> {property.location?.locationPath}
        </Text>
        <Text>
          <strong>City:</strong> {property.location?.city}
        </Text>
        {property.location?.community && (
          <Text>
            <strong>Community:</strong> {property.location.community}
          </Text>
        )}
        {property.location?.subcommunity && (
          <Text>
            <strong>Subcommunity:</strong> {property.location.subcommunity}
          </Text>
        )}

        {property.propertyDescription && (
          <>
            <Title order={4} mt="xl" mb="sm">
              Description
            </Title>
            <Text style={{ whiteSpace: "pre-wrap" }}>
              {property.propertyDescription}
            </Text>
          </>
        )}

        {/* TODO: Добавить отображение propertyTitleAR, propertyDescriptionAR, и других полей */}
        {/* TODO: Отобразить videosUrl, videoTourUrl, view360Url */}

        {property.portals && property.portals.length > 0 && (
          <>
            <Title order={4} mt="xl" mb="sm">
              Listed on Portals
            </Title>
            <List size="sm">
              {property.portals.map((portal) => (
                <List.Item key={portal.id}>{portal.name}</List.Item>
              ))}
            </List>
          </>
        )}

        {property.privateAmenities && property.privateAmenities.length > 0 && (
          <>
            <Title order={4} mt="xl" mb="sm">
              Private Amenities
            </Title>
            <Group gap="xs">
              {property.privateAmenities.map((amenity) => (
                <Badge key={amenity.id} variant="outline">
                  {amenity.name}
                </Badge>
              ))}
            </Group>
          </>
        )}

        {property.commercialAmenities &&
          property.commercialAmenities.length > 0 && (
            <>
              <Title order={4} mt="xl" mb="sm">
                Commercial Amenities
              </Title>
              <Group gap="xs">
                {property.commercialAmenities.map((amenity) => (
                  <Badge key={amenity.id} variant="filled">
                    {amenity.name}
                  </Badge>
                ))}
              </Group>
            </>
          )}

        {/* TODO: Отображение для images, propertyDocuments, floorPlans когда они будут */}
      </Paper>
    </Container>
  );
};

export default PropertyDetailsPage;
