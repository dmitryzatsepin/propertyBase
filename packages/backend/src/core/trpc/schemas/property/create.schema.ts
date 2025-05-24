// packages/backend/src/core/trpc/schemas/property/create.schema.ts
import { z } from "zod";
import { propertyBaseSchema } from "./base.schema";

export const propertyCreateSchema = propertyBaseSchema.extend({
  agentId: z.string().cuid("Invalid Agent ID format"),
  locationId: z.string().cuid("Invalid Location ID format"),
});

export type PropertyCreateInput = z.infer<typeof propertyCreateSchema>;
