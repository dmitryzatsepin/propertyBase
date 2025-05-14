// src/features/LocationImport/utils/dataProcessorBayut.ts
import { ProcessedLocationData, LocationDataSource } from '../types/locationImport.types';

/**
 * Processes raw Excel data from Bayut format.
 * This is currently a basic placeholder.
 * You will need to adapt this based on the actual Bayut file structure and columns.
 *
 * @param rawData Raw data from Excel (array of arrays). May or may not include header row.
 * @returns An array of processed location data.
 */
export const processBayutData = (rawData: any[][]): ProcessedLocationData[] => {
  console.log('Processing Bayut Data:', rawData);
  const processedList: ProcessedLocationData[] = [];

  const BAYUT_NAME_COLUMN_INDEX = 1;

  if (rawData.length === 0) {
    console.warn('Bayut data is empty.');
    return [];
  }

  for (let i = 0; i < rawData.length; i++) {
    const row = rawData[i];
    if (!row || row.length <= BAYUT_NAME_COLUMN_INDEX || !row[BAYUT_NAME_COLUMN_INDEX]) {
        console.warn(`Skipping row ${i + 1}: Missing name column.`);
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