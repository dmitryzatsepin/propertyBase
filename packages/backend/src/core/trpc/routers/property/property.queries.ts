import { publicProcedure } from "../../trpc";
import {
  propertyListSchema,
  propertyByIdSchema,
} from "../../schemas/property.schemas";
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
      // TODO: include: { /* необходимые поля для списка */ }
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
      // TODO: include: { /* все необходимые связанные данные */ }
    });
    if (!property) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: `Property with id '${input.id}' not found`,
      });
    }
    return property;
  });
