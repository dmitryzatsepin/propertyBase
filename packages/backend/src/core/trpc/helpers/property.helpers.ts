// packages/backend/src/core/trpc/helpers/property.helpers.ts
import { Prisma } from "@prisma/client";
import { z } from "zod";
import { propertyCreateSchema } from "../schemas/property.schemas"; // Импортируем нашу схему

// Тип для входных данных, выведенный из Zod-схемы
type PropertyCreateInputType = z.infer<typeof propertyCreateSchema>;

export function preparePropertyCreateData(
  input: PropertyCreateInputType
): Prisma.PropertyUncheckedCreateInput {
  // Prisma Client достаточно умен, чтобы обработать `undefined` для опциональных полей,
  // пропуская их. Явное присвоение `?? null` или `?? []` нужно только там,
  // где вы хотите гарантировать определенное значение по умолчанию, если input его не содержит,
  // или если тип в Prisma (например, массив) не может быть `undefined` при создании.

  const data: Prisma.PropertyUncheckedCreateInput = {
    propertyRefNo: input.propertyRefNo,
    propertyTitle: input.propertyTitle,
    agentId: input.agentId,
    locationId: input.locationId,

    // Опциональные поля - если input.fieldName === undefined, Prisma их проигнорирует,
    // если поле в БД nullable. Если поле в БД НЕ nullable и нет default, будет ошибка.
    // Поэтому, если поле в Zod .optional(), а в Prisma не nullable и без default,
    // здесь нужно присвоить значение по умолчанию.
    // Предполагаем, что все поля ниже в Prisma nullable (String?, Int?, Boolean?, DateTime?)
    // или имеют default значения, или Zod-схема соответствует обязательности Prisma.

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
    videosUrl: input.videosUrl ?? [], // Для String[] в Prisma, если input.videosUrl undefined, будет []
    view360Url: input.view360Url ?? null,
    developerBitrixId: input.developerBitrixId ?? null,
    sellerLandlordPABitrixIds: input.sellerLandlordPABitrixIds ?? null,

    propertyTypeId: input.propertyTypeId ?? null,
    propertyStatusId: input.propertyStatusId ?? null,
    offeringTypeId: input.offeringTypeId ?? null,
    completionStatusId: input.completionStatusId ?? null,
    furnishedStatusId: input.furnishedStatusId ?? null,
    ownershipTypeId: input.ownershipTypeId ?? null,
    propertyPurposeId: input.propertyPurposeId ?? null,
    rentFrequencyId: input.rentFrequencyId ?? null,

    // Связи M-M будут добавляться здесь позже, например:
    // portals: input.portalIds ? { connect: input.portalIds.map(id => ({ id })) } : undefined,
  };

  // Удаляем ключи со значением undefined, чтобы Prisma их точно проигнорировала, если они опциональны
  // Хотя Prisma Client обычно справляется с этим, это дополнительная мера.
  // (Object.keys(data) as Array<keyof typeof data>).forEach(key => {
  //   if (data[key] === undefined) {
  //     delete data[key];
  //   }
  // });

  return data;
}

// TODO: Создать аналогичную функцию preparePropertyUpdateData, когда будете делать update
