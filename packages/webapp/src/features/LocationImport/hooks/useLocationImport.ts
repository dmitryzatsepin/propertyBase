// src/features/LocationImport/hooks/useLocationImport.ts
import React from 'react';
import { useReducer } from 'react';
import { notifications } from '@mantine/notifications';
import { IconCheck, IconX, IconAlertTriangle } from '@tabler/icons-react';
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
};

// --- Функция-редьюсер ---
const locationImportReducer = (
  state: LocationImportState,
  action: LocationImportAction
): LocationImportState => {
  switch (action.type) {
    case ActionType.SET_CURRENT_STEP:
      return { ...state, currentStep: action.payload };
    case ActionType.SET_SELECTED_DATA_SOURCE:
      return { ...state, selectedDataSource: action.payload };
    case ActionType.SET_UPLOADED_FILE:
      return {
        ...state,
        uploadedFile: action.payload,
        rawExcelData: [],
        processedData: [],
      };
    case ActionType.PROCESS_FILE_START:
      return { ...state, isLoading: true, rawExcelData: [], processedData: [] };
    case ActionType.PROCESS_FILE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        rawExcelData: action.payload.rawExcelData,
        processedData: action.payload.processedData,
        currentStep: ImportStep.RESULTS,
      };
    case ActionType.PROCESS_FILE_ERROR:
      notifications.show({
        title: 'Processing Error',
        message: action.payload,
        color: 'red',
        icon: React.createElement(IconX, { size: "1.1rem" }),
        autoClose: 5000,
      });
      return { ...state, isLoading: false };
    case ActionType.SAVE_DATA_START:
      return { ...state, isSaving: true };
    case ActionType.SAVE_DATA_SUCCESS:
      notifications.show({
        title: 'Success',
        message: action.payload,
        color: 'green',
        icon: React.createElement(IconCheck, { size: "1.1rem" }),
        autoClose: 5000,
      });
      return {
        ...state,
        isSaving: false,
        processedData: [],
        currentStep: ImportStep.UPLOAD,
      };
    case ActionType.SAVE_DATA_ERROR:
      notifications.show({
        title: 'Save Error',
        message: action.payload,
        color: 'red',
        icon: React.createElement(IconX, { size: "1.1rem" }),
        autoClose: 5000,
      });
      return { ...state, isSaving: false };
    default:

      return state;
  }
};

export const useLocationImport = () => {
  const [state, dispatch] = useReducer(locationImportReducer, initialState);

  // Функции для UI, которые теперь диспатчат экшены
  const setCurrentStep = (step: ImportStep) => dispatch({ type: ActionType.SET_CURRENT_STEP, payload: step });
  const setSelectedDataSource = (source: LocationDataSource | null) => dispatch({ type: ActionType.SET_SELECTED_DATA_SOURCE, payload: source });
  const setUploadedFile = (file: File | null) => dispatch({ type: ActionType.SET_UPLOADED_FILE, payload: file });

  const processFile = async () => {
    if (!state.uploadedFile || !state.selectedDataSource) {
      notifications.show({
        title: 'Input Required',
        message: 'Please select a file and a data source.',
        color: 'orange',
        icon: React.createElement(IconAlertTriangle, { size: "1.1rem" }),
        autoClose: 3000,
      });
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
      notifications.show({
        title: 'Input Required',
        message: 'No processed data available to save.',
        color: 'orange',
        icon: React.createElement(IconAlertTriangle, { size: "1.1rem" }),
        autoClose: 3000,
      });
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
    processFile,
    saveProcessedDataToDB,
  };
};