// src/features/LocationImport/utils/dataProcessorPropertyFinder.ts
import {
  ProcessedLocationData,
  LocationDataSource,
} from "../types/locationImport.types";

/**
 * Processes raw Excel data from Property Finder format.
 * Expects the following structure (0-indexed columns from the Excel sheet):
 * Column A (Index 0): City
 * Column C (Index 2): Community
 * Column E (Index 4): Subcommunity
 * Column G (Index 6): Property
 */
export const processPropertyFinderData = (
  rawData: any[][]
): ProcessedLocationData[] => {
  
  const processedList: ProcessedLocationData[] = [];

  const COLUMN_INDEX = {
    CITY: 0,
    COMMUNITY: 2,
    SUBCOMMUNITY: 4,
    PROPERTY: 6,
  };

  if (rawData.length < 2) {
    console.warn(
      "PROCESSOR_PF: Data is too short to process. Expected at least a header row and one data row."
    );
    return [];
  }

  for (let i = 1; i < rawData.length; i++) {
    const row = rawData[i];
    const excelRowNumber = i + 1;
    if (!row) {
      continue;
    }

    const city = row[COLUMN_INDEX.CITY]?.toString().trim() || null;
    const community = row[COLUMN_INDEX.COMMUNITY]?.toString().trim() || null;
    const subcommunity =
      row[COLUMN_INDEX.SUBCOMMUNITY]?.toString().trim() || null;
    const property = row[COLUMN_INDEX.PROPERTY]?.toString().trim() || null;

    // Construct the locationPath string by joining non-empty segments with ">"
    const pathSegments: string[] = [
      city,
      community,
      subcommunity,
      property,
    ].filter((segment): segment is string => segment !== null && segment !== "");

    const locationPath = pathSegments.join(">");

    processedList.push({
      id: null,
      locationPath: locationPath,
      city: city,
      community: community,
      subcommunity: subcommunity,
      property: property,
      source: LocationDataSource.PROPERTY_FINDER,
      sourceSpecificId: null,
    });
  }

  console.log(
    `PROCESSOR_PF: Finished processing all rows. Original items in processedList: ${processedList.length}`
  );

  // --- ВРЕМЕННОЕ ОГРАНИЧЕНИЕ КОЛИЧЕСТВА ЗАПИСЕЙ ДЛЯ ТЕСТА ---
  // const testLimit = 100;
  // if (processedList.length > testLimit) {
  //   console.warn(
  //     `PROCESSOR_PF: FOR TEST - Returning only the first ${testLimit} processed records out of ${processedList.length}.`
  //   );
  //   return processedList.slice(0, testLimit);
  // }
  // --- КОНЕЦ ВРЕМЕННОГО ОГРАНИЧЕНИЯ ---

  return processedList;
};