// src/features/LocationImport/utils/dataProcessorPropertyFinder.ts
import { ProcessedLocationData, LocationDataSource } from '../types/locationImport.types';

/**
 * Processes raw Excel data from Property Finder format.
 * @param rawData Raw data from Excel (array of arrays).
 * @returns An array of processed location data.
 */
export const processPropertyFinderData = (rawData: any[][]): ProcessedLocationData[] => {
  console.log('Processing Property Finder Data:', rawData);
  const processedList: ProcessedLocationData[] = [];

  // Example: Assume first row is headers, data starts from second row
  // Assume 'Location Name' is in the first column (index 0)
  // This is a very basic placeholder logic.
  // You'll need to adjust column indices and parsing based on actual file structure.

  if (rawData.length < 2) { // Need at least one header row and one data row
    console.warn('Property Finder data is too short to process (needs headers and data).');
    return [];
  }

  // Skip header row (rawData[0]) if it exists and is used for mapping
  for (let i = 1; i < rawData.length; i++) {
    const row = rawData[i];
    if (row && row.length > 0 && row[0]) { // Check if row and first cell exist and not empty
      const locationName = String(row[0]).trim(); // Example: Get name from first column

      if (locationName) { // Ensure name is not empty after trimming
        processedList.push({
          id: null, // Or generate a temporary ID, or get from another column
          name: locationName,
          source: LocationDataSource.PROPERTY_FINDER,
          // Add other fields by mapping columns from 'row'
          // e.g., area: row[1], coordinates: row[2], etc.
        });
      }
    }
  }

  console.log('Processed Property Finder List:', processedList);
  return processedList;
};