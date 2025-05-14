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
    source: LocationDataSource;
    [key: string]: any;
  }
  
  export interface LocationImportState {
    currentStep: ImportStep;
    selectedDataSource: LocationDataSource | null;
    uploadedFile: File | null;
    rawExcelData: any[][];
    processedData: ProcessedLocationData[];
    isLoading: boolean;
    error: string | null;
  }