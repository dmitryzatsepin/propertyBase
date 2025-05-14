// src/features/LocationImport/utils/dataProcessorPropertyFinder.ts
import { ProcessedLocationData, LocationDataSource } from '../types/locationImport.types';

/**
 * Processes raw Excel data from Property Finder format.
 * Expects the following structure (0-indexed columns):
 * [0]: City, [1]: City(Secondary), [2]: Community, [3]: Community(Secondary),
 * [4]: Subcommunity, [5]: Subcommunity(Secondary), [6]: Property, [7]: Property(Secondary)
 * Extracts data from columns 0, 2, 4, 6.
 *
 * @param rawData Raw data from Excel (array of arrays). Should include header row.
 * @returns An array of processed location data.
 */
export const processPropertyFinderData = (rawData: any[][]): ProcessedLocationData[] => {
  console.log('Processing Property Finder Data:', rawData);
  const processedList: ProcessedLocationData[] = [];

  const COLUMN_INDEX = {
    CITY: 0,
    COMMUNITY: 2,
    SUBCOMMUNITY: 4,
    PROPERTY: 6,
  };

  if (rawData.length < 2) {
    console.warn('Property Finder data is too short to process (needs headers and data).');
    return [];
  }

  for (let i = 1; i < rawData.length; i++) {
    const row = rawData[i];

    if (!row || row.length <= Math.max(COLUMN_INDEX.CITY, COLUMN_INDEX.COMMUNITY, COLUMN_INDEX.SUBCOMMUNITY, COLUMN_INDEX.PROPERTY)) {
        console.warn(`Skipping row ${i + 1}: Not enough columns.`);
        continue;
    }

    const city = row[COLUMN_INDEX.CITY]?.toString().trim() || null;
    const community = row[COLUMN_INDEX.COMMUNITY]?.toString().trim() || null;
    const subcommunity = row[COLUMN_INDEX.SUBCOMMUNITY]?.toString().trim() || null;
    const property = row[COLUMN_INDEX.PROPERTY]?.toString().trim() || null;

    const pathSegments: string[] = [city, community, subcommunity, property].filter(segment => segment !== null && segment !== '');
    const locationPath = pathSegments.join('>');

    if (locationPath) {
        processedList.push({
          id: null,
          locationPath: locationPath,
          city: city,
          community: community,
          subcommunity: subcommunity,
          property: property,
          source: LocationDataSource.PROPERTY_FINDER,
        });
    } else {
        console.warn(`Skipping row ${i + 1}: All location segments are empty.`);
    }
  }

  console.log('Processed Property Finder List:', processedList);
  return processedList;
};