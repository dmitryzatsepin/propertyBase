// src/features/LocationImport/components/DataTable.tsx
import React from "react";
import { Table, ScrollArea, Text, Box } from "@mantine/core";
import { ProcessedLocationData } from "../types/locationImport.types";

interface DataTableProps {
  data: ProcessedLocationData[];
}

export const DataTable: React.FC<DataTableProps> = ({ data }) => {
  if (!data || data.length === 0) {
    return <Text>No data to display.</Text>;
  }

  // Define headers for the table
  // We can make this more dynamic later if needed
  const headers = [
    "Location Path",
    "City",
    "Community",
    "Subcommunity",
    "Property",
    "Source",
  ];

  const rows = data.map((row, index) => (
    <Table.Tr key={`row-${index}`}>
      <Table.Td>{row.locationPath}</Table.Td>
      <Table.Td>{row.city || "-"}</Table.Td>
      <Table.Td>{row.community || "-"}</Table.Td>
      <Table.Td>{row.subcommunity || "-"}</Table.Td>
      <Table.Td>{row.property || "-"}</Table.Td>
      <Table.Td>{row.source}</Table.Td>
    </Table.Tr>
  ));

  return (
    <Box>
      <Text size="sm" mb="xs">
        Displaying {data.length} processed locations:
      </Text>
      <ScrollArea style={{ height: 400 }} type="auto">
        {" "}
        <Table
          striped
          highlightOnHover
          withTableBorder
          withColumnBorders
          stickyHeader
          // miw={700} // minWidth if table content is wider than container
        >
          <Table.Thead>
            <Table.Tr>
              {headers.map((header) => (
                <Table.Th key={header}>{header}</Table.Th>
              ))}
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </ScrollArea>
    </Box>
  );
};
