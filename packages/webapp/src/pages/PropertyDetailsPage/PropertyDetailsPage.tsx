// packages/webapp/src/pages/PropertyDetailsPage/PropertyDetailsPage.tsx
import React, { useState } from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import {
  Container,
  Text,
  Loader,
  Alert,
  Group,
  Button,
  Grid,
} from "@mantine/core";
import { IconAlertCircle, IconArrowLeft, IconEdit } from "@tabler/icons-react";
import { trpc } from "../../utils/trpc";
import {
  PageBreadcrumbs,
  PropertyImageGallery,
  PropertyGalleryModal,
} from "./components";
import { PropertyInfoColumn } from "./LeftColumn";
import { PropertySidebar } from "./RightColumn";

const PropertyDetailsPage: React.FC = () => {
  const { propertyId } = useParams<{ propertyId: string }>();
  const [galleryOpened, setGalleryOpened] = useState(false);
  const [initialSlide, setInitialSlide] = useState(0);

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

  const property = propertyData;

  const breadcrumbItemsForPage = [
    { title: "Properties", href: "/properties" },
    { title: property.propertyTitle, href: `/properties/${property.id}` },
  ];

  const imagesForGallery = [
    {
      id: "main",
      url: "https://picsum.photos/id/20/1200/800",
      alt: "Main property view",
    },
    {
      id: "side1",
      url: "https://picsum.photos/id/101/1200/800",
      alt: "Property view 1",
    },
    {
      id: "side2",
      url: "https://picsum.photos/id/1011/1200/800",
      alt: "Property view 2",
    },
  ];

  const openGallery = (index: number) => {
    setInitialSlide(index);
    setGalleryOpened(true);
  };

  return (
    <Container fluid p="md">
      <PageBreadcrumbs items={breadcrumbItemsForPage} />

      <Group justify="space-between" align="center" mb="md">
        <div></div>
        <Group>
          <Button
            component={RouterLink}
            to="/properties"
            leftSection={<IconArrowLeft size={16} />}
            variant="outline"
          >
            Back to List
          </Button>
          <Button
            component={RouterLink}
            to={`/properties/${property.id}/edit`}
            leftSection={<IconEdit size={16} />}
          >
            Edit Property
          </Button>
        </Group>
      </Group>

      <PropertyImageGallery
        displayImages={imagesForGallery.slice(0, 3)}
        onImageClick={openGallery}
        mb="xl"
      />

      <Grid gutter="xl">
        <Grid.Col span={{ base: 12, lg: 8 }}>
          <PropertyInfoColumn property={property} />
        </Grid.Col>
        <Grid.Col span={{ base: 12, lg: 4 }}>
          <PropertySidebar agent={property.agent} />
        </Grid.Col>
      </Grid>

      <PropertyGalleryModal
        opened={galleryOpened}
        onClose={() => setGalleryOpened(false)}
        images={imagesForGallery}
        initialSlide={initialSlide}
      />
    </Container>
  );
};

export default PropertyDetailsPage;
