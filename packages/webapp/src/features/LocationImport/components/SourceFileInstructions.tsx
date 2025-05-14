// src/features/LocationImport/components/SourceFileInstructions.tsx
import React from 'react';
import { Text, Paper, List, ThemeIcon } from '@mantine/core';
import { IconInfoCircle } from '@tabler/icons-react';
import { LocationDataSource } from '../types/locationImport.types';

interface SourceFileInstructionsProps {
  dataSource: LocationDataSource | null;
}

export const SourceFileInstructions: React.FC<SourceFileInstructionsProps> = ({ dataSource }) => {
  if (!dataSource) {
    return null;
  }

  let instructions;

  if (dataSource === LocationDataSource.PROPERTY_FINDER) {
    instructions = (
      <>
        <Text size="sm" fw={500} mb="xs">Expected Excel Format for Property Finder:</Text>
        <List
          spacing="xs"
          size="sm"
          center
          icon={
            <ThemeIcon color="blue" size={16} radius="xl">
              <IconInfoCircle size={12} />
            </ThemeIcon>
          }
        >
          <List.Item>The first sheet of the Excel file will be used.</List.Item>
          <List.Item>The first row should contain headers (it will be skipped).</List.Item>
          <List.Item>
            Expected columns (0-indexed):
            <List withPadding listStyleType="disc" size="xs" spacing={3} mt={3}>
              <List.Item>Column A (Index 0): City</List.Item>
              <List.Item>Column C (Index 2): Community</List.Item>
              <List.Item>Column E (Index 4): Subcommunity</List.Item>
              <List.Item>Column G (Index 6): Property</List.Item>
            </List>
          </List.Item>
        </List>
      </>
    );
  } else if (dataSource === LocationDataSource.BAYUT) {
    instructions = (
      <>
        <Text size="sm" fw={500} mb="xs">Expected Excel Format for Bayut:</Text>
        <List
            spacing="xs"
            size="sm"
            center
            icon={
                <ThemeIcon color="teal" size={16} radius="xl">
                <IconInfoCircle size={12} />
                </ThemeIcon>
            }
        >
          <List.Item>The sheet named "BayutData" will be used (if not found, the first sheet will be attempted).</List.Item>
          <List.Item>The first row can be headers (data processing logic should account for this).</List.Item>
          <List.Item>
            Expected columns (example, 0-indexed):
            <List withPadding listStyleType="disc" size="xs" spacing={3} mt={3}>
                <List.Item>Column B (Index 1): Location Name (this will be used for locationPath)</List.Item>
                {/* Add more expected columns for Bayut as you define its processor */}
            </List>
          </List.Item>
          <List.Item><Text c="dimmed">(Bayut processing logic is currently a placeholder and needs to be defined based on your file structure)</Text></List.Item>
        </List>
      </>
    );
  }

  if (!instructions) {
    return null;
  }

  return (
    <Paper withBorder p="sm" mt="md" radius="md">
      {instructions}
    </Paper>
  );
};