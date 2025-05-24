import { publicProcedure } from "../../trpc";
import { propertyListSchema, propertyByIdSchema } from "../../schemas/property";
import prisma from "../../../../core/utils/prismaClient";
import { TRPCError } from "@trpc/server";

export const list = publicProcedure
  .input(propertyListSchema)
  .query(async ({ input }) => {
    const limit = input?.limit ?? 10;
    const { cursor } = input ?? {};
    const items = await prisma.property.findMany({
      take: limit + 1,
      cursor: cursor ? { id: cursor } : undefined,
      orderBy: { createdAt: "desc" },
      include: {
        location: {
          select: {
            id: true,
            city: true,
            community: true,
          },
        },
        agent: {
          select: {
            id: true,
            name: true,
          },
        },
        propertyType: {
          select: {
            id: true,
            name: true,
          },
        },
        offeringType: {
          select: {
            id: true,
            name: true,
          },
        },
        _count: {
          select: {
            images: true,
          },
        },
      },
    });
    let nextCursor: typeof cursor | undefined = undefined;
    if (items.length > limit) {
      const nextItem = items.pop();
      nextCursor = nextItem!.id;
    }
    return { items, nextCursor };
  });

export const getById = publicProcedure
  .input(propertyByIdSchema)
  .query(async ({ input }) => {
    const property = await prisma.property.findUnique({
      where: { id: input.id },
      include: {
        location: true,
        agent: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
        propertyType: true,
        propertyStatus: true,
        offeringType: true,
        completionStatus: true,
        furnishedStatus: true,
        ownershipType: true,
        propertyPurpose: true,
        rentFrequency: true,

        // M-M связи
        portals: {
          select: {
            id: true,
            name: true,
            websiteUrl: true, // Пример, если нужно URL портала
          },
        },
        commercialAmenities: {
          select: {
            id: true,
            name: true,
          },
        },
        privateAmenities: {
          select: {
            id: true,
            name: true,
          },
        },

        // Связи 1-M (файлы) - пока оставим true, чтобы загружать все поля.
        // В будущем можно будет использовать select, если нужно.
        images: true,
        propertyDocuments: true,
        floorPlans: true,
      },
    });

    if (!property) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: `Property with id '${input.id}' not found`,
      });
    }
    return property;
  });
