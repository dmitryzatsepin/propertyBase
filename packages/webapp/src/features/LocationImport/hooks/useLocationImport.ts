// src/features/LocationImport/hooks/useLocationImport.ts
import { useState } from 'react';
import {
  ImportStep,
  LocationDataSource,
  LocationImportState,
  ProcessedLocationData,
} from '../types/locationImport.types';
import { readExcelFile } from '../utils/fileReader';
import { processPropertyFinderData } from '../utils/dataProcessorPropertyFinder';
import { processBayutData } from '../utils/dataProcessorBayut'; 

// Define the initial state for the import process
const initialState: LocationImportState = {
  currentStep: ImportStep.UPLOAD,
  selectedDataSource: null,
  uploadedFile: null,
  rawExcelData: [],
  processedData: [],
  isLoading: false,
  error: null,
};

export const useLocationImport = () => {
  const [state, setState] = useState<LocationImportState>(initialState);

  // --- State Update Functions ---
  const setCurrentStep = (step: ImportStep) => {
    setState((prevState) => ({ ...prevState, currentStep: step, error: null }));
  };

  const setSelectedDataSource = (source: LocationDataSource | null) => {
    setState((prevState) => ({ ...prevState, selectedDataSource: source }));
  };

  const setUploadedFile = (file: File | null) => {
    setState((prevState) => ({
      ...prevState,
      uploadedFile: file,
      rawExcelData: [],
      processedData: [],
      error: null,
    }));
  };

  const setIsLoading = (isLoading: boolean) => {
    setState((prevState) => ({ ...prevState, isLoading }));
  };

  const setError = (errorMessage: string | null) => {
    setState((prevState) => ({ ...prevState, error: errorMessage, isLoading: false }));
  };

  const setRawExcelData = (data: any[][]) => {
    setState((prevState) => ({ ...prevState, rawExcelData: data }));
  };

  const setProcessedData = (data: ProcessedLocationData[]) => {
    setState((prevState) => ({ ...prevState, processedData: data }));
  };

  // --- Main Processing Logic ---
  const processFile = async () => {
    if (!state.uploadedFile || !state.selectedDataSource) {
      setError('Please select a file and a data source before processing.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setRawExcelData([]);
    setProcessedData([]);

    try {
      let sheetIdentifier: string | number | undefined;
      if (state.selectedDataSource === LocationDataSource.PROPERTY_FINDER) {
        sheetIdentifier = 0;
      } else if (state.selectedDataSource === LocationDataSource.BAYUT) {
        // sheetIdentifier = 'BayutData'; // Используй имя, если оно есть
        sheetIdentifier = 0;
      }

      const rawData = await readExcelFile(state.uploadedFile!, sheetIdentifier);
      setRawExcelData(rawData);
      console.log('File read successfully. Raw data:', rawData);

      // --- Call the appropriate data processor ---
      let processed: ProcessedLocationData[] = [];
      if (state.selectedDataSource === LocationDataSource.PROPERTY_FINDER) {
        processed = processPropertyFinderData(rawData);
      } else if (state.selectedDataSource === LocationDataSource.BAYUT) {
        processed = processBayutData(rawData);
      } else {
        // Should not happen if selectedDataSource is always one of the enums
        throw new Error('Unsupported data source selected for processing.');
      }
      setProcessedData(processed);
      console.log('Data processed. Processed data:', processed);
      // --- End data processing ---

      setCurrentStep(ImportStep.RESULTS);

    } catch (e) {
      console.error('Error during file processing in hook:', e);
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    state,
    setCurrentStep,
    setSelectedDataSource,
    setUploadedFile,
    setIsLoading,
    setError,
    setRawExcelData,
    setProcessedData,
    processFile,
  };
};