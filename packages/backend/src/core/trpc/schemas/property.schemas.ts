// packages/backend/src/core/trpc/schemas/property.schemas.ts
import { z } from "zod";

// Базовая схема для большинства полей Property, которые могут приходить от клиента
// Используется для создания и обновления
const propertyBaseSchema = z.object({
  propertyRefNo: z.string().min(1, "Property Ref No. is required"),
  propertyTitle: z.string().min(1, "Property Title is required"),
  propertyTitleAR: z.string().optional(),
  propertyDescription: z.string().optional(),
  propertyDescriptionAR: z.string().optional(),
  unitNumber: z.string().optional(),
  externalPropertyId: z.string().optional(),
  availabilityDate: z.date().nullable().optional(),
  buildYear: z.number().int().positive().nullable().optional(),
  dtcmPermit: z.string().optional(),
  floor: z.number().int().nullable().optional(),
  geopointLatitude: z.number().nullable().optional(),
  geopointLongitude: z.number().nullable().optional(),
  numberOfBathrooms: z.string().optional(),
  numberOfBedrooms: z.string().optional(),
  numberOfCheques: z.string().optional(),
  offPlan: z.boolean().nullable().optional(),
  parking: z.number().int().nullable().optional(),
  permitNumber: z.string().optional(),
  plotSize: z.number().positive().nullable().optional(),
  price: z.number().positive().nullable().optional(),
  priceOnApplication: z.boolean().nullable().optional(),
  serviceChargeAEDPerSQFT: z.number().positive().nullable().optional(),
  sizeSqft: z.number().positive().nullable().optional(),
  stories: z.number().int().positive().nullable().optional(),
  titleDeedNumberYear: z.string().optional(),
  videoTourUrl: z.string().url().optional(),
  videosUrl: z.array(z.string().url()).optional(),
  view360Url: z.string().url().optional(),
  developerBitrixId: z.string().optional(),
  sellerLandlordPABitrixIds: z.string().optional(),

  propertyTypeId: z.string().cuid().optional(),
  propertyStatusId: z.string().cuid().optional(),
  offeringTypeId: z.string().cuid().optional(),
  completionStatusId: z.string().cuid().optional(),
  furnishedStatusId: z.string().cuid().optional(),
  ownershipTypeId: z.string().cuid().optional(),
  propertyPurposeId: z.string().cuid().optional(),
  rentFrequencyId: z.string().cuid().optional(),
});

// Схема для создания Property (обязательные поля + базовые)
export const propertyCreateSchema = propertyBaseSchema.extend({
  agentId: z.string().cuid("Invalid Agent ID format"),
  locationId: z.string().cuid("Invalid Location ID format"),
});

// Схема для обновления Property
export const propertyUpdateSchema = propertyBaseSchema.partial().extend({
  id: z.string().cuid("Property ID is required for update"),
  locationId: z.string().cuid("Invalid Location ID format").optional(),
});

// Схема для получения списка
export const propertyListSchema = z
  .object({
    limit: z.number().min(1).max(100).nullish(),
    cursor: z.string().cuid().nullish(),
  })
  .optional();

// Схема для получения по ID
export const propertyByIdSchema = z.object({
  id: z.string().cuid(),
});
