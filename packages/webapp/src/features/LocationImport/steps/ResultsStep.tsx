// src/features/LocationImport/steps/ResultsStep.tsx
import React from "react";
import { Paper, Title, Text, Button, Group } from "@mantine/core";
import { DataTable } from "../components/DataTable";
import {
  ProcessedLocationData,
  LocationDataSource,
} from "../types/locationImport.types";
import { exportToExcel } from "../utils/excelExporter";

interface ResultsStepProps {
  processedData: ProcessedLocationData[];
  selectedDataSource: LocationDataSource | null;
  isSaving: boolean;
  isLoading: boolean;
  onSaveToDatabase: () => void;
  onImportAnother: () => void;
}

export const ResultsStep: React.FC<ResultsStepProps> = ({
  processedData,
  selectedDataSource,
  isSaving,
  isLoading,
  onSaveToDatabase,
  onImportAnother,
}) => {
  console.log('ResultsStep RENDER - selectedDataSource prop:', selectedDataSource);
  const sourcePrefix =
    selectedDataSource === LocationDataSource.PROPERTY_FINDER
      ? "PropertyFinder"
      : selectedDataSource === LocationDataSource.BAYUT
        ? "Bayut"
        : "UnknownSource";

  const handleExportToExcel = () => {
    console.log("RESULTS_STEP: Export to Excel button clicked.");
    console.log(
      "RESULTS_STEP: Current processedData length:",
      processedData?.length
    );
    console.log(
      "RESULTS_STEP: Current selectedDataSource:",
      selectedDataSource
    );
    if (processedData && processedData.length > 0 && selectedDataSource) {
      const date = new Date();
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Месяцы 0-11, добавляем 1
      const day = date.getDate().toString().padStart(2, "0");
      const formattedDate = `${year}-${month}-${day}`;

      // Формируем префикс имени файла на основе источника
      let sourcePrefix = "UnknownSource";
      if (selectedDataSource === LocationDataSource.PROPERTY_FINDER) {
        sourcePrefix = "Property_Finder"; // С подчеркиванием
      } else if (selectedDataSource === LocationDataSource.BAYUT) {
        sourcePrefix = "Bayut";
      }

      exportToExcel(processedData, `${sourcePrefix}_locations_${formattedDate}`);
      console.log("RESULTS_STEP: exportToExcel function was called."); // <--- ЛОГ 4
    } else {
      console.warn(
        "RESULTS_STEP: No data to export to Excel. processedData is empty or undefined."
      ); // <--- ЛОГ 5
    }
  };

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
          disabled={
            isLoading ||
            isSaving ||
            !processedData ||
            processedData.length === 0
          }
          data-testid="save-to-db-button"
        >
          Save to Database
        </Button>
        <Button
          variant="outline"
          onClick={handleExportToExcel}
          disabled={
            !processedData ||
            processedData.length === 0 ||
            isSaving ||
            isLoading
          }
          data-testid="export-excel-button"
        >
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
