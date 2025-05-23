// packages/backend/src/core/trpc/_app.ts
import { router, publicProcedure } from "./trpc";
// import { dictionaryRouter } from './routers/dictionaryRouter'; // Когда он появится
import { propertyRouter } from "./routers/property"; // Импорт нового propertyRouter

export const appRouter = router({
  property: propertyRouter,
  // dictionary: dictionaryRouter, // Когда появится

  healthcheck: publicProcedure.query(() => "Server is healthy!"),
  // echo процедуру можно удалить, если больше не нужна для тестов
});

export type AppRouter = typeof appRouter;
