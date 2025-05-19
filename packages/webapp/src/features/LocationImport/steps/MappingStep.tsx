// src/features/LocationImport/steps/MappingStep.tsx
import React from 'react';
import { Paper, Title, Button, Group, Stack, Text } from '@mantine/core';
import { ColumnMapping, MappableField, LocationDataSource } from '../types/locationImport.types';
import { TARGET_FIELDS_CONFIG } from '../config/mappingFields.config'; // <--- ИМПОРТ КОНФИГА
import { MappedFieldSelect } from '../components/MappedFieldSelect'; // <--- ИМПОРТ КОМПОНЕНТА SELECT

interface MappingStepProps {
  excelHeaders: string[];
  currentMapping: ColumnMapping;
  selectedDataSource: LocationDataSource | null;
  onMappingChange: (newMapping: ColumnMapping) => void;
  onProcessData: () => void;
  onBack: () => void;
  isLoading: boolean;
}

export const MappingStep: React.FC<MappingStepProps> = ({
  excelHeaders,
  currentMapping,
  selectedDataSource,
  onMappingChange,
  onProcessData,
  onBack,
  isLoading,
}) => {
  const selectOptions = [
    { value: "", label: "--- Do not map this field ---" },
    ...excelHeaders.map((header: string, index: number) => ({
      value: header, // Используем сам заголовок как value
      label: `${header} (Column ${String.fromCharCode(65 + index)})`,
    })),
  ];

  const handleSingleFieldMappingChange = (
    targetField: MappableField,
    selectedExcelHeader: string | null
  ) => {
    onMappingChange({
      ...currentMapping,
      [targetField]: selectedExcelHeader, // selectedExcelHeader уже будет null, если выбрано "Do not map" или очищено
    });
  };

  const visibleTargetFields = TARGET_FIELDS_CONFIG.filter(fieldConfig => {
    if (!fieldConfig.sources) return true;
    if (selectedDataSource && fieldConfig.sources.includes(selectedDataSource)) return true;
    return false;
  });

  const requiredFieldsMapped = visibleTargetFields
    .filter((field) => field.required && field.required(selectedDataSource))
    .every((field) => !!currentMapping[field.value]);

  return (
    <Paper p="md" withBorder>
      <Title order={4} mb="lg">
        Map Excel Columns to Target Fields
      </Title>
      <Text size="sm" c="dimmed" mb="md">
        {/* ... текст инструкции ... */}
      </Text>
      <Stack gap="md">
        {visibleTargetFields.map((fieldConfig) => (
          <MappedFieldSelect
            key={fieldConfig.value}
            fieldConfig={fieldConfig}
            excelHeaderOptions={selectOptions}
            currentMappedValue={currentMapping[fieldConfig.value]}
            onSelectionChange={(selectedValue) => 
              handleSingleFieldMappingChange(fieldConfig.value, selectedValue)
            }
            isLoading={isLoading}
            selectedDataSource={selectedDataSource}
          />
        ))}
      </Stack>
      <Group justify="space-between" mt="xl">
        <Button variant="default" onClick={onBack} disabled={isLoading}>
          Back to Upload
        </Button>
        <Button
          onClick={onProcessData}
          disabled={!requiredFieldsMapped || isLoading}
          loading={isLoading}
        >
          Process Data with this Mapping
        </Button>
      </Group>
    </Paper>
  );
};