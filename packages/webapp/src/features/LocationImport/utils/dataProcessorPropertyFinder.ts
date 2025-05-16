// src/features/LocationImport/utils/dataProcessorPropertyFinder.ts
import {
  ProcessedLocationData,
  LocationDataSource,
  ColumnMapping, // Импортируем ColumnMapping
  MappableField,  // Импортируем MappableField
} from "../types/locationImport.types";

/**
 * Processes raw Excel data from Property Finder format using provided column mapping.
 *
 * @param rawDataWithoutHeaders Raw data from Excel (array of arrays), EXCLUDING the header row.
 * @param excelHeaders An array of header strings from the Excel file's first row.
 * @param columnMapping A mapping object where keys are MappableField (e.g., 'city', 'community')
 *                      and values are the corresponding header strings from excelHeaders, or null if not mapped.
 * @returns An array of processed location data.
 */
export const processPropertyFinderData = (
  rawDataWithoutHeaders: any[][],
  excelHeaders: string[],
  columnMapping: ColumnMapping
): ProcessedLocationData[] => {
  console.log(
    `PROCESSOR_PF: Processing ${rawDataWithoutHeaders.length} data rows with mapping:`,
    columnMapping
  );
  const processedList: ProcessedLocationData[] = [];

  // Функция для получения индекса колонки по нашему целевому полю
  const getColumnIndex = (field: MappableField): number | undefined => {
    const mappedHeader = columnMapping[field];
    if (mappedHeader) {
      const index = excelHeaders.indexOf(mappedHeader);
      return index !== -1 ? index : undefined;
    }
    return undefined;
  };

  // Получаем индексы для каждого маппируемого поля
  const cityIndex = getColumnIndex('city');
  const communityIndex = getColumnIndex('community');
  const subcommunityIndex = getColumnIndex('subcommunity');
  const propertyIndex = getColumnIndex('property');
  const locationTypeIndex = getColumnIndex('locationType'); // Если маппится
  const sourceSpecificIdIndex = getColumnIndex('sourceSpecificId'); // Если маппится

  // Итерируемся по строкам данных (которые уже без заголовков)
  for (let i = 0; i < rawDataWithoutHeaders.length; i++) {
    const row = rawDataWithoutHeaders[i];
    // Номер строки в Excel (приблизительно, т.к. rawDataWithoutHeaders уже без заголовка)
    // Если оригинальный rawData включал заголовки, то это i + 2 строка Excel
    const excelRowNumberApproximation = i + 2;

    if (!row) {
      console.warn(
        `PROCESSOR_PF: Skipping data row index ${i} (Excel approx row #${excelRowNumberApproximation}) because row object is null or undefined.`
      );
      continue;
    }

    // Извлекаем данные, используя полученные индексы
    // Если индекс undefined (поле не смаплено или заголовок не найден), значение будет null
    const city = cityIndex !== undefined ? row[cityIndex]?.toString().trim() || null : null;
    const community = communityIndex !== undefined ? row[communityIndex]?.toString().trim() || null : null;
    const subcommunity = subcommunityIndex !== undefined ? row[subcommunityIndex]?.toString().trim() || null : null;
    const property = propertyIndex !== undefined ? row[propertyIndex]?.toString().trim() || null : null;
    const locationType = locationTypeIndex !== undefined ? row[locationTypeIndex]?.toString().trim() || null : null;
    const sourceSpecificId = sourceSpecificIdIndex !== undefined ? row[sourceSpecificIdIndex]?.toString().trim() || null : null;

    // Формирование locationPath
    const pathSegments: string[] = [
      city,
      community,
      subcommunity,
      property,
    ].filter((segment): segment is string => segment !== null && segment !== "");
    const locationPath = pathSegments.join(">");

    // Добавляем, только если locationPath не пустой (или измени это правило, если нужно)
    if (locationPath || Object.values({city, community, subcommunity, property, locationType, sourceSpecificId}).some(val => val !== null)) {
      processedList.push({
        id: null,
        locationPath: locationPath,
        city: city,
        community: community,
        subcommunity: subcommunity,
        property: property,
        locationType: locationType,
        source: LocationDataSource.PROPERTY_FINDER,
        sourceSpecificId: sourceSpecificId,
      });
    } else {
      console.warn(`PROCESSOR_PF: Skipping data row index ${i} (Excel approx row #${excelRowNumberApproximation}): All relevant mapped fields are empty, resulting in an empty locationPath.`);
    }
  }

  console.log(
    `PROCESSOR_PF: Finished processing. Total items in processedList: ${processedList.length}`
  );
  return processedList;
};