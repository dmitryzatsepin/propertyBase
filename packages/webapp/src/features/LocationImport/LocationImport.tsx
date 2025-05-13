// src/features/LocationImport/LocationImport.tsx
import React from 'react';
import { Container, Paper, Title, Stepper, Alert } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';
import { useLocationImport } from './hooks/useLocationImport';
import { ImportStep } from './types/locationImport.types';
import { UploadStep } from './steps/UploadStep';

export const LocationImport: React.FC = () => {
  const {
    state,
    setCurrentStep,
    setSelectedDataSource,
    setUploadedFile,
    processFile,
  } = useLocationImport();

  const {
    currentStep,
    selectedDataSource,
    uploadedFile,
    isLoading,
    error,
  } = state;

  const stepIndexMap: Record<ImportStep, number> = {
    [ImportStep.UPLOAD]: 0,
    [ImportStep.MANUAL_MAPPING]: 1,
    [ImportStep.RESULTS]: 2,
  };
  const activeStep = stepIndexMap[currentStep];

  const handleUploadNext = () => {
    processFile();
    if (currentStep === ImportStep.UPLOAD && uploadedFile && selectedDataSource) {
        console.log("Moving to results step (placeholder action)");
        setCurrentStep(ImportStep.RESULTS);
    }
  };


  return (
    <Container size="md" my="xl">
      <Paper shadow="xs" p="xl" withBorder>
        <Title order={2} ta="center" mb="xl">
          Import Locations from Excel
        </Title>

        {error && (
          <Alert
            icon={<IconAlertCircle size="1rem" />}
            title="Error"
            color="red"
            variant="filled"
            withCloseButton
            onClose={() => state.error = null}
            mb="md"
            data-testid="error-alert"
          >
            {error}
          </Alert>
        )}

        <Stepper active={activeStep} breakpoint="sm" allowNextStepsSelect={false} mb="xl">
          <Stepper.Step label="Upload" description="Select source and file" />
          <Stepper.Step label="Mapping" description="Map columns (optional)" /> {/* Placeholder */}
          <Stepper.Step label="Results" description="View imported data" />   {/* Placeholder */}
        </Stepper>

        {currentStep === ImportStep.UPLOAD && (
          <UploadStep
            selectedDataSource={selectedDataSource}
            setSelectedDataSource={setSelectedDataSource}
            uploadedFile={uploadedFile}
            setUploadedFile={setUploadedFile}
            onNext={handleUploadNext}
            isLoading={isLoading}
          />
        )}

        {/* Placeholder for ManualMappingStep */}
        {currentStep === ImportStep.MANUAL_MAPPING && (
          <Paper p="md" withBorder>
            <Text>Manual Mapping Step (To be implemented)</Text>
            <button onClick={() => setCurrentStep(ImportStep.RESULTS)}>Next to Results (Temp)</button>
          </Paper>
        )}

        {/* Placeholder for ResultsStep */}
        {currentStep === ImportStep.RESULTS && (
          <Paper p="md" withBorder>
            <Text>Results Step (To be implemented)</Text>
            <button onClick={() => setCurrentStep(ImportStep.UPLOAD)}>Back to Upload (Temp)</button>
          </Paper>
        )}
      </Paper>
    </Container>
  );
};
