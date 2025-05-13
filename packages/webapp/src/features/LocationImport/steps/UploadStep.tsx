// src/features/LocationImport/steps/UploadStep.tsx
import React from 'react';
import { Box, Button, Stack } from '@mantine/core';
import { LocationDataSource } from '../types/locationImport.types';
import { DataSourceSelector } from '../components/DataSourceSelector';
import { ExcelDropzone } from '../components/ExcelDropzone';

interface UploadStepProps {
  selectedDataSource: LocationDataSource | null;
  setSelectedDataSource: (source: LocationDataSource | null) => void;
  uploadedFile: File | null;
  setUploadedFile: (file: File | null) => void;
  onNext: () => void;
  isLoading: boolean;
}

export const UploadStep: React.FC<UploadStepProps> = ({
  selectedDataSource,
  setSelectedDataSource,
  uploadedFile,
  setUploadedFile,
  onNext,
  isLoading,
}) => {
  return (
    <Stack spacing="lg">
      <DataSourceSelector
        selectedDataSource={selectedDataSource}
        onDataSourceChange={setSelectedDataSource}
        isLoading={isLoading}
      />

      <ExcelDropzone
        uploadedFile={uploadedFile}
        onFileDrop={setUploadedFile}
        isLoading={isLoading}
      />

      <Box mt="md">
        <Button
          onClick={onNext}
          disabled={!selectedDataSource || !uploadedFile || isLoading}
          loading={isLoading}
          fullWidth
          data-testid="next-button"
        >
          {isLoading ? 'Processing...' : 'Next'}
        </Button>
      </Box>
    </Stack>
  );
};