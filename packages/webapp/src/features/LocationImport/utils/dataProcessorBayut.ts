// src/features/LocationImport/utils/dataProcessorBayut.ts
import { ProcessedLocationData, LocationDataSource } from '../types/locationImport.types';

export const processBayutData = (rawData: any[][]): ProcessedLocationData[] => {
  const processedList: ProcessedLocationData[] = [];

  const BAYUT_NAME_COLUMN_INDEX = 1;

  if (rawData.length === 0) {
    return [];
  }

  for (let i = 0; i < rawData.length; i++) {
    const row = rawData[i];
    if (!row || row.length <= BAYUT_NAME_COLUMN_INDEX || !row[BAYUT_NAME_COLUMN_INDEX]) {
        continue;
    }

    const locationName = String(row[BAYUT_NAME_COLUMN_INDEX]).trim();

    if (locationName) {
      processedList.push({
        id: null,
        locationPath: locationName,
        city: null,
        community: null,
        subcommunity: null,
        property: null,
        source: LocationDataSource.BAYUT,
      });
    }
  }

  console.log('Processed Bayut List:', processedList);
  return processedList;
};