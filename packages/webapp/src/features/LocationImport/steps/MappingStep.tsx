// src/features/LocationImport/steps/MappingStep.tsx
import React from "react";
import {
  Paper,
  Title,
  Select,
  Button,
  Group,
  Stack,
  Text,
} from "@mantine/core";
import {
  ColumnMapping,
  MappableField,
  LocationDataSource,
} from "../types/locationImport.types";

interface TargetFieldConfig {
  value: MappableField;
  label: string;
  required?: (source: LocationDataSource | null) => boolean;
  description?: string;
  sources?: LocationDataSource[];
}

const TARGET_FIELDS_CONFIG: TargetFieldConfig[] = [
  {
    value: "city",
    label: "City / Emirate",
    required: () => true,
    description:
      'e.g., Dubai, Abu Dhabi. From "City" (PF) or "emirate" (Bayut).',
  },
  {
    value: "locationName",
    label: "Location Name (from file)",
    required: (source) => source === LocationDataSource.BAYUT,
    description:
      'The specific name of the location. Corresponds to "location_name" for Bayut.',
    sources: [LocationDataSource.BAYUT],
  },
  {
    value: "rawLocationHierarchy",
    label: "Full Location Hierarchy String",
    required: (source) => source === LocationDataSource.BAYUT,
    description:
      'e.g., Dubai>Mirdif. Corresponds to "location_hierarchy" for Bayut.',
    sources: [LocationDataSource.BAYUT],
  },
  {
    value: "community",
    label: "Community (if directly map-able)",
    description:
      'From "Community" (PF). Derived from Hierarchy for Bayut if not directly mapped.',
  },
  {
    value: "subcommunity",
    label: "Subcommunity (if directly map-able)",
    description:
      'From "Subcommunity" (PF). Derived from Hierarchy for Bayut if not directly mapped.',
  },
  {
    value: "property",
    label: "Property / Building (if directly map-able)",
    description:
      'From "Property" (PF). Derived from Hierarchy for Bayut if not directly mapped.',
  },
  {
    value: "locationType",
    label: "Location Type",
    description:
      'e.g., Building, Community. Corresponds to "location_type" for Bayut.',
    sources: [LocationDataSource.BAYUT],
  },
  { value: "sourceSpecificId", label: "Source Specific ID (Optional)" },
];

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
  const visibleTargetFields = TARGET_FIELDS_CONFIG.filter(
    (field) =>
      !field.sources ||
      !selectedDataSource ||
      field.sources.includes(selectedDataSource)
  );

  const selectOptions = [
    { value: "", label: "--- Do not map this field ---" },
    ...excelHeaders.map((header: string, index: number) => ({
      value: header,
      label: `${header} (Column ${String.fromCharCode(65 + index)})`,
    })),
  ];

  const handleSelectChange = (
    targetField: MappableField,
    selectedExcelHeader: string | null
  ) => {
    onMappingChange({
      ...currentMapping,
      [targetField]: selectedExcelHeader === "" ? null : selectedExcelHeader,
    });
  };

  const requiredFieldsMapped = visibleTargetFields
    .filter((field) => field.required && field.required(selectedDataSource))
    .every((field) => !!currentMapping[field.value]);

  return (
    <Paper p="md" withBorder>
      <Title order={4} mb="lg">
        Map Excel Columns to Target Fields
      </Title>
      <Text size="sm" c="dimmed" mb="md">
        For each target field required by the system, select the corresponding
        column from your uploaded Excel file. If a field is optional and not
        present in your file, you can select "--- Do not map this field ---".
      </Text>
      <Stack gap="md">
        {visibleTargetFields.map((field) => (
          <Select
            key={field.value}
            label={`${field.label}${field.required ? " *" : ""}`}
            placeholder="Select Excel column..."
            data={selectOptions}
            value={currentMapping[field.value] || ""}
            onChange={(value: string | null) =>
              handleSelectChange(field.value, value)
            }
            disabled={isLoading}
            clearable
            searchable
            nothingFoundMessage="No matching headers"
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
