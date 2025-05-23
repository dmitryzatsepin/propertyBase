// packages/backend/src/core/trpc/root.ts
import { router, publicProcedure } from "./trpc";
import { z } from "zod";
import { propertyRouter } from "./routers/propertyRouter"; // Раскомментируем propertyRouter

export const appRouter = router({
  property: propertyRouter, // Подключаем propertyRouter

  // Тестовая процедура echo (можно оставить для отладки или удалить)
  echo: publicProcedure
    .input(
      z.object({
        text: z.string(),
      })
    )
    .mutation(({ input }) => {
      console.log("ECHO procedure called with input:", input);
      return {
        echoedText: `Server echoes: ${input.text}`,
        receivedAt: new Date().toISOString(),
      };
    }),

  healthcheck: publicProcedure.query(() => "Server is healthy!"),
});

export type AppRouter = typeof appRouter;
