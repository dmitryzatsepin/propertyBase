// packages/backend/src/app.ts
import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import locationRoutes from './api/routes/location.routes';
// import { globalErrorHandler } from './api/middlewares/errorHandler'; // Для глобальной обработки ошибок (создадим позже)

const app: Application = express();

// --- Базовые Middlewares ---
app.use(cors());

// Парсер для JSON-тела запросов
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'UP',
    message: 'PropertyBase API is healthy!',
    timestamp: new Date().toISOString(),
  });
});

app.use('/api/v1/locations', locationRoutes);

app.use((req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error("GLOBAL_ERROR_HANDLER:", err.stack);
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message || 'An unexpected error occurred.',
  });
});


export default app;