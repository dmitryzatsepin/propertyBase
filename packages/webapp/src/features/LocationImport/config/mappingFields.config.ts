import { LocationDataSource, MappableField } from '../types/locationImport.types';

export interface TargetFieldConfig {
  value: MappableField;
  label: string;
  required?: (source: LocationDataSource | null) => boolean;
  description?: string;
  sources?: LocationDataSource[];
}

export const TARGET_FIELDS_CONFIG: TargetFieldConfig[] = [
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
    sources: [LocationDataSource.PROPERTY_FINDER],
  },
  {
    value: "subcommunity",
    label: "Subcommunity (if directly map-able)",
    description:
      'From "Subcommunity" (PF). Derived from Hierarchy for Bayut if not directly mapped.',
    sources: [LocationDataSource.PROPERTY_FINDER],
  },
  {
    value: "property",
    label: "Property / Building (if directly map-able)",
    description:
      'From "Property" (PF). Derived from Hierarchy for Bayut if not directly mapped.',
    sources: [LocationDataSource.PROPERTY_FINDER],
  },
  {
    value: "locationType",
    label: "Location Type",
    description:
      'e.g., Building, Community. Corresponds to "location_type" for Bayut.',
    sources: [LocationDataSource.BAYUT],
  },
  { 
    value: "sourceSpecificId", 
    label: "Source Specific ID (Optional)",
    sources: [] 
  },
];