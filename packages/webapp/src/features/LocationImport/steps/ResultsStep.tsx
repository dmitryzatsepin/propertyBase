// src/features/LocationImport/steps/ResultsStep.tsx
import React from 'react';
import { Paper, Title, Text, Button, Group } from '@mantine/core';
import { DataTable } from '../components/DataTable';
import { ProcessedLocationData, ImportStep } from '../types/locationImport.types';

interface ResultsStepProps {
    processedData: ProcessedLocationData[];
    isSaving: boolean;
    isLoading: boolean;
    onSaveToDatabase: () => void;
    onImportAnother: () => void;
  }

  export const ResultsStep: React.FC<ResultsStepProps> = ({
    processedData,
    isSaving,
    isLoading,
    onSaveToDatabase,
    onImportAnother,
  }) => {

  return (
    <Paper p="md" withBorder>
      <Title order={4} mb="sm">
        Processing Results
      </Title>
      {processedData.length > 0 ? (
        <DataTable data={processedData} />
      ) : (
        <Text>No data processed or data is empty (after import).</Text>
      )}

      <Group justify="center" mt="xl">
        <Button
          variant="filled"
          onClick={onSaveToDatabase}
          loading={isSaving}
          disabled={isLoading || isSaving || !processedData || processedData.length === 0}
          data-testid="save-to-db-button"
        >
          Save to Database
        </Button>
        <Button variant="outline" data-testid="export-excel-button">
          Export to Excel
        </Button>
        <Button variant="outline" data-testid="export-bitrix24-button">
          Export to Bitrix24
        </Button>
      </Group>

      <Group justify="center" mt="xl">
        <Button
          onClick={onImportAnother}
          variant="outline"
          data-testid="import-another-button"
        >
          Import Another File
        </Button>
      </Group>
    </Paper>
  );
};