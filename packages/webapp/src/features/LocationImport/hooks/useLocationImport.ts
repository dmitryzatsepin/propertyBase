// src/features/LocationImport/hooks/useLocationImport.ts
import { useState } from 'react';
import {
  ImportStep,
  LocationDataSource,
  LocationImportState,
  ProcessedLocationData,
} from '../types/locationImport.types';
import { readExcelFile } from '../utils/fileReader';

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
    setRawExcelData([]); // Clear previous raw data
    setProcessedData([]); // Clear previous processed data

    // --- ИСКУССТВЕННАЯ ЗАДЕРЖКА ДЛЯ ТЕСТА ---
    //await new Promise(resolve => setTimeout(resolve, 3000)); // Задержка 3 секунды
    // --- КОНЕЦ ИСКУССТВЕННОЙ ЗАДЕРЖКИ ---

    try {
      let sheetIdentifier: string | number | undefined;
      if (state.selectedDataSource === LocationDataSource.PROPERTY_FINDER) {
        sheetIdentifier = 0;
        console.log('Reading first sheet for Property Finder.');
      } else if (state.selectedDataSource === LocationDataSource.BAYUT) {
        sheetIdentifier = 'BayutData'; // Оставим это для теста ошибки
        console.log(`Attempting to read sheet: "${sheetIdentifier}" for Bayut.`);
      }

      const rawData = await readExcelFile(state.uploadedFile!, sheetIdentifier);
      setRawExcelData(rawData);
      console.log('File read successfully. Raw data:', rawData);

      // TODO: Здесь будет логика вызова dataProcessors
      // const processed = processSpecificData(rawData, state.selectedDataSource);
      // setProcessedData(processed);

      // Если все прошло успешно (чтение и последующая обработка), переходим на RESULTS
      setCurrentStep(ImportStep.RESULTS); // <--- ПЕРЕХОД ТОЛЬКО ПРИ УСПЕХЕ

    } catch (e) {
      console.error('Error during file processing in hook:', e);
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
      setError(errorMessage);
      // При ошибке остаемся на текущем шаге UPLOAD
      // setCurrentStep(ImportStep.UPLOAD); // Это не нужно, т.к. мы не меняли шаг до ошибки
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