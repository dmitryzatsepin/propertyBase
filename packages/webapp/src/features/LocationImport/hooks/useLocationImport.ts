// src/features/LocationImport/hooks/useLocationImport.ts
import { useReducer } from 'react';
import {
  ImportStep,
  LocationDataSource,
  LocationImportState,
  ProcessedLocationData,
  ActionType,
  LocationImportAction,
} from '../types/locationImport.types';
import { apiClient } from '../services/locationImport.api';
import { processUploadedFile } from '../services/fileProcessing.service';

const initialState: LocationImportState = {
  currentStep: ImportStep.UPLOAD,
  selectedDataSource: null,
  uploadedFile: null,
  rawExcelData: [],
  processedData: [],
  isLoading: false,
  isSaving: false,
  error: null,
  successMessage: null,
};

// --- Функция-редьюсер ---
const locationImportReducer = (
  state: LocationImportState,
  action: LocationImportAction
): LocationImportState => {
  switch (action.type) {
    case ActionType.SET_CURRENT_STEP:
      return { ...state, currentStep: action.payload, error: null, successMessage: null };
    case ActionType.SET_SELECTED_DATA_SOURCE:
      return { ...state, selectedDataSource: action.payload };
    case ActionType.SET_UPLOADED_FILE:
      return {
        ...state,
        uploadedFile: action.payload,
        rawExcelData: [],
        processedData: [],
        error: null,
        successMessage: null,
      };
    case ActionType.PROCESS_FILE_START:
      return { ...state, isLoading: true, error: null, successMessage: null, rawExcelData: [], processedData: [] };
    case ActionType.PROCESS_FILE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        rawExcelData: action.payload.rawExcelData,
        processedData: action.payload.processedData,
        currentStep: ImportStep.RESULTS,
      };
    case ActionType.PROCESS_FILE_ERROR:
      return { ...state, isLoading: false, error: action.payload };
    case ActionType.SAVE_DATA_START:
      return { ...state, isSaving: true, error: null, successMessage: null };
    case ActionType.SAVE_DATA_SUCCESS:
      return {
        ...state,
        isSaving: false,
        successMessage: action.payload,
        processedData: [],
        // currentStep: ImportStep.UPLOAD, // Можно вернуть на первый шаг
      };
    case ActionType.SAVE_DATA_ERROR:
      return { ...state, isSaving: false, error: action.payload };
    case ActionType.RESET_MESSAGES:
      return { ...state, error: null, successMessage: null };
    default:
      return state;
  }
};

export const useLocationImport = () => {
  const [state, dispatch] = useReducer(locationImportReducer, initialState);
  const setCurrentStep = (step: ImportStep) => dispatch({ type: ActionType.SET_CURRENT_STEP, payload: step });
  const setSelectedDataSource = (source: LocationDataSource | null) => dispatch({ type: ActionType.SET_SELECTED_DATA_SOURCE, payload: source });
  const setUploadedFile = (file: File | null) => dispatch({ type: ActionType.SET_UPLOADED_FILE, payload: file });
  const resetMessages = () => dispatch({ type: ActionType.RESET_MESSAGES });

  const processFile = async () => {
    if (!state.uploadedFile || !state.selectedDataSource) {
      dispatch({ type: ActionType.PROCESS_FILE_ERROR, payload: 'Please select a file and a data source.' });
      return;
    }
    dispatch({ type: ActionType.PROCESS_FILE_START });
    try {
      const result = await processUploadedFile({
        file: state.uploadedFile,
        dataSource: state.selectedDataSource,
      });
      dispatch({ type: ActionType.PROCESS_FILE_SUCCESS, payload: result });
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred during file processing.';
      dispatch({ type: ActionType.PROCESS_FILE_ERROR, payload: errorMessage });
    }
  };

  const saveProcessedDataToDB = async (): Promise<void> => {
    if (!state.processedData || state.processedData.length === 0) {
      dispatch({ type: ActionType.SAVE_DATA_ERROR, payload: 'No processed data available to save.' });
      return;
    }
    dispatch({ type: ActionType.SAVE_DATA_START });
    try {
      const result = await apiClient.saveLocations(state.processedData);
      dispatch({ type: ActionType.SAVE_DATA_SUCCESS, payload: `Successfully saved ${result.count} locations.` });
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred while saving data.';
      dispatch({ type: ActionType.SAVE_DATA_ERROR, payload: errorMessage });
    }
  };

  return {
    state,
    setCurrentStep,
    setSelectedDataSource,
    setUploadedFile,
    resetMessages,
    processFile,
    saveProcessedDataToDB,
  };
};