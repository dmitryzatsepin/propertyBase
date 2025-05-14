// packages/backend/src/features/location/location.service.ts
import prisma from '../../core/utils/prismaClient';
import { CreateManyLocationsDto, IncomingLocationDataSource } from './location.types';
import { LocationDataSource as PrismaLocationDataSource } from '@prisma/client';
import { Location } from '@prisma/client';

export const LocationService = {
    async createManyLocations(
      locationsData: CreateManyLocationsDto // locationsData теперь содержит loc.source типа IncomingLocationDataSource
    ): Promise<{ count: number }> {
      if (!locationsData || locationsData.length === 0) {
        // ...
        return { count: 0 };
      }

    console.log(
      `LOC_SERVICE: Attempting to create ${locationsData.length} locations in the database.`
    );

    // Преобразуем DTO с фронтенда в формат, ожидаемый Prisma `createMany`
    // Важно: маппим строковое значение loc.source на enum PrismaLocationDataSource
    const dataToCreate = locationsData.map((loc) => {
      let prismaSourceValue: PrismaLocationDataSource;

      // Маппинг строкового значения из DTO на enum Prisma
      // Предполагается, что loc.source это строка типа "Property Finder" или "Bayut"
      // которая соответствует значениям нашего фронтенд-enum LocationDataSource
      if (loc.source === IncomingLocationDataSource.PROPERTY_FINDER) { // Сравнение enum со значением enum
        prismaSourceValue = PrismaLocationDataSource.PROPERTY_FINDER;
      } else if (loc.source === IncomingLocationDataSource.BAYUT) { // Сравнение enum со значением enum
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
        source: prismaSourceValue, // Используем смапленное значение enum Prisma
        sourceSpecificId: loc.sourceSpecificId,
        // createdAt и updatedAt будут установлены Prisma автоматически при создании
      };
    });

    try {
      // Реальный вызов Prisma для создания множества записей
      const result = await prisma.location.createMany({
        data: dataToCreate,
        skipDuplicates: true, // Пропускать строки, которые нарушают уникальные ограничения
      });

      console.log(`LOC_SERVICE: Successfully created/skipped locations. Records affected (inserted): ${result.count}.`);
      return result; // result будет объектом { count: number }
    } catch (error) {
      console.error('LOC_SERVICE: Error creating multiple locations:', error);
      // Здесь можно добавить более специфическую обработку ошибок Prisma
      if (error instanceof Error) {
        throw new Error(`Database error in createManyLocations: ${error.message}`);
      }
      throw new Error('An unknown database error occurred in createManyLocations.');
    }
  },

  /**
   * (Пример) Получить все локации (можно добавить пагинацию, фильтрацию позже)
   */
  async getAllLocations(): Promise<Location[]> { // Здесь Location - это тип из @prisma/client
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