// src/features/LocationImport/steps/MappingStep.tsx
import React from 'react';
import { Paper, Text, Button } from '@mantine/core';
import { ImportStep } from '../types/locationImport.types';

interface MappingStepProps {
  setCurrentStep: (step: ImportStep) => void;
}

export const MappingStep: React.FC<MappingStepProps> = ({ setCurrentStep }) => {
  return (
    <Paper p="md" withBorder>
      <Text>Manual Mapping Step (To be implemented)</Text>
      <Button onClick={() => setCurrentStep(ImportStep.RESULTS)} mt="md">
        Next to Results (Temp)
      </Button>
    </Paper>
  );
};