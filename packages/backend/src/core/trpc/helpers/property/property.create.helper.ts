// packages/backend/src/core/trpc/helpers/property/property.create.helper.ts
import { Prisma } from "@prisma/client";
import { PropertyCreateInput } from "../../schemas/property"; // Обновленный путь к схемам

export function preparePropertyCreateData(
  input: PropertyCreateInput
): Prisma.PropertyUncheckedCreateInput {
  const {
    // M-M связи (массивы ID)
    portalIds,
    commercialAmenityIds,
    privateAmenityIds,
    videosUrl,
    ...restOfInput
  } = input;

  const data: Prisma.PropertyUncheckedCreateInput = {
    // Обязательные поля из Zod (гарантированно существуют в input)
    propertyRefNo: restOfInput.propertyRefNo,
    propertyTitle: restOfInput.propertyTitle,
    agentId: restOfInput.agentId,
    locationId: restOfInput.locationId,

    // Скалярные опциональные поля:
    propertyTitleAR: restOfInput.propertyTitleAR ?? null,
    propertyDescription: restOfInput.propertyDescription ?? null,
    propertyDescriptionAR: restOfInput.propertyDescriptionAR ?? null,
    unitNumber: restOfInput.unitNumber ?? null,
    externalPropertyId: restOfInput.externalPropertyId ?? null,
    availabilityDate: restOfInput.availabilityDate,
    buildYear: restOfInput.buildYear,
    dtcmPermit: restOfInput.dtcmPermit ?? null,
    floor: restOfInput.floor,
    geopointLatitude: restOfInput.geopointLatitude,
    geopointLongitude: restOfInput.geopointLongitude,
    numberOfBathrooms: restOfInput.numberOfBathrooms ?? null,
    numberOfBedrooms: restOfInput.numberOfBedrooms ?? null,
    numberOfCheques: restOfInput.numberOfCheques ?? null,
    offPlan: restOfInput.offPlan,
    parking: restOfInput.parking,
    permitNumber: restOfInput.permitNumber ?? null,
    plotSize: restOfInput.plotSize,
    price: restOfInput.price,
    priceOnApplication: restOfInput.priceOnApplication,
    serviceChargeAEDPerSQFT: restOfInput.serviceChargeAEDPerSQFT,
    sizeSqft: restOfInput.sizeSqft,
    stories: restOfInput.stories,
    titleDeedNumberYear: restOfInput.titleDeedNumberYear ?? null,
    videoTourUrl: restOfInput.videoTourUrl,
    view360Url: restOfInput.view360Url,
    developerBitrixId: restOfInput.developerBitrixId ?? null,
    sellerLandlordPABitrixIds: restOfInput.sellerLandlordPABitrixIds ?? null,

    // Массив строк: если undefined, устанавливаем в пустой массив
    videosUrl: videosUrl ?? [],

    // ForeignKey связи (ID справочников)
    propertyTypeId: restOfInput.propertyTypeId,
    propertyStatusId: restOfInput.propertyStatusId,
    offeringTypeId: restOfInput.offeringTypeId,
    completionStatusId: restOfInput.completionStatusId,
    furnishedStatusId: restOfInput.furnishedStatusId,
    ownershipTypeId: restOfInput.ownershipTypeId,
    propertyPurposeId: restOfInput.propertyPurposeId,
    rentFrequencyId: restOfInput.rentFrequencyId,

    // Обработка M-M связей для создания
    ...(portalIds && portalIds.length > 0
      ? { portals: { connect: portalIds.map((id: string) => ({ id })) } }
      : {}),
    ...(commercialAmenityIds && commercialAmenityIds.length > 0
      ? {
          commercialAmenities: {
            connect: commercialAmenityIds.map((id: string) => ({ id })),
          },
        }
      : {}),
    ...(privateAmenityIds && privateAmenityIds.length > 0
      ? {
          privateAmenities: {
            connect: privateAmenityIds.map((id: string) => ({ id })),
          },
        }
      : {}),
  };
  return data;
}
