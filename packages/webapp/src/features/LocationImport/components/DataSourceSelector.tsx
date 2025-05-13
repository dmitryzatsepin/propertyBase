// src/features/LocationImport/components/DataSourceSelector.tsx
import React from 'react';
import { Select } from '@mantine/core';
import { LocationDataSource } from '../types/locationImport.types';

interface DataSourceSelectorProps {
  selectedDataSource: LocationDataSource | null;
  onDataSourceChange: (source: LocationDataSource | null) => void;
  disabled?: boolean;
  isLoading?: boolean;
}

export const DataSourceSelector: React.FC<DataSourceSelectorProps> = ({
  selectedDataSource,
  onDataSourceChange,
  disabled,
  isLoading,
}) => {
  const handleSelectChange = (value: string | null) => {
    onDataSourceChange(value as LocationDataSource | null);
  };

  return (
    <Select
      label="Select Data Source"
      placeholder="Pick one"
      required
      data={[
        { value: LocationDataSource.PROPERTY_FINDER, label: LocationDataSource.PROPERTY_FINDER },
        { value: LocationDataSource.BAYUT, label: LocationDataSource.BAYUT },
      ]}
      value={selectedDataSource}
      onChange={handleSelectChange}
      disabled={disabled || isLoading}
      data-testid="data-source-select"
    />
  );
};