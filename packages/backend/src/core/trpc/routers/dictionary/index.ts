// packages/backend/src/core/trpc/routers/dictionary/index.ts
import { router } from "../../trpc";
import * as propertyRelated from "./propertyRelated.queries";
import * as general from "./general.queries";
import * as entitySelection from "./entitySelection.queries";

export const dictionaryRouter = router({
  // Property Related
  propertyTypes: propertyRelated.getPropertyTypes,
  propertyStatuses: propertyRelated.getPropertyStatuses,
  offeringTypes: propertyRelated.getOfferingTypes,
  completionStatuses: propertyRelated.getCompletionStatuses,
  furnishingStatuses: propertyRelated.getFurnishingStatuses,
  ownershipTypes: propertyRelated.getOwnershipTypes,
  propertyPurposes: propertyRelated.getPropertyPurposes,
  rentFrequencies: propertyRelated.getRentFrequencies,

  // General
  amenities: general.getAmenities,
  portals: general.getPortals,

  // Entity Selection
  users: entitySelection.getUsersForSelection,
  locations: entitySelection.getLocationsForSelection,
});
