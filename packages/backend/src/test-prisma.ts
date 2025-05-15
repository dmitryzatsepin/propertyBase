// packages/backend/src/test-prisma.ts
import prisma from './core/utils/prismaClient'; // Используем наш инициализированный клиент
import { LocationDataSource } from '@prisma/client'; // Импортируем enum из клиента

async function testPrismaOperations() {
  console.log('--- Starting Prisma Client Test ---');
  try {
    // 1. Попытка создать одну запись с использованием всех полей, включая locationType
    console.log('Attempting to create a test location...');
    const newLocation = await prisma.location.create({
      data: {
        locationPath: 'Test>Path>For>Type',
        city: 'TestCity',
        community: 'TestCommunity',
        subcommunity: 'TestSubCommunity',
        property: 'TestProperty',
        locationType: 'Building', // <--- Используем locationType
        source: LocationDataSource.BAYUT, // Используем реальное значение enum
        sourceSpecificId: 'test-bayut-123',
      },
    });
    console.log('SUCCESS: Created test location:', newLocation);

    // 2. Попытка найти эту запись и выбрать поле locationType
    console.log(`Attempting to find created location by ID: ${newLocation.id} and select locationType...`);
    const foundLocation = await prisma.location.findUnique({
      where: { id: newLocation.id },
      select: {
        id: true,
        locationPath: true,
        locationType: true, // <--- Пытаемся выбрать locationType
      },
    });

    if (foundLocation) {
      console.log('SUCCESS: Found location with locationType:', foundLocation);
    } else {
      console.error('ERROR: Could not find the created test location by ID.');
    }

    // 3. Попытка использовать locationType в createMany (с одной записью для теста)
    console.log('Attempting createMany with locationType...');
    const createManyResult = await prisma.location.createMany({
      data: [{
        locationPath: 'Test>Path>For>CreateMany',
        city: 'TestCityCM',
        community: 'TestCommunityCM',
        locationType: 'Cluster', // <--- Используем locationType
        source: LocationDataSource.PROPERTY_FINDER,
      }],
      skipDuplicates: true,
    });
    console.log('SUCCESS: createMany result:', createManyResult);


  } catch (e) {
    console.error('!!! ERROR IN PRISMA CLIENT TEST !!!:', e);
  } finally {
    console.log('Disconnecting Prisma Client...');
    await prisma.$disconnect();
    console.log('Prisma Client disconnected.');
    console.log('--- Prisma Client Test Finished ---');
  }
}

testPrismaOperations();