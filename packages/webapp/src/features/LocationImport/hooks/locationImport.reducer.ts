import {
  ImportStep,
  LocationDataSource,
  LocationImportState,
  ProcessedLocationData,
  ColumnMapping,
  ExcelCellValue,
} from "../types/locationImport.types";

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
  RESET_NOTIFICATION_MESSAGES = "RESET_NOTIFICATION_MESSAGES",
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
        rawData: ExcelCellValue[][];
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
  | { type: ActionType.SAVE_DATA_ERROR; payload: string }
  | { type: ActionType.RESET_NOTIFICATION_MESSAGES };

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
  errorForNotification: null,
  successForNotification: null,
};

export const locationImportReducer = (
  state: LocationImportState,
  action: LocationImportAction
): LocationImportState => {
  // Логи для отладки (можно будет убрать позже)
  console.log(
    "REDUCER: Action received:",
    action.type,
    "Payload:",
    "payload" in action ? action.payload : "No payload"
  );
  // console.log('REDUCER: State BEFORE:', state);

  let newState: LocationImportState;

  switch (action.type) {
    case ActionType.SET_CURRENT_STEP:
      newState = {
        ...state,
        currentStep: action.payload,
        errorForNotification: null, // Сбрасываем сообщения при смене шага
        successForNotification: null,
      };
      // Если мы переходим на шаг UPLOAD, сбрасываем все данные предыдущего импорта
      if (action.payload === ImportStep.UPLOAD) {
        newState.uploadedFile = null;
        newState.rawExcelData = [];
        newState.excelHeaders = [];
        newState.columnMapping = {};
        newState.processedData = [];
        newState.isLoading = false;
        newState.isSaving = false;
      }
      break;
    case ActionType.SET_SELECTED_DATA_SOURCE:
      newState = { ...state, selectedDataSource: action.payload };
      break;
    case ActionType.SET_UPLOADED_FILE:
      newState = {
        ...state,
        uploadedFile: action.payload,
        rawExcelData: [], // Сбрасываем данные при загрузке нового файла
        excelHeaders: [],
        columnMapping: {},
        processedData: [],
        isLoading: false,
        isSaving: false,
        errorForNotification: null,
        successForNotification: null,
      };
      break;
    case ActionType.SET_EXCEL_HEADERS_AND_MAPPING:
      newState = {
        ...state,
        isLoading: false, // Завершили чтение файла
        excelHeaders: action.payload.headers,
        rawExcelData: action.payload.rawData,
        columnMapping: action.payload.initialMapping,
        currentStep: ImportStep.MANUAL_MAPPING,
        errorForNotification: null,
        successForNotification: null,
      };
      break;
    case ActionType.UPDATE_COLUMN_MAPPING:
      newState = { ...state, columnMapping: action.payload };
      break;
    case ActionType.PROCESS_FILE_START:
      newState = {
        ...state,
        isLoading: true,
        processedData: [], // Очищаем предыдущие обработанные данные
        errorForNotification: null,
        successForNotification: null,
      };
      break;
    case ActionType.PROCESS_FILE_SUCCESS:
      newState = {
        ...state,
        isLoading: false,
        processedData: action.payload.processedData,
        currentStep: ImportStep.RESULTS,
      };
      break;
    case ActionType.PROCESS_FILE_ERROR:
      newState = {
        ...state,
        isLoading: false,
        errorForNotification: action.payload,
        successForNotification: null,
        // Можно оставить пользователя на текущем шаге (Upload или Mapping)
      };
      break;
    case ActionType.SAVE_DATA_START:
      newState = {
        ...state,
        isSaving: true,
        errorForNotification: null,
        successForNotification: null,
      };
      break;
    case ActionType.SAVE_DATA_SUCCESS:
      newState = {
        ...state,
        isSaving: false,
        successForNotification: action.payload, // Устанавливаем сообщение для useEffect в хуке
        processedData: [], // Очищаем данные после успешного сохранения
        currentStep: ImportStep.UPLOAD, // Возвращаемся на первый шаг
      };
      break;
    case ActionType.SAVE_DATA_ERROR:
      newState = {
        ...state,
        isSaving: false,
        errorForNotification: action.payload, // Устанавливаем сообщение для useEffect в хуке
        successForNotification: null,
        // Остаемся на шаге Results при ошибке сохранения
      };
      break;
    case ActionType.RESET_NOTIFICATION_MESSAGES:
      newState = {
        ...state,
        errorForNotification: null,
        successForNotification: null,
      };
      break;
    default:
      // Для необработанных экшенов TypeScript выдаст ошибку, если тип action не `never`
      // const _exhaustiveCheck: never = action;
      newState = state;
  }

  // console.log('REDUCER: State AFTER:', newState);
  return newState;
};
