// packages/backend/src/core/trpc/routers/propertyRouter.ts
import { router, publicProcedure } from "../trpc";
import prisma from "../../../core/utils/prismaClient";
import { TRPCError } from "@trpc/server";
import { Prisma } from "@prisma/client";
import {
  propertyCreateSchema,
  propertyListSchema,
  propertyByIdSchema,
  // propertyUpdateSchema // для будущей процедуры update
} from "../schemas/property.schemas"; // Импортируем наши схемы
import { preparePropertyCreateData } from "../helpers/property.helpers"; // Импортируем хелпер

export const propertyRouter = router({
  create: publicProcedure
    .input(propertyCreateSchema) // Используем импортированную схему
    .mutation(async ({ input }) => {
      try {
        const dataForPrisma = preparePropertyCreateData(input); // Используем хелпер

        const newProperty = await prisma.property.create({
          data: dataForPrisma,
        });
        return newProperty;
      } catch (error: any) {
        console.error("Failed to create property:", error);
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: `Database error during property creation: ${error.message}`,
            cause: error,
          });
        }
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create property due to an unexpected error.",
          cause: error,
        });
      }
    }),

  list: publicProcedure
    .input(propertyListSchema) // Используем импортированную схему
    .query(async ({ input }) => {
      const limit = input?.limit ?? 10;
      const { cursor } = input ?? {};
      const items = await prisma.property.findMany({
        take: limit + 1,
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: { createdAt: "desc" },
        // TODO: Добавить include для основных данных, если нужно в списке
      });
      let nextCursor: typeof cursor | undefined = undefined;
      if (items.length > limit) {
        const nextItem = items.pop();
        nextCursor = nextItem!.id;
      }
      return { items, nextCursor };
    }),

  getById: publicProcedure
    .input(propertyByIdSchema) // Используем импортированную схему
    .query(async ({ input }) => {
      const property = await prisma.property.findUnique({
        where: { id: input.id },
        // TODO: Раскомментируйте и добавьте нужные include для связанных данных
        // include: { location: true, agent: true, /* ... */ }
      });
      if (!property) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `Property with id '${input.id}' not found`,
        });
      }
      return property;
    }),

  // TODO: Реализовать процедуру update, используя propertyUpdateSchema
  // update: publicProcedure
  //   .input(propertyUpdateSchema)
  //   .mutation(async ({ input }) => {
  //     const { id, ...updateData } = input;
  //     // const dataForPrisma = preparePropertyUpdateData(updateData);
  //     // return prisma.property.update({ where: { id }, data: dataForPrisma });
  //   }),

  // TODO: Реализовать процедуру delete
  // delete: publicProcedure
  //   .input(z.object({ id: z.string().cuid() }))
  //   .mutation(async ({ input }) => {
  //     // return prisma.property.delete({ where: { id: input.id } });
  //   }),
});
