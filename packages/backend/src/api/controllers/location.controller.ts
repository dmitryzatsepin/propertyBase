// packages/backend/src/api/controllers/location.controller.ts
import { Request, Response, NextFunction } from 'express';
import { LocationService } from '../../features/location/location.service';
import { CreateManyLocationsDto } from '../../features/location/location.types';
// import { ZodError } from 'zod'; // Если будешь использовать Zod для валидации

/**
 * Controller for handling HTTP requests related to locations.
 */
export const LocationController = {
  /**
   * Handles POST request to create multiple locations.
   * Expects an array of location data in the request body.
   */
  async createMultipleLocations(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const locationsData: CreateManyLocationsDto = req.body;

      if (!Array.isArray(locationsData) || locationsData.length === 0) {
        res.status(400).json({ message: 'Bad Request: locationsData must be a non-empty array.' });
        return;
      }

      const result = await LocationService.createManyLocations(locationsData);

      res.status(201).json({
        message: `Successfully created ${result.count} locations.`,
        count: result.count,
      });
    } catch (error) {

      console.error('CONTROLLER_LOC: Error in createMultipleLocations:', error);

      next(error);
    }
  },

  async getAllLocations(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const locations = await LocationService.getAllLocations();
      res.status(200).json(locations);
    } catch (error) {
      console.error('CONTROLLER_LOC: Error in getAllLocations:', error);
      next(error);
    }
  },

};