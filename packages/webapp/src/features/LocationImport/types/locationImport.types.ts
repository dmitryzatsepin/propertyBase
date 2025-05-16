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
  city: string | null;
  community: string | null;
  subcommunity: string | null;
  property: string | null;
  locationType: string | null;
  source: LocationDataSource;
  sourceSpecificId?: string | null;
  [key: string]: any;
}

// Ключи для наших целевых полей, которые мы хотим смапить
export type MappableField =
  | 'city'
  | 'community'
  | 'subcommunity'
  | 'property'
  | 'locationType'
  | 'sourceSpecificId'
  | 'rawLocationHierarchy'
  | 'locationName';

// Конфигурация маппинга: ключ - наше поле, значение - заголовок из Excel или null
export type ColumnMapping = Partial<Record<MappableField, string | null>>;

export interface LocationImportState {
  currentStep: ImportStep;
  selectedDataSource: LocationDataSource | null;
  uploadedFile: File | null;
  rawExcelData: any[][]; // Данные без заголовков
  excelHeaders: string[];
  columnMapping: ColumnMapping;
  processedData: ProcessedLocationData[];
  isLoading: boolean; // Для чтения файла и для обработки данных после маппинга
  isSaving: boolean;  // Для сохранения в БД
}

// ActionType и LocationImportAction теперь в locationImport.reducer.ts