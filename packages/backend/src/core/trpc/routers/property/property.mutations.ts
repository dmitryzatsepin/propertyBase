import { publicProcedure } from "../../trpc";
import {
  propertyCreateSchema,
  propertyUpdateSchema,
} from "../../schemas/property";
import {
  preparePropertyCreateData,
  preparePropertyUpdateData,
} from "../../helpers/property";
import prisma from "../../../../core/utils/prismaClient";
import { Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const create = publicProcedure
  .input(propertyCreateSchema)
  .mutation(async ({ input }) => {
    try {
      const dataForPrisma = preparePropertyCreateData(input);
      const newProperty = await prisma.property.create({
        data: dataForPrisma,
      });
      return newProperty;
    } catch (error: any) {
      console.error("Failed to create property:", error);
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: `Database error (create): ${error.message.split("\n").pop()}`,
          cause: error,
        });
      }
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to create property.",
        cause: error,
      });
    }
  });

export const update = publicProcedure
  .input(propertyUpdateSchema)
  .mutation(async ({ input }) => {
    const { id, ...updatePayload } = input;
    try {
      const existingProperty = await prisma.property.findUnique({
        where: { id },
      });
      if (!existingProperty) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `Property with id '${id}' not found.`,
        });
      }
      const dataToUpdate = preparePropertyUpdateData(updatePayload);
      if (Object.keys(dataToUpdate).length === 0) return existingProperty;

      const updatedProperty = await prisma.property.update({
        where: { id },
        data: dataToUpdate,
      });
      return updatedProperty;
    } catch (error: any) {
      console.error(`Failed to update property with id ${id}:`, error);
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: `Database error during property update: ${error.message.split("\n").pop()}`,
          cause: error,
        });
      }
      if (error instanceof TRPCError) throw error;
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to update property due to an unexpected error.",
        cause: error,
      });
    }
  });

export const deleteProperty = publicProcedure
  .input(z.object({ id: z.string().cuid("Invalid Property ID format") }))
  .mutation(async ({ input }) => {
    const { id } = input;
    try {
      const deletedProperty = await prisma.property.delete({
        where: { id },
      });
      return {
        id: deletedProperty.id,
        message: "Property deleted successfully",
      };
    } catch (error: any) {
      console.error(`Failed to delete property with id ${id}:`, error);
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2025") {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: `Property with id '${id}' not found for deletion.`,
            cause: error,
          });
        }
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: `Database error during property deletion: ${error.message.split("\n").pop()}`,
          cause: error,
        });
      }
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to delete property due to an unexpected error.",
        cause: error,
      });
    }
  });
