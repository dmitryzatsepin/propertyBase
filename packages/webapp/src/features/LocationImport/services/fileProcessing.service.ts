// src/features/LocationImport/services/importWorkflow.service.ts
import { notifications } from '@mantine/notifications';
import React from 'react';
import { IconAlertTriangle } from '@tabler/icons-react';
import { readExcelFile } from '../utils/fileReader';
import { processPropertyFinderData } from '../utils/dataProcessorPropertyFinder';
import { processBayutData } from '../utils/dataProcessorBayut';
import {
  LocationDataSource,
  ProcessedLocationData,
  ColumnMapping,
  // MappableField, // Больше не нужен здесь напрямую
} from '../types/locationImport.types';
import { attemptAutoMapping } from '../utils/autoMapping'; // <--- ИМПОРТ

// Интерфейсы остаются здесь, так как они описывают параметры и результаты функций этого сервиса
interface ReadFileAndGetHeadersParams {
  uploadedFile: File | null;
  selectedDataSource: LocationDataSource | null;
}

interface ReadFileResult {
  headers: string[];
  rawData: any[][]; // Данные УЖЕ БЕЗ заголовков
  initialMapping: ColumnMapping;
}

interface ProcessDataWithMappingParams {
  rawExcelData: any[][]; // Данные без заголовков
  excelHeaders: string[];
  columnMapping: ColumnMapping;
  selectedDataSource: LocationDataSource | null;
}


export const fileProcessingService = { // Переименовал workflowService в fileProcessingService для консистентности
  async readFileForMapping({
    uploadedFile,
    selectedDataSource,
  }: ReadFileAndGetHeadersParams): Promise<ReadFileResult> {
    if (!uploadedFile || !selectedDataSource) {
      // Уведомление будет показано в хуке, если он поймает эту ошибку
      throw new Error("File or data source is missing for readFileForMapping.");
    }

    const allRows = await readExcelFile(uploadedFile, 0);
    if (allRows.length === 0) {
      throw new Error("Excel file is empty or the first sheet is empty.");
    }
    const headers = allRows.length > 0 ? allRows[0].map(String) : [];
    const rawDataWithoutHeaders = allRows.length > 1 ? allRows.slice(1) : [];

    const initialMapping = attemptAutoMapping(headers, selectedDataSource); // <--- ВЫЗОВ УТИЛИТЫ

    return { headers, rawData: rawDataWithoutHeaders, initialMapping };
  },

  async processDataWithMapping({
    rawExcelData,
    excelHeaders,
    columnMapping,
    selectedDataSource,
  }: ProcessDataWithMappingParams): Promise<ProcessedLocationData[]> {
    if (!selectedDataSource) {
      throw new Error("Data source is missing for processDataWithMapping.");
    }
    const isMappingEffectivelyEmpty =
      Object.keys(columnMapping).length === 0 ||
      Object.values(columnMapping).every((value) => value === null);

    if (isMappingEffectivelyEmpty) { // Проверяем только маппинг, rawExcelData проверит dataProcessor
      notifications.show({
        title: "Mapping Required",
        message: "Please configure column mapping.",
        color: "orange",
        icon: React.createElement(IconAlertTriangle, { size: "1.1rem" }),
        autoClose: 3000,
      });
      throw new Error("Mapping configuration is missing/empty for processDataWithMapping.");
    }

    let processed: ProcessedLocationData[] = [];
    if (selectedDataSource === LocationDataSource.PROPERTY_FINDER) {
      processed = processPropertyFinderData(rawExcelData, excelHeaders, columnMapping);
    } else if (selectedDataSource === LocationDataSource.BAYUT) {
      processed = processBayutData(rawExcelData, excelHeaders, columnMapping);
    } else {
      throw new Error("Unsupported data source for processing.");
    }
    console.log(
      `FILE_PROC_SERVICE: Data processed using mapping. Processed data count: ${processed.length}`
    );
    return processed;
  },
};