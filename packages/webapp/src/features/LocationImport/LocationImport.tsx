// src/features/LocationImport/LocationImport.tsx
import React from 'react';
import { Container, Paper, Title, Stepper, Alert } from '@mantine/core';
import { IconAlertCircle, IconCheck } from '@tabler/icons-react';
import { useLocationImport } from './hooks/useLocationImport';
import { ImportStep } from './types/locationImport.types';
import { UploadStep } from './steps/UploadStep';
import { MappingStep } from './steps/MappingStep';
import { ResultsStep } from './steps/ResultsStep';

export const LocationImport: React.FC = () => {
  const {
    state,
    setCurrentStep,
    setSelectedDataSource,
    setUploadedFile,
    processFile,
    saveProcessedDataToDB,
    resetMessages,
  } = useLocationImport();

  const {
    currentStep,
    selectedDataSource,
    uploadedFile,
    isLoading,
    isSaving,
    error,
    successMessage,
    processedData,
  } = state;

  const stepIndexMap: Record<ImportStep, number> = {
    [ImportStep.UPLOAD]: 0,
    [ImportStep.MANUAL_MAPPING]: 1,
    [ImportStep.RESULTS]: 2,
  };
  const activeStep = stepIndexMap[currentStep];

  const messageToDisplayForAlert = successMessage || error;
  const isErrorForAlert = !!error && !successMessage;

  const renderCurrentStep = () => {
    switch (currentStep) {
      case ImportStep.UPLOAD:
        return (
          <UploadStep
            selectedDataSource={selectedDataSource}
            setSelectedDataSource={setSelectedDataSource}
            uploadedFile={uploadedFile}
            setUploadedFile={setUploadedFile}
            onNext={processFile}
            isLoading={isLoading}
          />
        );
      case ImportStep.MANUAL_MAPPING:
        return <MappingStep setCurrentStep={setCurrentStep} />;
      case ImportStep.RESULTS:
        return (
          <ResultsStep
            processedData={processedData}
            isSaving={isSaving}
            isLoading={isLoading}
            onSaveToDatabase={saveProcessedDataToDB}
            onImportAnother={() => setCurrentStep(ImportStep.UPLOAD)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Container size="md" my="xl">
      <Paper shadow="xs" p="xl" withBorder>
        <Title order={2} ta="center" mb="xl">
          Import Locations from Excel
        </Title>

        {messageToDisplayForAlert && (
          <Alert
            icon={isErrorForAlert ? <IconAlertCircle size="1rem" /> : <IconCheck size="1rem" />}
            title={isErrorForAlert ? "Error" : "Success"}
            color={isErrorForAlert ? "red" : "green"}
            variant="filled"
            withCloseButton
            onClose={resetMessages}
            mb="md"
            data-testid={isErrorForAlert ? "error-alert" : "success-alert"}
          >
            {messageToDisplayForAlert}
          </Alert>
        )}

        <Stepper active={activeStep} allowNextStepsSelect={false} mb="xl">
          <Stepper.Step label="Upload" description="Select source and file" />
          <Stepper.Step label="Mapping" description="Map columns (optional)" />
          <Stepper.Step label="Results" description="View imported data" />
        </Stepper>

        {renderCurrentStep()}
      </Paper>
    </Container>
  );
};