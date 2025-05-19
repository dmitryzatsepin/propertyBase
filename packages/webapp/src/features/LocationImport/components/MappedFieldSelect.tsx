import React from 'react';
import { Select } from '@mantine/core';
import { ColumnMapping, MappableField, LocationDataSource } from '../types/locationImport.types';
import { TargetFieldConfig } from '../config/mappingFields.config'; // Импортируем тип конфига

interface MappedFieldSelectProps {
  fieldConfig: TargetFieldConfig; // Один элемент из TARGET_FIELDS_CONFIG
  excelHeaderOptions: { value: string; label: string }[];
  currentMappedValue: string | null | undefined; // Текущее значение из columnMapping
  onSelectionChange: (selectedExcelHeader: string | null) => void;
  isLoading: boolean;
  selectedDataSource: LocationDataSource | null;
}

export const MappedFieldSelect: React.FC<MappedFieldSelectProps> = ({
  fieldConfig,
  excelHeaderOptions,
  currentMappedValue,
  onSelectionChange,
  isLoading,
  selectedDataSource,
}) => {
  const isFieldRequired = fieldConfig.required && 
                          typeof fieldConfig.required === 'function' && 
                          fieldConfig.required(selectedDataSource);

  return (
    <Select
      key={fieldConfig.value}
      label={`${fieldConfig.label}${isFieldRequired ? " *" : ""}`}
      description={fieldConfig.description}
      placeholder="Select Excel column..."
      data={excelHeaderOptions}
      value={currentMappedValue || ""} // Для Select '' лучше, чем null, чтобы показать плейсхолдер
      onChange={(value: string | null) => onSelectionChange(value === "" ? null : value)}
      disabled={isLoading}
      clearable
      searchable
      nothingFoundMessage="No matching headers"
    />
  );
};