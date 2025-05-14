// packages/backend/src/api/routes/location.routes.ts
import { Router } from 'express';
import { LocationController } from '../controllers/location.controller';
// import { validate } from '../middlewares/validateRequest'; // Middleware для валидации (создадим позже)
// import { createLocationsSchema } from '../validators/location.validators'; // Схема Zod (создадим позже)

const router = Router();

// Определяем маршруты для локаций

// POST /api/v1/locations - для создания множества локаций
// Когда будет валидация: router.post('/', validate(createLocationsSchema), LocationController.createMultipleLocations);
router.post(
  '/',
  LocationController.createMultipleLocations
);

// GET /api/v1/locations - для получения всех локаций
router.get(
  '/',
  LocationController.getAllLocations
);

// TODO: Добавить другие маршруты по мере необходимости (например, GET /:id, PUT /:id, DELETE /:id)

export default router;