// src/features/LocationImport/hooks/useLocationImport.ts
import React, { useReducer, useEffect } from 'react';
import { notifications } from '@mantine/notifications';
import { IconCheck, IconX, IconAlertTriangle } from '@tabler/icons-react';
import {
  ImportStep,
  LocationDataSource,
  ColumnMapping,
} from '../types/locationImport.types';
import { apiClient } from '../services/locationImport.api';
// Используем правильное имя импортируемого объекта и файла (если имя файла тоже изменилось)
import { fileProcessingService } from '../services/fileProcessing.service';
import {
  locationImportReducer,
  initialState,
  ActionType,
} from './locationImport.reducer';

export const useLocationImport = () => {
  const [state, dispatch] = useReducer(locationImportReducer, initialState);

  useEffect(() => {
    if (state.successForNotification) {
      notifications.show({
        title: 'Success', message: state.successForNotification, color: 'green',
        icon: React.createElement(IconCheck, { size: "1.1rem" }), autoClose: 5000,
      });
      dispatch({ type: ActionType.RESET_NOTIFICATION_MESSAGES });
    }
    if (state.errorForNotification) {
      notifications.show({
        title: 'Error', message: state.errorForNotification, color: 'red',
        icon: React.createElement(IconX, { size: "1.1rem" }), autoClose: 5000,
      });
      dispatch({ type: ActionType.RESET_NOTIFICATION_MESSAGES });
    }
  }, [state.successForNotification, state.errorForNotification]);


  const setCurrentStep = (step: ImportStep) => dispatch({ type: ActionType.SET_CURRENT_STEP, payload: step });
  const setSelectedDataSource = (source: LocationDataSource | null) => dispatch({ type: ActionType.SET_SELECTED_DATA_SOURCE, payload: source });
  const setUploadedFile = (file: File | null) => dispatch({ type: ActionType.SET_UPLOADED_FILE, payload: file });
  const updateColumnMapping = (mapping: ColumnMapping) => dispatch({ type: ActionType.UPDATE_COLUMN_MAPPING, payload: mapping });

  const readFileAndInitiateMapping = async () => {
    if (!state.uploadedFile || !state.selectedDataSource) {
      notifications.show({ title: 'Input Required', message: 'Please select a file and a data source.', color: 'orange', icon: React.createElement(IconAlertTriangle, { size: "1.1rem" }), autoClose: 3000 });
      return;
    }
    dispatch({ type: ActionType.PROCESS_FILE_START });
    try {
      // Вызываем метод из fileProcessingService
      const result = await fileProcessingService.readFileForMapping({ // <--- ИЗМЕНЕН ВЫЗОВ
        uploadedFile: state.uploadedFile,
        selectedDataSource: state.selectedDataSource,
      });
      dispatch({ type: ActionType.SET_EXCEL_HEADERS_AND_MAPPING, payload: result });
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'Error reading Excel file.';
      dispatch({ type: ActionType.PROCESS_FILE_ERROR, payload: errorMessage });
    }
  };

  const applyMappingAndProcessData = async () => {
    if (!state.rawExcelData || !state.selectedDataSource ||
        (Object.keys(state.columnMapping).length === 0 && !Object.values(state.columnMapping).some(value => value !== null))) {
      notifications.show({ title: 'Mapping Required', message: 'Please configure or verify column mapping before processing.', color: 'orange', icon: React.createElement(IconAlertTriangle, { size: "1.1rem" }), autoClose: 3000});
      return;
    }
    dispatch({ type: ActionType.PROCESS_FILE_START });
    try {
      // Вызываем метод из fileProcessingService
      const processedData = await fileProcessingService.processDataWithMapping({
        rawExcelData: state.rawExcelData,
        excelHeaders: state.excelHeaders,
        columnMapping: state.columnMapping,
        selectedDataSource: state.selectedDataSource,
    });
      dispatch({ type: ActionType.PROCESS_FILE_SUCCESS, payload: { processedData } });
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'Error processing data with mapping.';
      dispatch({ type: ActionType.PROCESS_FILE_ERROR, payload: errorMessage });
    }
  };

  const saveProcessedDataToDB = async (): Promise<void> => {
    if (!state.processedData || state.processedData.length === 0) {
       dispatch({ type: ActionType.SAVE_DATA_ERROR, payload: 'No processed data to save.' });
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
    updateColumnMapping,
    readFileAndInitiateMapping,
    applyMappingAndProcessData,
    saveProcessedDataToDB,
  };
};