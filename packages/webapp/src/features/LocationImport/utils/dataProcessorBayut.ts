// src/features/LocationImport/utils/dataProcessorBayut.ts
import { ProcessedLocationData, LocationDataSource } from '../types/locationImport.types';

/**
 * Processes raw Excel data from Bayut format.
 * Expected columns (0-indexed):
 * 0: emirate (becomes City)
 * 1: location_name (last significant part of the hierarchy, or used to determine C/S/P)
 * 2: location_type (becomes locationType)
 * 3: location_hierarchy (becomes locationPath, also used to derive C/S/P)
 *
 * The first row of the rawData is assumed to be headers and will be skipped.
 *
 * @param rawData Raw data from Excel (array of arrays), including a header row at index 0.
 * @returns An array of processed location data.
 */
export const processBayutData = (rawData: any[][]): ProcessedLocationData[] => {
  console.log('PROCESSOR_BAYUT: Initial rawData length received (including headers):', rawData.length);
  const processedList: ProcessedLocationData[] = [];

  // Define expected 0-based column indices
  const COLUMN_INDEX = {
    EMIRATE: 0,
    LOCATION_NAME: 1,
    LOCATION_TYPE: 2,
    LOCATION_HIERARCHY: 3,
  };

  // Assuming the first row is headers and data starts from the second row (index 1)
  if (rawData.length < 2) {
    console.warn('PROCESSOR_BAYUT: Data is too short to process (needs at least a header row and one data row).');
    return [];
  }

  // Start loop from i = 1 to skip the header row
  for (let i = 1; i < rawData.length; i++) {
    const row = rawData[i];
    const excelRowNumber = i + 1; // For logging, 1-based Excel row number

    if (!row) {
      console.warn(`PROCESSOR_BAYUT: Skipping Excel row #${excelRowNumber} (data index ${i}): row object is null or undefined.`);
      continue;
    }

    // Safely extract main values from the current row
    const emirateFromFile = row[COLUMN_INDEX.EMIRATE]?.toString().trim() || null;
    const locationNameFromFile = row[COLUMN_INDEX.LOCATION_NAME]?.toString().trim() || null;
    const locationTypeFromFile = row[COLUMN_INDEX.LOCATION_TYPE]?.toString().trim() || null;
    const locationHierarchyFromFile = row[COLUMN_INDEX.LOCATION_HIERARCHY]?.toString().trim() || null;

    // If essential data for path construction is missing, skip the row
    if (!emirateFromFile || !locationNameFromFile || !locationHierarchyFromFile) {
      console.warn(
        `PROCESSOR_BAYUT: Skipping Excel row #${excelRowNumber}: missing essential data. ` +
        `Emirate: ${emirateFromFile}, LocationName: ${locationNameFromFile}, Hierarchy: ${locationHierarchyFromFile}`
      );
      continue;
    }

    // Assign directly mapped fields
    const city = emirateFromFile;
    const locationPath = locationHierarchyFromFile;

    // Derive community, subcommunity, property based on hierarchy and location_name
    const hierarchySegments = locationHierarchyFromFile.split('>');
    const numSegments = hierarchySegments.length;

    let community: string | null = null;
    let subcommunity: string | null = null;
    let property: string | null = null;

    // Apply rules based on the number of segments in location_hierarchy
    // and using location_name as the defining name for the last relevant segment.
    if (numSegments === 1) {
      // This case was ambiguous, assuming location_name is the community if hierarchy is just the city.
      // Example: Hierarchy: "Dubai", Location Name: "Mirdif" -> City: Dubai, Community: Mirdif
      // This might need further refinement based on actual Bayut data patterns.
      console.warn(`PROCESSOR_BAYUT: Row #${excelRowNumber} has only 1 segment in hierarchy: "${locationHierarchyFromFile}". Using location_name as community.`);
      if (hierarchySegments[0]?.trim().toLowerCase() === city.toLowerCase()) {
        community = locationNameFromFile;
      } else {
        // If the single segment is not the city, this is an unexpected state.
        // For robustness, we could assign location_name to community, or log an error and skip.
        community = locationNameFromFile; // Fallback assignment
      }
    } else if (numSegments === 2) { // Hierarchy: City>Community. location_name is Community.
      // hierarchySegments[0] is City
      community = locationNameFromFile;
    } else if (numSegments === 3) { // Hierarchy: City>Community>Subcommunity. location_name is Subcommunity.
      community = hierarchySegments[1]?.trim() || null;
      subcommunity = locationNameFromFile;
    } else if (numSegments === 4) { // Hierarchy: City>Community>Subcommunity>Property. location_name is Property.
      community = hierarchySegments[1]?.trim() || null;
      subcommunity = hierarchySegments[2]?.trim() || null;
      property = locationNameFromFile;
    } else if (numSegments > 4) { // Hierarchy: City>Seg2>Seg3>...>Property. location_name is Property.
      community = hierarchySegments[1]?.trim() || null;
      subcommunity = hierarchySegments[2]?.trim() || null;
      property = locationNameFromFile; // location_name is the most specific part (Property)
    }

    // Add the processed data to our list
    processedList.push({
      id: null, // Will be generated by DB or handled later
      locationPath: locationPath,
      city: city,
      community: community,
      subcommunity: subcommunity,
      property: property,
      locationType: locationTypeFromFile, // Assigning the extracted location type
      source: LocationDataSource.BAYUT,
      sourceSpecificId: null, // Assuming no specific ID column from Bayut file for now
    });
  }

  console.log(`PROCESSOR_BAYUT: Finished processing. Total items in processedList: ${processedList.length}`);
  return processedList;
};