// packages/backend/src/core/trpc/helpers/property.helpers.ts
import { Prisma } from "@prisma/client";
import { z } from "zod";
import {
  propertyCreateSchema,
  propertyUpdateSchema, // Убедитесь, что этот экспорт есть и схема propertyUpdateSchema верна
} from "../schemas/property.schemas";

type PropertyCreateInputType = z.infer<typeof propertyCreateSchema>;
type PropertyUpdateZodInputType = z.infer<typeof propertyUpdateSchema>; // Переименовал для ясности

export function preparePropertyCreateData(
  input: PropertyCreateInputType
): Prisma.PropertyUncheckedCreateInput {
  const data: Prisma.PropertyUncheckedCreateInput = {
    propertyRefNo: input.propertyRefNo,
    propertyTitle: input.propertyTitle,
    agentId: input.agentId,
    locationId: input.locationId, // Для create мы передаем ID напрямую

    // Опциональные поля (если в Zod .optional() или .nullable().optional())
    propertyTitleAR: input.propertyTitleAR ?? null,
    propertyDescription: input.propertyDescription ?? null,
    propertyDescriptionAR: input.propertyDescriptionAR ?? null,
    unitNumber: input.unitNumber ?? null,
    externalPropertyId: input.externalPropertyId ?? null,
    availabilityDate: input.availabilityDate,
    buildYear: input.buildYear,
    dtcmPermit: input.dtcmPermit ?? null,
    floor: input.floor,
    geopointLatitude: input.geopointLatitude,
    geopointLongitude: input.geopointLongitude,
    numberOfBathrooms: input.numberOfBathrooms ?? null,
    numberOfBedrooms: input.numberOfBedrooms ?? null,
    numberOfCheques: input.numberOfCheques ?? null,
    offPlan: input.offPlan,
    parking: input.parking,
    permitNumber: input.permitNumber ?? null,
    plotSize: input.plotSize,
    price: input.price,
    priceOnApplication: input.priceOnApplication,
    serviceChargeAEDPerSQFT: input.serviceChargeAEDPerSQFT,
    sizeSqft: input.sizeSqft,
    stories: input.stories,
    titleDeedNumberYear: input.titleDeedNumberYear ?? null,
    videoTourUrl: input.videoTourUrl ?? null,
    videosUrl: input.videosUrl ?? [],
    view360Url: input.view360Url ?? null,
    developerBitrixId: input.developerBitrixId ?? null,
    sellerLandlordPABitrixIds: input.sellerLandlordPABitrixIds ?? null,

    // Для create мы также передаем ID напрямую для связей, если они есть
    propertyTypeId: input.propertyTypeId ?? null,
    propertyStatusId: input.propertyStatusId ?? null,
    offeringTypeId: input.offeringTypeId ?? null,
    completionStatusId: input.completionStatusId ?? null,
    furnishedStatusId: input.furnishedStatusId ?? null,
    ownershipTypeId: input.ownershipTypeId ?? null,
    propertyPurposeId: input.propertyPurposeId ?? null,
    rentFrequencyId: input.rentFrequencyId ?? null,
  };
  return data;
}

export function preparePropertyUpdateData(
  // input здесь уже не содержит 'id', так как мы его отделили в propertyRouter
  input: Omit<PropertyUpdateZodInputType, "id">
): Prisma.PropertyUpdateInput {
  // Деструктурируем все поля из input
  const {
    // Поля-связи (ID)
    locationId,
    propertyTypeId,
    propertyStatusId,
    offeringTypeId,
    completionStatusId,
    furnishedStatusId,
    ownershipTypeId,
    propertyPurposeId,
    rentFrequencyId,
    // Поля для M-M (когда будут)
    // portalIds,
    // commercialAmenityIds,
    // privateAmenityIds,

    // Остальные поля (скалярные или массивы скаляров)
    ...scalarAndArrayData
  } = input;

  // Prisma.PropertyUpdateInput - это то, что ожидает prisma.property.update({ data: ... })
  const dataToUpdate: Prisma.PropertyUpdateInput = {
    ...scalarAndArrayData, // Сначала присваиваем все скалярные поля и массивы (как videosUrl)
    // `propertyRefNo` здесь не будет, если он был в .omit() схемы propertyUpdateSchema
  };

  // Теперь обрабатываем поля-связи (ForeignKey)
  // Если ID связи пришел (не undefined), то формируем объект connect/disconnect
  if (locationId !== undefined && locationId !== null) {
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

  return dataToUpdate;
}
