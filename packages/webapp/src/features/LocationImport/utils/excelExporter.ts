// src/features/LocationImport/utils/excelExporter.ts
import * as XLSX from 'xlsx';
import { ProcessedLocationData } from '../types/locationImport.types';

export const exportToExcel = (data: ProcessedLocationData[], fileName: string): void => {
  if (!data || data.length === 0) {
    console.warn('EXCEL_EXPORTER: No data provided to export.');
    return;
  }

  const headers = [
    'Location Path',
    'Location Path Reversed',
    'City',
    'Community',
    'Subcommunity',
    'Property',
    'Location Type',
    'Source',
    'Source Specific ID',
  ];

  const dataForSheet = [
    headers,
    ...data.map(item => {
      // Формируем реверсивный путь
      const reversedPathSegments: string[] = [];
      if (item.property) reversedPathSegments.push(item.property);
      if (item.subcommunity) reversedPathSegments.push(item.subcommunity);
      if (item.community) reversedPathSegments.push(item.community);
      if (item.city) reversedPathSegments.push(item.city);
      const locationPathReversed = reversedPathSegments.join('<'); // Используем '<' как разделитель

      return [
        item.locationPath,
        locationPathReversed, // <--- НОВОЕ ПОЛЕ В СТРОКЕ
        item.city,
        item.community,
        item.subcommunity,
        item.property,
        item.locationType,
        item.source,
        item.sourceSpecificId,
      ];
    }),
  ];

  const worksheet = XLSX.utils.aoa_to_sheet(dataForSheet);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Locations');

  // Обновляем ширину колонок, добавив одну для нового поля
  const columnWidths = [
    { wch: 50 }, // Location Path
    { wch: 50 }, // Location Path Reversed
    { wch: 20 }, // City
    { wch: 25 }, // Community
    { wch: 25 }, // Subcommunity
    { wch: 25 }, // Property
    { wch: 15 }, // Location Type
    { wch: 20 }, // Source
    { wch: 20 }, // Source Specific ID
  ];
  worksheet['!cols'] = columnWidths;

  XLSX.writeFile(workbook, `${fileName}.xlsx`);
  console.log(`EXCEL_EXPORTER: Data exported to ${fileName}.xlsx with reversed path.`);
};