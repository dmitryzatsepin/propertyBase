// src/features/LocationImport/hooks/useLocationImport.ts
import { useState } from 'react';
import {
  ImportStep,
  LocationDataSource,
  LocationImportState,
  ProcessedLocationData,
} from '../types/locationImport.types';

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

  // Placeholder for file processing logic (will be expanded later)
  const processFile = async () => {
    if (!state.uploadedFile || !state.selectedDataSource) {
      setError('Please select a file and a data source.');
      return;
    }

    console.log('Processing file for:', state.selectedDataSource, state.uploadedFile.name);

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