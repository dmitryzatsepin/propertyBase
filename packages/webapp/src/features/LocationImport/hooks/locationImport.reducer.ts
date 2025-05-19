// src/features/LocationImport/hooks/locationImport.reducer.ts
import React from "react";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconX, IconAlertTriangle } from "@tabler/icons-react";
import {
  ImportStep,
  LocationDataSource,
  LocationImportState,
  ProcessedLocationData,
  ColumnMapping,
} from "../types/locationImport.types";

// --- Типы экшенов ---
export enum ActionType {
  SET_CURRENT_STEP = "SET_CURRENT_STEP",
  SET_SELECTED_DATA_SOURCE = "SET_SELECTED_DATA_SOURCE",
  SET_UPLOADED_FILE = "SET_UPLOADED_FILE",
  SET_EXCEL_HEADERS_AND_MAPPING = "SET_EXCEL_HEADERS_AND_MAPPING",
  UPDATE_COLUMN_MAPPING = "UPDATE_COLUMN_MAPPING",
  PROCESS_FILE_START = "PROCESS_FILE_START",
  PROCESS_FILE_SUCCESS = "PROCESS_FILE_SUCCESS",
  PROCESS_FILE_ERROR = "PROCESS_FILE_ERROR",
  SAVE_DATA_START = "SAVE_DATA_START",
  SAVE_DATA_SUCCESS = "SAVE_DATA_SUCCESS",
  SAVE_DATA_ERROR = "SAVE_DATA_ERROR",
}

export type LocationImportAction =
  | { type: ActionType.SET_CURRENT_STEP; payload: ImportStep }
  | {
      type: ActionType.SET_SELECTED_DATA_SOURCE;
      payload: LocationDataSource | null;
    }
  | { type: ActionType.SET_UPLOADED_FILE; payload: File | null }
  | {
      type: ActionType.SET_EXCEL_HEADERS_AND_MAPPING;
      payload: {
        headers: string[];
        rawData: any[][];
        initialMapping: ColumnMapping;
      };
    }
  | { type: ActionType.UPDATE_COLUMN_MAPPING; payload: ColumnMapping }
  | { type: ActionType.PROCESS_FILE_START }
  | {
      type: ActionType.PROCESS_FILE_SUCCESS;
      payload: { processedData: ProcessedLocationData[] };
    }
  | { type: ActionType.PROCESS_FILE_ERROR; payload: string }
  | { type: ActionType.SAVE_DATA_START }
  | { type: ActionType.SAVE_DATA_SUCCESS; payload: string }
  | { type: ActionType.SAVE_DATA_ERROR; payload: string };

export const initialState: LocationImportState = {
  currentStep: ImportStep.UPLOAD,
  selectedDataSource: null,
  uploadedFile: null,
  rawExcelData: [],
  excelHeaders: [],
  columnMapping: {},
  processedData: [],
  isLoading: false,
  isSaving: false,
};

export const locationImportReducer = (
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
        excelHeaders: [],
        columnMapping: {},
        processedData: [],
        isLoading: false,
        isSaving: false,
      };
    case ActionType.SET_EXCEL_HEADERS_AND_MAPPING:
      return {
        ...state,
        isLoading: false, // Завершили чтение файла
        excelHeaders: action.payload.headers,
        rawExcelData: action.payload.rawData,
        columnMapping: action.payload.initialMapping,
        currentStep: ImportStep.MANUAL_MAPPING,
      };
    case ActionType.UPDATE_COLUMN_MAPPING:
      return { ...state, columnMapping: action.payload };
    case ActionType.PROCESS_FILE_START:
      return { ...state, isLoading: true, processedData: [] };
    case ActionType.PROCESS_FILE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        processedData: action.payload.processedData,
        currentStep: ImportStep.RESULTS,
      };
    case ActionType.PROCESS_FILE_ERROR:
      notifications.show({
        title: "Error",
        message: action.payload,
        color: "red",
        icon: React.createElement(IconX, { size: "1.1rem" }),
        autoClose: 5000,
      });

      return { ...state, isLoading: false };
    case ActionType.SAVE_DATA_START:
      return { ...state, isSaving: true };
    case ActionType.SAVE_DATA_SUCCESS:
      notifications.show({
        title: "Success",
        message: action.payload,
        color: "green",
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
        title: "Save Error",
        message: action.payload,
        color: "red",
        icon: React.createElement(IconX, { size: "1.1rem" }),
        autoClose: 5000,
      });
      return { ...state, isSaving: false }; // Остаемся на Results
    default:
      return state;
  }
};
