// packages/backend/src/core/trpc/helpers/property/property.update.helper.ts
import { Prisma } from "@prisma/client";
import { PropertyUpdateInput } from "../../schemas/property"; // Обновленный путь к схемам

// Тип для payload функции preparePropertyUpdateData, так как 'id' обрабатывается отдельно в мутации.
type PropertyUpdatePayload = Omit<PropertyUpdateInput, "id">;

export function preparePropertyUpdateData(
  input: PropertyUpdatePayload
): Prisma.PropertyUpdateInput {
  const {
    // ForeignKey ID для связей 1-N
    locationId,
    propertyTypeId,
    propertyStatusId,
    offeringTypeId,
    completionStatusId,
    furnishedStatusId,
    ownershipTypeId,
    propertyPurposeId,
    rentFrequencyId,

    // M-M ID массивы
    portalIds,
    commercialAmenityIds,
    privateAmenityIds,

    // Остальные поля
    ...scalarAndArrayData
  } = input;

  const dataToUpdate: Prisma.PropertyUpdateInput = {
    ...scalarAndArrayData,
  };

  // Обработка ForeignKey связей (1-N)
  if (locationId !== undefined) {
    dataToUpdate.location = { connect: { id: locationId } };
  }

  if (propertyTypeId !== undefined) {
    dataToUpdate.propertyType = propertyTypeId
      ? { connect: { id: propertyTypeId } }
      : { disconnect: true };
  }
  if (propertyStatusId !== undefined) {
    dataToUpdate.propertyStatus = propertyStatusId
      ? { connect: { id: propertyStatusId } }
      : { disconnect: true };
  }
  if (offeringTypeId !== undefined) {
    dataToUpdate.offeringType = offeringTypeId
      ? { connect: { id: offeringTypeId } }
      : { disconnect: true };
  }
  if (completionStatusId !== undefined) {
    dataToUpdate.completionStatus = completionStatusId
      ? { connect: { id: completionStatusId } }
      : { disconnect: true };
  }
  if (furnishedStatusId !== undefined) {
    dataToUpdate.furnishedStatus = furnishedStatusId
      ? { connect: { id: furnishedStatusId } }
      : { disconnect: true };
  }
  if (ownershipTypeId !== undefined) {
    dataToUpdate.ownershipType = ownershipTypeId
      ? { connect: { id: ownershipTypeId } }
      : { disconnect: true };
  }
  if (propertyPurposeId !== undefined) {
    dataToUpdate.propertyPurpose = propertyPurposeId
      ? { connect: { id: propertyPurposeId } }
      : { disconnect: true };
  }
  if (rentFrequencyId !== undefined) {
    dataToUpdate.rentFrequency = rentFrequencyId
      ? { connect: { id: rentFrequencyId } }
      : { disconnect: true };
  }

  // Обработка M-M связей для обновления
  if (portalIds !== undefined) {
    dataToUpdate.portals = {
      set: portalIds.map((id: string) => ({ id })),
    };
  }
  if (commercialAmenityIds !== undefined) {
    dataToUpdate.commercialAmenities = {
      set: commercialAmenityIds.map((id: string) => ({ id })),
    };
  }
  if (privateAmenityIds !== undefined) {
    dataToUpdate.privateAmenities = {
      set: privateAmenityIds.map((id: string) => ({ id })),
    };
  }
  return dataToUpdate;
}
