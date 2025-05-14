// packages/backend/src/app.ts
import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import locationRoutes from './api/routes/location.routes'; // Импортируем наши маршруты для локаций
// import { globalErrorHandler } from './api/middlewares/errorHandler'; // Для глобальной обработки ошибок (создадим позже)

// Создаем экземпляр Express приложения
const app: Application = express();

// --- Базовые Middlewares ---
// Разрешаем CORS-запросы (настрой более детально для продакшена)
app.use(cors(/* { origin: 'http://localhost:YOUR_FRONTEND_PORT' } */));

// Парсер для JSON-тела запросов
app.use(express.json({ limit: '10mb' })); // Увеличим лимит, т.к. массив локаций может быть большим

// Парсер для URL-encoded данных (если понадобится для форм, но для API обычно JSON)
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// --- Маршруты API ---
// Простой GET-эндпоинт для проверки работоспособности сервера
app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'UP',
    message: 'PropertyBase API is healthy!',
    timestamp: new Date().toISOString(),
  });
});

// Монтируем маршруты для локаций под префиксом /api/v1/locations
app.use('/api/v1/locations', locationRoutes);

// --- Обработка несуществующих маршрутов (404) ---
app.use((req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error); // Передаем в обработчик ошибок
});

// --- Глобальный обработчик ошибок ---
// TODO: Создать и подключить globalErrorHandler
// app.use(globalErrorHandler);
// Временный простой обработчик ошибок
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error("GLOBAL_ERROR_HANDLER:", err.stack);
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode; // Если статус не был установлен, это внутренняя ошибка сервера
  res.status(statusCode).json({
    message: err.message || 'An unexpected error occurred.',
    // stack: process.env.NODE_ENV === 'development' ? err.stack : undefined, // Показываем стек только в разработке
  });
});


export default app;