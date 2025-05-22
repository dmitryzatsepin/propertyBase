// src/features/LocationImport/utils/dataProcessorBayut.ts
import {
  ProcessedLocationData,
  LocationDataSource,
  ColumnMapping,
  MappableField,
  ExcelCellValue,
} from "../types/locationImport.types";

export const processBayutData = (
  rawDataWithoutHeaders: ExcelCellValue[][],
  excelHeaders: string[],
  columnMapping: ColumnMapping
): ProcessedLocationData[] => {
  console.log("PROCESSOR_BAYUT: Processing with mapping:", columnMapping);
  const processedList: ProcessedLocationData[] = [];

  const getColumnIndex = (field: MappableField): number | undefined => {
    const mappedHeader = columnMapping[field];
    if (mappedHeader) {
      const index = excelHeaders.indexOf(mappedHeader);
      return index !== -1 ? index : undefined;
    }
    return undefined;
  };

  // Получаем индексы на основе маппинга
  const cityIdx = getColumnIndex("city"); // Ожидаем, что сюда смаплена колонка "emirate"
  const locationNameIdx = getColumnIndex("locationName"); // Ожидаем "location_name"
  const hierarchyIdx = getColumnIndex("rawLocationHierarchy"); // Ожидаем "location_hierarchy"
  const locationTypeIdx = getColumnIndex("locationType"); // Ожидаем "location_type"
  const sourceSpecificIdIdx = getColumnIndex("sourceSpecificId");

  if (
    cityIdx === undefined ||
    locationNameIdx === undefined ||
    hierarchyIdx === undefined
  ) {
    const missing = [
      ...(cityIdx === undefined ? ["City/Emirate"] : []),
      ...(locationNameIdx === undefined ? ["Location Name"] : []),
      ...(hierarchyIdx === undefined ? ["Location Hierarchy"] : []),
    ].join(", ");
    throw new Error(
      `Essential Bayut columns (${missing}) are not mapped. Please check mapping configuration.`
    );
  }

  for (let i = 0; i < rawDataWithoutHeaders.length; i++) {
    const row = rawDataWithoutHeaders[i];
    const excelRowNumber = i + 2;

    if (!row) continue;

    const cityFromFile = row[cityIdx!]?.toString().trim();
    const locationNameFromFile =
      row[locationNameIdx!]?.toString().trim() || null;
    const locationHierarchyFromFile =
      row[hierarchyIdx!]?.toString().trim() || null;
    const locationTypeFromFile =
      locationTypeIdx !== undefined
        ? row[locationTypeIdx]?.toString().trim() || null
        : null;
    const sourceId =
      sourceSpecificIdIdx !== undefined
        ? row[sourceSpecificIdIdx]?.toString().trim() || null
        : null;

    if (!cityFromFile || !locationNameFromFile || !locationHierarchyFromFile) {
      console.warn(
        `PROCESSOR_BAYUT: Skipping Excel row #${excelRowNumber}: missing mapped essential data.`
      );
      continue;
    }

    const city = cityFromFile;
    const locationPath = locationHierarchyFromFile;
    const hierarchySegments = locationHierarchyFromFile
      .split(">")
      .map((s: string) => s.trim());
    const numSegments = hierarchySegments.length;

    let community: string | null = null;
    let subcommunity: string | null = null;
    let property: string | null = null;

    // Логика для C/S/P на основе hierarchySegments и locationNameFromFile
    if (numSegments >= 2) community = hierarchySegments[1] || null;
    if (numSegments >= 3) subcommunity = hierarchySegments[2] || null;

    if (numSegments === 2) {
      community = locationNameFromFile;
    } else if (numSegments === 3) {
      subcommunity = locationNameFromFile;
    } else if (numSegments >= 4) {
      property = locationNameFromFile;
    }

    processedList.push({
      id: null,
      locationPath: locationPath,
      city: city,
      community: community,
      subcommunity: subcommunity,
      property: property,
      locationType: locationTypeFromFile,
      source: LocationDataSource.BAYUT,
      sourceSpecificId: sourceId,
    });
  }

  console.log(
    `PROCESSOR_BAYUT: Finished. Processed ${processedList.length} items.`
  );
  return processedList;
};
