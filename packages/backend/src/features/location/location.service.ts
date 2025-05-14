// packages/backend/src/features/location/location.service.ts
import prisma from '../../core/utils/prismaClient';
import { CreateManyLocationsDto, IncomingLocationDataSource } from './location.types';
import { LocationDataSource as PrismaLocationDataSource } from '@prisma/client';
import { Location } from '@prisma/client';

export const LocationService = {
    async createManyLocations(
      locationsData: CreateManyLocationsDto
    ): Promise<{ count: number }> {
      if (!locationsData || locationsData.length === 0) {
        // ...
        return { count: 0 };
      }

    console.log(
      `LOC_SERVICE: Attempting to create ${locationsData.length} locations in the database.`
    );

    const dataToCreate = locationsData.map((loc) => {
      let prismaSourceValue: PrismaLocationDataSource;

      if (loc.source === IncomingLocationDataSource.PROPERTY_FINDER) {
        prismaSourceValue = PrismaLocationDataSource.PROPERTY_FINDER;
      } else if (loc.source === IncomingLocationDataSource.BAYUT) {
        prismaSourceValue = PrismaLocationDataSource.BAYUT;
      } else {
        const errorMessage = `LOC_SERVICE: Unknown location source received: "${loc.source}".`;
        console.error(errorMessage);
        throw new Error(errorMessage);
      }

      return {
        locationPath: loc.locationPath,
        city: loc.city,
        community: loc.community,
        subcommunity: loc.subcommunity,
        property: loc.property,
        source: prismaSourceValue,
        sourceSpecificId: loc.sourceSpecificId,
      };
    });

    try {
      const result = await prisma.location.createMany({
        data: dataToCreate,
        skipDuplicates: true,
      });

      console.log(`LOC_SERVICE: Successfully created/skipped locations. Records affected (inserted): ${result.count}.`);
      return result;
    } catch (error) {
      console.error('LOC_SERVICE: Error creating multiple locations:', error);
      if (error instanceof Error) {
        throw new Error(`Database error in createManyLocations: ${error.message}`);
      }
      throw new Error('An unknown database error occurred in createManyLocations.');
    }
  },

  async getAllLocations(): Promise<Location[]> {
    console.log('LOC_SERVICE: Fetching all locations.');
    try {
      const locations = await prisma.location.findMany();
      return locations;
    } catch (error) {
      console.error('LOC_SERVICE: Error fetching all locations:', error);
      if (error instanceof Error) {
        throw new Error(`Database error in getAllLocations: ${error.message}`);
      }
      throw new Error('An unknown database error occurred in getAllLocations.');
    }
  }
};