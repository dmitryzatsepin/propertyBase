// src/features/LocationImport/hooks/useLocationImport.ts
import { useReducer } from 'react';
import {
  ImportStep,
  LocationDataSource,
  // LocationImportState, // initialState импортируется из редьюсера
  // ProcessedLocationData, // Не используется напрямую здесь, только в сервисах/редьюсере
  ColumnMapping,
} from '../types/locationImport.types';
import { apiClient } from '../services/locationImport.api';
import { workflowService } from '../services/importWorkflow.service';
import {
  locationImportReducer,
  initialState,
  ActionType,
  // LocationImportAction, // Не используется напрямую здесь
} from './locationImport.reducer';

export const useLocationImport = () => {
  const [state, dispatch] = useReducer(locationImportReducer, initialState);

  // --- Функции-обертки для диспатча экшенов ---
  const setCurrentStep = (step: ImportStep) => dispatch({ type: ActionType.SET_CURRENT_STEP, payload: step });
  const setSelectedDataSource = (source: LocationDataSource | null) => dispatch({ type: ActionType.SET_SELECTED_DATA_SOURCE, payload: source });
  const setUploadedFile = (file: File | null) => dispatch({ type: ActionType.SET_UPLOADED_FILE, payload: file });
  const updateColumnMapping = (mapping: ColumnMapping) => dispatch({ type: ActionType.UPDATE_COLUMN_MAPPING, payload: mapping });

  // --- Основные асинхронные действия ---
  const readFileAndInitiateMapping = async () => {
    // Проверка на null для state.uploadedFile и state.selectedDataSource теперь в workflowService
    dispatch({ type: ActionType.PROCESS_FILE_START });
    try {
      const result = await workflowService.readFileForMapping({
        uploadedFile: state.uploadedFile,
        selectedDataSource: state.selectedDataSource,
      });
      dispatch({ type: ActionType.SET_EXCEL_HEADERS_AND_MAPPING, payload: result });
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'Error reading Excel file.';
      // Уведомление об ошибке уже будет показано из workflowService, если там есть notifications.show()
      // Но для обновления состояния isLoading в хуке, нужно диспатчить ошибку.
      dispatch({ type: ActionType.PROCESS_FILE_ERROR, payload: errorMessage });
    }
  };

  const applyMappingAndProcessData = async () => {
    dispatch({ type: ActionType.PROCESS_FILE_START });
    try {
      const processedData = await workflowService.processDataWithMapping(
        state.rawExcelData,
        state.excelHeaders,
        state.columnMapping,
        state.selectedDataSource
      );
      dispatch({ type: ActionType.PROCESS_FILE_SUCCESS, payload: { processedData } });
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'Error processing data with mapping.';
      dispatch({ type: ActionType.PROCESS_FILE_ERROR, payload: errorMessage });
    }
  };

  const saveProcessedDataToDB = async (): Promise<void> => {
    // Проверка на пустые данные также может быть в apiClient.saveLocations,
    // который бросит ошибку, а хук ее поймает и покажет уведомление через редьюсер.
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