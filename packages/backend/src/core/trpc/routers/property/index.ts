// packages/backend/src/core/trpc/routers/property/index.ts
import { router } from "../../trpc";
import * as queries from "./property.queries";
import * as mutations from "./property.mutations";

export const propertyRouter = router({
  // Queries
  list: queries.list,
  getById: queries.getById,

  // Mutations
  create: mutations.create,
  update: mutations.update,
  delete: mutations.deleteProperty,
});
