// packages/webapp/src/pages/PropertiesPage/PropertiesPage.tsx
import React from "react";
import {
  Title,
  Text,
  Container,
  Loader,
  Alert,
  Table,
  Anchor,
  SimpleGrid,
  Button,
} from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";
import { Link } from "react-router-dom"; // Для ссылок на детальную страницу (в будущем)
import { trpc } from "../../utils/trpc";
import { PropertyCard } from '../../components/Property/PropertyCard/PropertyCard';
import type { PropertyWithDetails } from '../PropertyDetailsPage/components/types';
import type { PropertyListItem } from '../../types/property.types';

const PropertiesPage: React.FC = () => {
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = trpc.property.list.useInfiniteQuery(
    {
      limit: 10,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  );
  if (isLoading && !data) {
    return (
      <Container
        fluid
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
      <Container fluid>
        <Alert
          icon={<IconAlertCircle size="1rem" />}
          title="Error!"
          color="red"
        >
          Failed to load properties: {error.message}
        </Alert>
      </Container>
    );
  }
  const allProperties = data?.pages.flatMap((page) => page.items) ?? [];

  return (
    <Container fluid>
      <Title order={1} mb="md">Properties</Title>

      {allProperties.length > 0 ? (
        <SimpleGrid
          cols={{ base: 1, sm: 2, lg: 3 }} // Количество колонок на разных размерах экрана
          spacing="lg"
          verticalSpacing="lg"
        >
          {allProperties.map((property) => (
            // Передаем property как Partial, так как list может возвращать не все поля
            <PropertyCard key={property.id} property={property as PropertyListItem} />
          ))}
        </SimpleGrid>
      ) : (
        !isLoading && <Text>No properties found.</Text>
      )}

      {hasNextPage && (
        <Button
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
          mt="xl"
          variant="outline"
          fullWidth
        >
          {isFetchingNextPage ? 'Loading more...' : 'Load More'}
        </Button>
      )}
      {isLoading && data && <Loader size="sm" style={{ marginTop: '20px', display: 'block', margin: 'auto' }} />}
    </Container>
  );
};

export default PropertiesPage;
