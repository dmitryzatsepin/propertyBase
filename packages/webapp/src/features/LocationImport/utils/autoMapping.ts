// src/features/LocationImport/utils/autoMapping.ts
import {
    LocationDataSource,
    ColumnMapping,
    MappableField,
  } from "../types/locationImport.types";

  export const attemptAutoMapping = (
    headers: string[],
    dataSource: LocationDataSource
  ): ColumnMapping => {
    const mapping: ColumnMapping = {};
  
    // General keyword-based mapping for all MappableFields
    const fieldToKeywords: Record<MappableField, string[]> = {
      city: ["city", "emirate", "город", "эмират"],
      community: ["community", "area", "район", "комьюнити"],
      subcommunity: [
        "subcommunity",
        "sub-community",
        "sub community",
        "sub area",
        "кластер",
        "сабкомьюнити",
      ],
      property: [
        "property",
        "building",
        "project",
        "tower",
        "здание",
        "проект",
        "башня",
        "объект",
      ],
      locationType: ["type", "location type", "тип локации", "тип"],
      sourceSpecificId: ["id", "ref", "reference", "source id", "код", "номер"],
      rawLocationHierarchy: [
        "hierarchy",
        "location_hierarchy",
        "location hierarchy",
        "path",
        "путь",
        "иерархия",
      ],
      locationName: ["name", "location_name", "location name", "имя", "название"],
    };
  
    (Object.keys(fieldToKeywords) as MappableField[]).forEach((fieldValue) => {
      const fieldKey = fieldValue as MappableField;
      for (const header of headers) {
        const lowerHeader = header.toLowerCase().trim();
        if (
          fieldToKeywords[fieldKey]?.some((keyword) =>
            lowerHeader.includes(keyword)
          )
        ) {
          if (!mapping[fieldKey]) {
            mapping[fieldKey] = header;
            break;
          }
        }
      }
    });
  
    if (dataSource === LocationDataSource.PROPERTY_FINDER) {
      if (!mapping.city && headers.length > 0) mapping.city = headers[0];
      if (!mapping.community && headers.length > 2) mapping.community = headers[2];
      if (!mapping.subcommunity && headers.length > 4) mapping.subcommunity = headers[4];
      if (!mapping.property && headers.length > 6) mapping.property = headers[6];
    } else if (dataSource === LocationDataSource.BAYUT) {

    }
  
    console.log("Attempted Auto-Mapping Result:", mapping);
    return mapping;
  };