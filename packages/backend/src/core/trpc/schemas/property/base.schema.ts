// packages/backend/src/core/trpc/schemas/property/base.schema.ts
import { z } from "zod";

export const propertyBaseSchema = z.object({
  propertyRefNo: z.string().min(1, "Property Ref No. is required"),
  propertyTitle: z.string().min(1, "Property Title is required"),
  propertyTitleAR: z.string().optional().nullable(),
  propertyDescription: z.string().optional().nullable(),
  propertyDescriptionAR: z.string().optional().nullable(),
  unitNumber: z.string().optional().nullable(),
  externalPropertyId: z.string().optional().nullable(),
  availabilityDate: z.date().nullable().optional(),
  buildYear: z.number().int().positive().nullable().optional(),
  dtcmPermit: z.string().optional().nullable(),
  floor: z.number().int().nullable().optional(),
  geopointLatitude: z.number().nullable().optional(),
  geopointLongitude: z.number().nullable().optional(),
  numberOfBathrooms: z.string().optional().nullable(),
  numberOfBedrooms: z.string().optional().nullable(),
  numberOfCheques: z.string().optional().nullable(),
  offPlan: z.boolean().nullable().optional(),
  parking: z.number().int().nullable().optional(),
  permitNumber: z.string().optional().nullable(),
  plotSize: z.number().positive().nullable().optional(),
  price: z.number().positive().nullable().optional(),
  priceOnApplication: z.boolean().nullable().optional(),
  serviceChargeAEDPerSQFT: z.number().positive().nullable().optional(),
  sizeSqft: z.number().positive().nullable().optional(),
  stories: z.number().int().positive().nullable().optional(),
  titleDeedNumberYear: z.string().optional().nullable(),
  videoTourUrl: z.string().url().optional().nullable(),
  videosUrl: z.array(z.string().url()).optional(),
  view360Url: z.string().url().optional().nullable(),
  developerBitrixId: z.string().optional().nullable(),
  sellerLandlordPABitrixIds: z.string().optional().nullable(),

  propertyTypeId: z
    .string()
    .cuid("Invalid Property Type ID format")
    .optional()
    .nullable(),
  propertyStatusId: z
    .string()
    .cuid("Invalid Property Status ID format")
    .optional()
    .nullable(),
  offeringTypeId: z
    .string()
    .cuid("Invalid Offering Type ID format")
    .optional()
    .nullable(),
  completionStatusId: z
    .string()
    .cuid("Invalid Completion Status ID format")
    .optional()
    .nullable(),
  furnishedStatusId: z
    .string()
    .cuid("Invalid Furnishing Status ID format")
    .optional()
    .nullable(),
  ownershipTypeId: z
    .string()
    .cuid("Invalid Ownership Type ID format")
    .optional()
    .nullable(),
  propertyPurposeId: z
    .string()
    .cuid("Invalid Property Purpose ID format")
    .optional()
    .nullable(),
  rentFrequencyId: z
    .string()
    .cuid("Invalid Rent Frequency ID format")
    .optional()
    .nullable(),

  portalIds: z.array(z.string().cuid("Invalid Portal ID format")).optional(),
  commercialAmenityIds: z
    .array(z.string().cuid("Invalid Commercial Amenity ID format"))
    .optional(),
  privateAmenityIds: z
    .array(z.string().cuid("Invalid Private Amenity ID format"))
    .optional(),
});
