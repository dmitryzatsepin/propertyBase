// packages/backend/src/core/trpc/schemas/property/query.schema.ts
import { z } from "zod";

export const propertyListSchema = z
  .object({
    limit: z.number().min(1).max(100).nullish(),
    cursor: z.string().cuid().nullish(),
  })
  .optional();

export const propertyByIdSchema = z.object({
  id: z.string().cuid(),
});
