// packages/backend/src/core/trpc/_app.ts
import { router, publicProcedure } from "./trpc";
import { dictionaryRouter } from "./routers/dictionary";
import { propertyRouter } from "./routers/property";

export const appRouter = router({
  property: propertyRouter,
  dictionary: dictionaryRouter,

  healthcheck: publicProcedure.query(() => "Server is healthy!"),
});

export type AppRouter = typeof appRouter;
