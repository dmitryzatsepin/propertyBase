// src/features/LocationImport/utils/dataProcessorBayut.ts
import { ProcessedLocationData, LocationDataSource } from '../types/locationImport.types';

/**
 * Processes raw Excel data from Bayut format.
 * @param rawData Raw data from Excel (array of arrays).
 * @returns An array of processed location data.
 */
export const processBayutData = (rawData: any[][]): ProcessedLocationData[] => {
  console.log('Processing Bayut Data:', rawData);
  const processedList: ProcessedLocationData[] = [];

  // Example: Assume 'Location Name' is in the second column (index 1)
  // This is a very basic placeholder logic.
  // You'll need to adjust column indices and parsing based on actual file structure.

  if (rawData.length < 1) { // If no header row, data could start from first row
    console.warn('Bayut data is empty or too short.');
    return [];
  }

  // Assuming data starts from the first row (index 0), or skip headers if present
  // For this example, let's assume data starts from rawData[0]
  for (let i = 0; i < rawData.length; i++) {
    const row = rawData[i];
    // Adjust column index based on Bayut file structure, e.g., name is in column B (index 1)
    if (row && row.length > 1 && row[1]) { // Check if row and second cell exist and not empty
      const locationName = String(row[1]).trim();

      if (locationName) {
        processedList.push({
          id: null,
          name: locationName,
          source: LocationDataSource.BAYUT,
          // Add other fields by mapping columns from 'row'
        });
      }
    }
  }

  console.log('Processed Bayut List:', processedList);
  return processedList;
};