// src/features/LocationImport/LocationImport.tsx
import React from 'react';
import {
  Container,
  Paper,
  Title,
  Stepper,
  Alert,
  Text,
  Button,
} from '@mantine/core';
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
    setError,
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
    // if (currentStep === ImportStep.UPLOAD && uploadedFile && selectedDataSource && !error) {
    //     console.log("Simulating processing and moving to results step");
    //     setCurrentStep(ImportStep.RESULTS);
    // }

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
            onClose={() => setError(null)}
            mb="md"
            data-testid="error-alert"
          >
            {error}
          </Alert>
        )}


        <Stepper active={activeStep} allowNextStepsSelect={false} mb="xl">
          <Stepper.Step label="Upload" description="Select source and file" />
          <Stepper.Step label="Mapping" description="Map columns (optional)" />
          <Stepper.Step label="Results" description="View imported data" />
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

        {currentStep === ImportStep.MANUAL_MAPPING && (
          <Paper p="md" withBorder>
            <Text>Manual Mapping Step (To be implemented)</Text>
            <Button onClick={() => setCurrentStep(ImportStep.RESULTS)} mt="md">Next to Results (Temp)</Button>
          </Paper>
        )}

        {currentStep === ImportStep.RESULTS && (
          <Paper p="md" withBorder>
            <Text>Results Step (To be implemented)</Text>
            <Button onClick={() => setCurrentStep(ImportStep.UPLOAD)} mt="md">Back to Upload (Temp)</Button>
          </Paper>
        )}
      </Paper>
    </Container>
  );
};