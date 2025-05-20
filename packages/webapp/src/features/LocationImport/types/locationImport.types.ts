// src/features/LocationImport/types/locationImport.types.ts

export enum LocationDataSource {
  PROPERTY_FINDER = 'Property Finder',
  BAYUT = 'Bayut',
}

export enum ImportStep {
  UPLOAD = 'UPLOAD',
  MANUAL_MAPPING = 'MANUAL_MAPPING',
  RESULTS = 'RESULTS',
}

export interface ProcessedLocationData {
  id: string | number | null;
  locationPath: string;
  city: string;
  community: string | null;
  subcommunity: string | null;
  property: string | null;
  locationType: string | null;
  source: LocationDataSource;
  sourceSpecificId?: string | null;
  [key: string]: any;
}

export type MappableField =
  | 'city'
  | 'community'
  | 'subcommunity'
  | 'property'
  | 'locationType'
  | 'sourceSpecificId'
  | 'rawLocationHierarchy'
  | 'locationName';

export type ColumnMapping = Partial<Record<MappableField, string | null>>;

export interface LocationImportState {
  currentStep: ImportStep;
  selectedDataSource: LocationDataSource | null;
  uploadedFile: File | null;
  rawExcelData: any[][];
  excelHeaders: string[];
  columnMapping: ColumnMapping;
  processedData: ProcessedLocationData[];
  isLoading: boolean;
  isSaving: boolean;
  errorForNotification: string | null;
  successForNotification: string | null;
}