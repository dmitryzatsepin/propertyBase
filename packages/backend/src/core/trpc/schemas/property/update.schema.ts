// packages/backend/src/core/trpc/schemas/property/update.schema.ts
import { z } from "zod";
import { propertyBaseSchema } from "./base.schema";

export const propertyUpdateSchema = propertyBaseSchema.partial().extend({
  id: z.string().cuid("Property ID is required for update"),
  locationId: z.string().cuid("Invalid Location ID format").optional(),
});

export type PropertyUpdateInput = z.infer<typeof propertyUpdateSchema>;
