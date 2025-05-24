// packages/backend/src/core/trpc/routers/dictionary/general.queries.ts
import { z } from "zod";
import { publicProcedure } from "../../trpc"; // Путь к trpc.ts
import prisma from "../../../../core/utils/prismaClient";

export const getAmenities = publicProcedure
  .input(z.void().optional())
  .query(async () => {
    return prisma.amenity.findMany({
      orderBy: { name: "asc" },
      select: { id: true, name: true, description: true },
    });
  });

export const getPortals = publicProcedure
  .input(z.void().optional())
  .query(async () => {
    return prisma.portal.findMany({
      orderBy: { name: "asc" },
      select: { id: true, name: true, description: true, websiteUrl: true },
    });
  });
