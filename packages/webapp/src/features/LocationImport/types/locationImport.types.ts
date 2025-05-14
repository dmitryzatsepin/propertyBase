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
    isSaving: boolean;
    error: string | null;
    successMessage: string | null;
  }

  export enum ActionType {
    SET_CURRENT_STEP = 'SET_CURRENT_STEP',
    SET_SELECTED_DATA_SOURCE = 'SET_SELECTED_DATA_SOURCE',
    SET_UPLOADED_FILE = 'SET_UPLOADED_FILE',
    PROCESS_FILE_START = 'PROCESS_FILE_START',
    PROCESS_FILE_SUCCESS = 'PROCESS_FILE_SUCCESS',
    PROCESS_FILE_ERROR = 'PROCESS_FILE_ERROR',
    SAVE_DATA_START = 'SAVE_DATA_START',
    SAVE_DATA_SUCCESS = 'SAVE_DATA_SUCCESS',
    SAVE_DATA_ERROR = 'SAVE_DATA_ERROR',
    RESET_MESSAGES = 'RESET_MESSAGES',
  }

  export type LocationImportAction =
  | { type: ActionType.SET_CURRENT_STEP; payload: ImportStep }
  | { type: ActionType.SET_SELECTED_DATA_SOURCE; payload: LocationDataSource | null }
  | { type: ActionType.SET_UPLOADED_FILE; payload: File | null }
  | { type: ActionType.PROCESS_FILE_START }
  | { type: ActionType.PROCESS_FILE_SUCCESS; payload: { rawExcelData: any[][]; processedData: ProcessedLocationData[] } }
  | { type: ActionType.PROCESS_FILE_ERROR; payload: string }
  | { type: ActionType.SAVE_DATA_START }
  | { type: ActionType.SAVE_DATA_SUCCESS; payload: string }
  | { type: ActionType.SAVE_DATA_ERROR; payload: string }
  | { type: ActionType.RESET_MESSAGES };