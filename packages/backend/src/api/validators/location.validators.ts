// packages/backend/src/api/validators/location.validators.ts
import { z } from 'zod';
import { IncomingLocationDataSource } from '../../features/location/location.types';

const createLocationSchema = z.object({
  locationPath: z.string().min(1, { message: "Location path cannot be empty" }),
  city: z.string().min(1, { message: "City cannot be empty" }),
  community: z.string().nullable().optional(),
  subcommunity: z.string().nullable().optional(),
  property: z.string().nullable().optional(),
  locationType: z.string().nullable().optional(),
  source: z.nativeEnum(IncomingLocationDataSource, {
    errorMap: () => ({ message: "Invalid data source provided. Expected 'Property Finder' or 'Bayut'." })
  }),
  sourceSpecificId: z.string().nullable().optional(),
}).strict();

export const createManyLocationsSchema = z.array(createLocationSchema)
  .nonempty({ message: "Request body must be a non-empty array of locations." });