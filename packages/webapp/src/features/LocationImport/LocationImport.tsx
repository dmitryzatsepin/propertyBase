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
  Group,
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
          <Title order={4} mb="sm">Processing Results</Title>
          {/* TODO: Replace with DataTable component */}
          {state.processedData.length > 0 ? (
            <>
              <Text>Successfully processed {state.processedData.length} locations.</Text>
              {/* Для отладки можно вывести первые несколько записей */}
              <pre style={{ maxHeight: '200px', overflowY: 'auto', background: '#f0f0f0', padding: '10px' }}>
                {JSON.stringify(state.processedData.slice(0, 5), null, 2)}
              </pre>
              {/* TODO: <DataTable data={state.processedData} /> */}
            </>
          ) : (
            <Text>No data processed or data is empty.</Text>
          )}
          {state.error && <Alert color="red" title="Processing Error">{state.error}</Alert>}

          
          <Group justify="center" mt="xl"> {/* Оборачиваем кнопку в Group с justify="center" */}
            <Button onClick={() => setCurrentStep(ImportStep.UPLOAD)} variant="outline" data-testid="import-another-button">
              Import Another File
            </Button>
          </Group>

          <Group justify="center" mt="xl">
            <Button variant="filled" /* onClick={handleSaveToDatabase} */ data-testid="save-to-db-button">
              Save to Database
            </Button>
            <Button variant="outline" /* onClick={handleExportToExcel} */       data-testid="export-excel-button">
              Export to Excel
            </Button>
            <Button variant="outline" /* onClick={handleExportToBitrix24} */ data-testid="export-bitrix24-button">
              Export to Bitrix24
            </Button>
          </Group>
        </Paper>
        )}
      </Paper>
    </Container>
  );
};