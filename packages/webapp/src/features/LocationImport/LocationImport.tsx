// src/features/LocationImport/LocationImport.tsx
import React from "react";
import {
  Container,
  Paper,
  Title,
  Stepper,
  useMantineTheme, // <--- Импорт хука
  // MantineBreakpoint, // Не нужен для этого случая
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks"; // <--- Импорт хука
import { useLocationImport } from "./hooks/useLocationImport";
import { ImportStep } from "./types/locationImport.types";
import { UploadStep } from "./steps/UploadStep";
import { MappingStep } from "./steps/MappingStep";
import { ResultsStep } from "./steps/ResultsStep";

// Убираем вызовы хуков отсюда
// const theme = useMantineTheme(); // НЕ ЗДЕСЬ
// const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`); // НЕ ЗДЕСЬ

export const LocationImport: React.FC = () => {
  // Вызываем хуки ВНУТРИ компонента
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

  const {
    state,
    setCurrentStep,
    setSelectedDataSource,
    setUploadedFile,
    readFileAndInitiateMapping,
    applyMappingAndProcessData,
    saveProcessedDataToDB,
    updateColumnMapping,
  } = useLocationImport();

  const {
    currentStep,
    selectedDataSource,
    uploadedFile,
    isLoading,
    isSaving,
    processedData,
    excelHeaders,
    columnMapping,
  } = state;
  // console.log(
  //   "LocationImport RENDER - state.selectedDataSource:",
  //   selectedDataSource
  // );

  const stepIndexMap: Record<ImportStep, number> = {
    [ImportStep.UPLOAD]: 0,
    [ImportStep.MANUAL_MAPPING]: 1,
    [ImportStep.RESULTS]: 2,
  };
  const activeStep = stepIndexMap[currentStep];

  const renderCurrentStep = () => {
    switch (currentStep) {
      case ImportStep.UPLOAD:
        return (
          <UploadStep
            selectedDataSource={selectedDataSource}
            setSelectedDataSource={setSelectedDataSource}
            uploadedFile={uploadedFile}
            setUploadedFile={setUploadedFile}
            onNext={readFileAndInitiateMapping}
            isLoading={isLoading}
          />
        );
      case ImportStep.MANUAL_MAPPING:
        return (
          <MappingStep
            excelHeaders={excelHeaders}
            currentMapping={columnMapping}
            selectedDataSource={state.selectedDataSource} // Можно просто selectedDataSource, т.к. он уже деструктурирован
            onMappingChange={updateColumnMapping}
            onProcessData={applyMappingAndProcessData}
            onBack={() => setCurrentStep(ImportStep.UPLOAD)}
            isLoading={isLoading}
          />
        );
      case ImportStep.RESULTS:
        // console.log(
        //   "LocationImport rendering ResultsStep - selectedDataSource from state:",
        //   selectedDataSource
        // );
        return (
          <ResultsStep
            processedData={processedData}
            selectedDataSource={selectedDataSource}
            isSaving={isSaving}
            isLoading={isLoading || isSaving}
            onSaveToDatabase={saveProcessedDataToDB}
            onImportAnother={() => {
              // console.log(
              //   'LocationImport: "Import Another File" (onImportAnother) CALLED. Setting currentStep to UPLOAD.'
              // );
              setCurrentStep(ImportStep.UPLOAD);
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Container
      size="md"
      my="xl"
      style={{ minWidth: 980 /* Пример минимальной ширины */ }}
    >
      <Paper
        shadow="xs"
        p="xl"
        withBorder
        style={{
          width: "100%",
          minHeight: "600px", // Пример минимальной высоты для всего блока импорта
        }}
      >
        <Title order={2} ta="center" mb="xl">
          Import Locations from Excel
        </Title>

        <Stepper
          active={activeStep}
          allowNextStepsSelect={false}
          mb="xl"
          orientation={isMobile ? "vertical" : "horizontal"} // <--- Применяем адаптивную ориентацию
        >
          <Stepper.Step label="Upload" description="Select source and file" />
          <Stepper.Step label="Mapping" description="Map columns (optional)" />
          <Stepper.Step label="Results" description="View imported data" />
        </Stepper>

        {renderCurrentStep()}
      </Paper>
    </Container>
  );
};
