// packages/backend/src/core/trpc/routers/dictionary/propertyRelated.queries.ts
import { z } from "zod";
import { publicProcedure } from "../../trpc"; // Путь к trpc.ts
import prisma from "../../../../core/utils/prismaClient";

export const getPropertyTypes = publicProcedure
  .input(z.void().optional())
  .query(async () => {
    return prisma.propertyType.findMany({
      orderBy: { name: "asc" },
      select: { id: true, name: true, description: true },
    });
  });

export const getPropertyStatuses = publicProcedure
  .input(z.void().optional())
  .query(async () => {
    return prisma.propertyStatus.findMany({
      orderBy: { name: "asc" },
      select: { id: true, name: true, description: true },
    });
  });

export const getOfferingTypes = publicProcedure
  .input(z.void().optional())
  .query(async () => {
    return prisma.offeringType.findMany({
      orderBy: { name: "asc" },
      select: { id: true, name: true, description: true },
    });
  });

export const getCompletionStatuses = publicProcedure
  .input(z.void().optional())
  .query(async () => {
    return prisma.completionStatus.findMany({
      orderBy: { name: "asc" },
      select: { id: true, name: true, description: true },
    });
  });

export const getFurnishingStatuses = publicProcedure
  .input(z.void().optional())
  .query(async () => {
    return prisma.furnishingStatus.findMany({
      orderBy: { name: "asc" },
      select: { id: true, name: true, description: true },
    });
  });

export const getOwnershipTypes = publicProcedure
  .input(z.void().optional())
  .query(async () => {
    return prisma.ownershipType.findMany({
      orderBy: { name: "asc" },
      select: { id: true, name: true, description: true },
    });
  });

export const getPropertyPurposes = publicProcedure
  .input(z.void().optional())
  .query(async () => {
    return prisma.propertyPurpose.findMany({
      orderBy: { name: "asc" },
      select: { id: true, name: true, description: true },
    });
  });

export const getRentFrequencies = publicProcedure
  .input(z.void().optional())
  .query(async () => {
    return prisma.rentFrequency.findMany({
      orderBy: { name: "asc" },
      select: { id: true, name: true, description: true },
    });
  });
