// src/features/LocationImport/services/locationImport.api.ts
import { ProcessedLocationData } from '../types/locationImport.types';

interface SaveLocationsResponse {
  message: string;
  count: number;
}

export const apiClient = {
  saveLocations: async (
    processedData: ProcessedLocationData[]
  ): Promise<SaveLocationsResponse> => {
    if (!processedData || processedData.length === 0) {
      throw new Error('No processed data available to save.');
    }

    const API_BASE_URL = 'http://localhost:3001/api/v1'; // Можно вынести в .env или константы

    const response = await fetch(`${API_BASE_URL}/locations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(processedData),
    });

    const responseData: SaveLocationsResponse | { message: string } = await response.json();

    if (!response.ok) {
      const errorMessage = (responseData as { message: string }).message || `Server responded with ${response.status}`;
      throw new Error(errorMessage);
    }

    return responseData as SaveLocationsResponse;
  },

};