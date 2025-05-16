// src/features/LocationImport/services/importWorkflow.service.ts
import { notifications } from '@mantine/notifications';
import React from 'react';
import { IconAlertTriangle } from '@tabler/icons-react';
import { readExcelFile } from '../utils/fileReader';
import { processPropertyFinderData } from '../utils/dataProcessorPropertyFinder';
import { processBayutData } from '../utils/dataProcessorBayut';
import { LocationDataSource, ProcessedLocationData, ColumnMapping, MappableField } from '../types/locationImport.types';

interface FileAndSource {
  uploadedFile: File | null; // Сделаем File обязательным, т.к. проверка на null будет в хуке
  selectedDataSource: LocationDataSource | null; // Сделаем DataSource обязательным
}

interface ReadFileResult {
  headers: string[];
  rawData: any[][];
  initialMapping: ColumnMapping;
}

// Helper for auto-mapping, можно вынести еще дальше если станет сложнее
const attemptAutoMapping = (headers: string[], dataSource: LocationDataSource): ColumnMapping => {
  const mapping: ColumnMapping = {};
  const fieldToKeywords: Record<MappableField, string[]> = {
    city: ['city', 'emirate', 'город', 'эмират'],
    community: ['community', 'area', 'район', 'комьюнити'],
    subcommunity: ['subcommunity', 'sub-community', 'sub community', 'sub area', 'кластер', 'сабкомьюнити'],
    property: ['property', 'building', 'project', 'tower', 'здание', 'проект', 'башня', 'объект'],
    locationType: ['type', 'location type', 'тип локации', 'тип'],
    sourceSpecificId: ['id', 'ref', 'reference', 'source id', 'код', 'номер'],
    rawLocationHierarchy: ['hierarchy', 'location_hierarchy', 'path', 'путь', 'иерархия'],
    locationName: ['name', 'location_name', 'location name', 'имя', 'название'],
  };
  
  (Object.keys(fieldToKeywords) as MappableField[]).forEach((fieldValue) => {
    const fieldKey = fieldValue as MappableField;
    for (const header of headers) {
      const lowerHeader = header.toLowerCase();
      if (fieldToKeywords[fieldKey] && fieldToKeywords[fieldKey].some(keyword => lowerHeader.includes(keyword))) {
        if (!mapping[fieldKey]) {
          mapping[fieldKey] = header;
          break; 
        }
      }
    }
  });

  // Специфичный маппинг для Property Finder, если автоматический не справился или для приоритета
  if (dataSource === LocationDataSource.PROPERTY_FINDER) {
    if (!mapping.city && headers[0]) mapping.city = headers[0];
    if (!mapping.community && headers[2]) mapping.community = headers[2];
    if (!mapping.subcommunity && headers[4]) mapping.subcommunity = headers[4];
    if (!mapping.property && headers[6]) mapping.property = headers[6];
  } else if (dataSource === LocationDataSource.BAYUT) {
    // Для Bayut мы ожидаем, что авто-маппинг по ключевым словам сработает для:
    // 'city' (из 'emirate')
    // 'locationName' (из 'location_name')
    // 'rawLocationHierarchy' (из 'location_hierarchy')
    // 'locationType' (из 'location_type')
    // Если нужно, можно добавить жесткие фолбеки по индексам и здесь
  }
  return mapping;
};


export const workflowService = {
  async readFileForMapping({ uploadedFile, selectedDataSource }: FileAndSource): Promise<ReadFileResult> {
    // Проверка на null для uploadedFile и selectedDataSource теперь в хуке перед вызовом этого сервиса
    if (!uploadedFile || !selectedDataSource) {
        // Эта ошибка не должна происходить, если хук делает проверку, но на всякий случай
        throw new Error('File or data source is missing in readFileForMapping service call.');
    }

    const allRows = await readExcelFile(uploadedFile, 0); // Читаем первый лист по умолчанию
    if (allRows.length === 0) {
      throw new Error('Excel file is empty or the first sheet is empty.');
    }
    const headers = allRows.length > 0 ? allRows[0].map(String) : [];
    const rawDataPayload = allRows.length > 1 ? allRows.slice(1) : [];
    
    const initialMapping = attemptAutoMapping(headers, selectedDataSource);

    return { headers, rawData: rawDataPayload, initialMapping };
  },

  async processDataWithMapping(
    rawExcelData: any[][],
    excelHeaders: string[],
    columnMapping: ColumnMapping,
    selectedDataSource: LocationDataSource | null // selectedDataSource здесь должен быть не null
  ): Promise<ProcessedLocationData[]> {
    if (!selectedDataSource) { // Добавил проверку
        throw new Error('Data source is missing for processDataWithMapping service call.');
    }
    if (!rawExcelData || (Object.keys(columnMapping).length === 0 && !Object.values(columnMapping).some(value => value !== null))) {
      notifications.show({ title: 'Mapping Required', message: 'Please configure column mapping or ensure data is available.', color: 'orange', icon: React.createElement(IconAlertTriangle, { size: "1.1rem" }), autoClose: 3000});
      throw new Error('Data or mapping missing for processDataWithMapping.');
    }

    let processed: ProcessedLocationData[] = [];
    if (selectedDataSource === LocationDataSource.PROPERTY_FINDER) {
      processed = processPropertyFinderData(rawExcelData, excelHeaders, columnMapping);
    } else if (selectedDataSource === LocationDataSource.BAYUT) {
      // @ts-ignore // TODO: Update signature for processBayutData to accept excelHeaders and columnMapping
      processed = processBayutData(rawExcelData, excelHeaders, columnMapping);
    } else {
      throw new Error('Unsupported data source for processing.');
    }
    return processed;
  }
};