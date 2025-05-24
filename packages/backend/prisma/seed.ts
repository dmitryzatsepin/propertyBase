// packages/backend/prisma/seed.ts
/// <reference types="node" />
import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log(`Start seeding ...`);

  // --- PropertyTypes ---
  const propertyTypesData: Prisma.PropertyTypeCreateInput[] = [
    {
      name: "Apartment",
      description: "A self-contained housing unit within a larger building.",
    },
    {
      name: "Bulk Units",
      description: "Multiple property units sold together as a single package.",
    },
    {
      name: "Bungalow",
      description: "A single-story house, often with a veranda.",
    },
    {
      name: "Business Center",
      description:
        "A commercial building offering office spaces and business amenities.",
    },
    {
      name: "Co-working Space",
      description: "Shared workspace for professionals and freelancers.",
    },
    {
      name: "Commercial Villa",
      description: "A villa property designated for commercial use.",
    },
    {
      name: "Duplex",
      description: "A residential property divided into two separate units.",
    },
    {
      name: "Factory",
      description: "A building for industrial production and manufacturing.",
    },
    {
      name: "Farm",
      description: "Land used for agricultural production.",
    },
    {
      name: "Full Floor Commercial",
      description: "An entire floor of a building for commercial use.",
    },
    {
      name: "Full Floor Residential",
      description: "An entire floor of a building for residential use.",
    },
    {
      name: "Half Floor Commercial",
      description: "A portion of a building floor for commercial use.",
    },
    {
      name: "Half Floor Residential",
      description: "A portion of a building floor for residential use.",
    },
    {
      name: "Labor Camp",
      description: "Accommodation facilities for workers or laborers.",
    },
    {
      name: "Land",
      description: "Undeveloped property without structures.",
    },
    {
      name: "Office Space",
      description: "A commercial space for business operations.",
    },
    {
      name: "Penthouse",
      description: "A luxury apartment on the top floor of a building.",
    },
    {
      name: "Plot",
      description: "A piece of land designated for building or development.",
    },
    {
      name: "Restaurant",
      description: "A commercial property for food service operations.",
    },
    {
      name: "Retail",
      description: "Commercial space for selling goods to consumers.",
    },
    {
      name: "Shop",
      description: "A small commercial space for retail business.",
    },
    {
      name: "Short Term / Hotel Apartment",
      description: "Furnished apartments for temporary stays.",
    },
    {
      name: "Showroom",
      description: "Space for displaying products to potential customers.",
    },
    {
      name: "Staff Accommodation",
      description: "Housing provided for employees by employers.",
    },
    {
      name: "Townhouse",
      description: "A terraced house, typically with a small garden.",
    },
    {
      name: "Villa",
      description: "A large, luxurious house with private grounds.",
    },
    {
      name: "Warehouse",
      description: "Large storage space for goods and inventory.",
    },
    {
      name: "Whole Building",
      description: "An entire building available for purchase or lease.",
    },
  ];
  for (const pt of propertyTypesData) {
    await prisma.propertyType.upsert({
      where: { name: pt.name },
      update: {},
      create: pt,
    });
  }
  console.log(`Seeded ${propertyTypesData.length} property types`);

  // --- PropertyStatuses ---
  const propertyStatusesData: Prisma.PropertyStatusCreateInput[] = [
    {
      name: "Available",
      description: "The property is currently available for sale or rent.",
    },
    { name: "Sold", description: "The property has been sold." },
    { name: "Rented", description: "The property has been rented." },
    {
      name: "Under Offer",
      description: "An offer has been accepted, but the deal is not yet final.",
    },
    {
      name: "Off Market",
      description: "The property is not currently being marketed.",
    },
  ];
  for (const ps of propertyStatusesData) {
    await prisma.propertyStatus.upsert({
      where: { name: ps.name },
      update: {},
      create: ps,
    });
  }
  console.log(`Seeded ${propertyStatusesData.length} property statuses`);

  // --- OfferingTypes ---
  const offeringTypesData: Prisma.OfferingTypeCreateInput[] = [
    { name: "For Sale", description: "The property is offered for sale." },
    { name: "For Rent", description: "The property is offered for rent." },
    {
      name: "Sale or Rent",
      description: "The property is offered for both sale and rent.",
    },
  ];
  for (const ot of offeringTypesData) {
    await prisma.offeringType.upsert({
      where: { name: ot.name },
      update: {},
      create: ot,
    });
  }
  console.log(`Seeded ${offeringTypesData.length} offering types`);

  // --- Amenities ---
  const amenitiesData: Prisma.AmenityCreateInput[] = [
    { name: "Swimming Pool" },
    { name: "Gymnasium" },
    { name: "Covered Parking" },
    { name: "Security" },
    { name: "Balcony" },
    { name: "Central A/C" },
    { name: "Shared Spa" },
    { name: "Children's Play Area" },
    { name: "Concierge Service" },
    { name: "Pet Friendly" },
  ];
  for (const amenity of amenitiesData) {
    await prisma.amenity.upsert({
      where: { name: amenity.name },
      update: {},
      create: amenity,
    });
  }
  console.log(`Seeded ${amenitiesData.length} amenities`);

  // --- Portals ---
  const portalsData: Prisma.PortalCreateInput[] = [
    { name: "PropertyFinder", websiteUrl: "https://www.propertyfinder.ae" },
    { name: "Bayut", websiteUrl: "https://www.bayut.com" },
    {
      name: "Dubizzle",
      websiteUrl: "https://dubai.dubizzle.com/property-for-sale/",
    },
    { name: "Zoopla", websiteUrl: "https://www.zoopla.co.uk/" }, // Example UK portal
    { name: "Zillow", websiteUrl: "https://www.zillow.com/" }, // Example US portal
  ];
  for (const portal of portalsData) {
    await prisma.portal.upsert({
      where: { name: portal.name },
      update: { websiteUrl: portal.websiteUrl }, // Update URL if it changes
      create: portal,
    });
  }
  console.log(`Seeded ${portalsData.length} portals`);

  // TODO: Добавь данные для остальных справочников по аналогии:
  // - CompletionStatus
  // - FurnishingStatus
  // - OwnershipType
  // - PropertyPurpose
  // - RentFrequency

  // --- Users (Пример одного пользователя, если нужно для тестов) ---
  // У тебя уже есть пользователь 'Dmitry Zatsepin'. Если нужно больше для тестов:
  await prisma.user.upsert({
    where: { email: "test.agent@example.com" },
    update: {},
    create: {
      email: "test.agent@example.com",
      name: "Test Agent",
    },
  });
  console.log("Seeded additional users if any");

  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
