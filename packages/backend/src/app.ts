// packages/backend/src/app.ts
import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import * as trpcExpress from "@trpc/server/adapters/express";
import { appRouter } from "./core/trpc/_app";
// import locationRoutes from "./api/routes/location.routes"; // Закомментировано
import { createTRPCContext } from "./core/trpc/trpc";
import dotenv from "dotenv";

dotenv.config();

const app: Application = express();

const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";
console.log("--- Configuring CORS for origin:", frontendUrl, "---");

app.use(
  cors({
    origin: frontendUrl,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD", "OPTIONS"], // Явно перечислим методы
    allowedHeaders: ["Content-Type", "Authorization"], // Явно перечислим заголовки
    credentials: true,
    optionsSuccessStatus: 204,
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext: createTRPCContext,
    onError: (opts) => {
      const { error, req } = opts;
      console.error("tRPC Error:", error);
      if (error.code === "INTERNAL_SERVER_ERROR") {
        console.error("Unhandled error on tRPC:", error);
      }
      if (req) {
      }
    },
  })
);

app.get("/api/health", (req: Request, res: Response) => {
  res.status(200).json({
    status: "UP",
    message: "PropertyBase API is healthy!",
    timestamp: new Date().toISOString(),
  });
});

// app.use("/api/v1/locations", locationRoutes); // Закомментировано

// Обработчик 404
app.use((req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
});

// Глобальный обработчик ошибок
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error("GLOBAL_ERROR_HANDLER:", err.stack);
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode; // Если статус уже установлен (например, 404), используем его
  res.status(statusCode).json({
    message: err.message || "An unexpected error occurred.",
    // В режиме разработки можно добавить err.stack
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
});

export default app;
