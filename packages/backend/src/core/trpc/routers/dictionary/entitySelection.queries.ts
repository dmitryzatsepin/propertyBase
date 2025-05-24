// packages/backend/src/core/trpc/routers/dictionary/entitySelection.queries.ts
import { z } from "zod";
import { publicProcedure } from "../../trpc"; // Путь к trpc.ts
import prisma from "../../../../core/utils/prismaClient";

export const getUsersForSelection = publicProcedure
  .input(z.void().optional())
  .query(async () => {
    return prisma.user.findMany({
      orderBy: { name: "asc" },
      select: { id: true, name: true, email: true },
    });
  });

export const getLocationsForSelection = publicProcedure
  .input(z.void().optional())
  .query(async () => {
    return prisma.location.findMany({
      orderBy: [{ city: "asc" }, { community: "asc" }, { subcommunity: "asc" }],
      select: {
        id: true,
        locationPath: true,
        city: true,
        community: true,
        subcommunity: true,
      },
    });
  });
