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
} from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";
import { Link } from "react-router-dom"; // Для ссылок на детальную страницу (в будущем)
import { trpc } from "../../utils/trpc"; // Убедись, что путь верный
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
  const rows = allProperties.map((property) => (
    <Table.Tr key={property.id}>
      <Table.Td>
        <Anchor component={Link} to={`/properties/${property.id}`} size="sm">
          {property.propertyTitle}
        </Anchor>
      </Table.Td>
      <Table.Td>{property.propertyRefNo}</Table.Td>
      <Table.Td>{property.location?.city || "-"}</Table.Td>
      <Table.Td>{property.agent?.name || "-"}</Table.Td>
      <Table.Td>{property.propertyType?.name || "-"}</Table.Td>
      <Table.Td>
        {property.price
          ? parseFloat(property.price.toString()).toLocaleString()
          : "-"}
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Container fluid>
      <Title order={1} mb="md">
        Properties
      </Title>
      {allProperties.length > 0 ? (
        <Table striped highlightOnHover withTableBorder withColumnBorders>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Title</Table.Th>
              <Table.Th>Ref No.</Table.Th>
              <Table.Th>City</Table.Th>
              <Table.Th>Agent</Table.Th>
              <Table.Th>Type</Table.Th>
              <Table.Th>Price</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      ) : (
        !isLoading && <Text>No properties found.</Text> // Показываем "No properties" если загрузка завершена и данных нет
      )}
      {hasNextPage && (
        <button
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
          style={{ marginTop: "20px" }}
        >
          {isFetchingNextPage ? "Loading more..." : "Load More"}
        </button>
      )}
      {isLoading && data && <Loader size="sm" style={{ marginTop: "20px" }} />}{" "}
      {/* Лоадер при дозагрузке */}
    </Container>
  );
};

export default PropertiesPage;
