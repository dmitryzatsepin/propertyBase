// packages/backend/src/minimal_server.ts
import express from "express";
import * as trpcExpress from "@trpc/server/adapters/express";
import { initTRPC } from "@trpc/server";
import { z } from "zod";
import cors from "cors";

const t = initTRPC.create();
const publicProcedure = t.procedure;
const router = t.router;

const appRouter = router({
  echo: publicProcedure
    .input(z.object({ text: z.string() }))
    .mutation(({ input }) => {
      console.log("MINIMAL SERVER - Received input:", input);
      return { echoedText: `Minimal server says: ${input.text}` };
    }),
});

const app = express();

app.use(cors()); // Базовый CORS
app.use(express.json()); // Базовый JSON парсер

// Лог прямо перед tRPC middleware
app.use("/trpc", (req, _res, next) => {
  console.log(
    "MINIMAL SERVER - Request to /trpc. Body:",
    req.body,
    "Headers:",
    req.headers["content-type"]
  );
  next();
});

app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext: () => ({}), // Простейший контекст
  })
);

const port = 3002; // Используем другой порт, чтобы не конфликтовать
app.listen(port, () => {
  console.log(
    `🚀 Minimal tRPC server listening on http://localhost:${port}/trpc`
  );
});
