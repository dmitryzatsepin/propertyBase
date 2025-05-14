// src/features/LocationImport/services/fileProcessing.service.ts
import { readExcelFile } from '../utils/fileReader';
import { processPropertyFinderData } from '../utils/dataProcessorPropertyFinder';
import { processBayutData } from '../utils/dataProcessorBayut';
import { LocationDataSource, ProcessedLocationData } from '../types/locationImport.types';

interface ProcessFileParams {
  file: File;
  dataSource: LocationDataSource;
}

interface ProcessFileResult {
  rawExcelData: any[][];
  processedData: ProcessedLocationData[];
}

export const processUploadedFile = async ({
  file,
  dataSource,
}: ProcessFileParams): Promise<ProcessFileResult> => {
  console.log(`FILE_PROC_SERVICE: Starting to process file: ${file.name} for source: ${dataSource}`);

  let sheetIdentifier: string | number | undefined;
  if (dataSource === LocationDataSource.PROPERTY_FINDER) {
    sheetIdentifier = 0;
    console.log('FILE_PROC_SERVICE: Reading first sheet for Property Finder.');
  } else if (dataSource === LocationDataSource.BAYUT) {
    sheetIdentifier = 0;
    console.log(`FILE_PROC_SERVICE: Attempting to read sheet: "${sheetIdentifier || 'first'}" for Bayut.`);
  }

  const rawExcelData = await readExcelFile(file, sheetIdentifier);
  console.log('FILE_PROC_SERVICE: File read successfully. Raw data length:', rawExcelData.length);

  let processedData: ProcessedLocationData[];
  if (dataSource === LocationDataSource.PROPERTY_FINDER) {
    processedData = processPropertyFinderData(rawExcelData);
  } else if (dataSource === LocationDataSource.BAYUT) {
    processedData = processBayutData(rawExcelData);
  } else {
    throw new Error(`Unsupported data source selected for processing: ${dataSource}`);
  }
  console.log('FILE_PROC_SERVICE: Data processed. Processed data count:', processedData.length);

  return { rawExcelData, processedData };
};