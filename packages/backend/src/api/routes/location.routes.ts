// packages/backend/src/api/routes/location.routes.ts
import { Router } from 'express';
import { LocationController } from '../controllers/location.controller';
// import { validate } from '../middlewares/validateRequest'; // Middleware для валидации (создадим позже)
// import { createLocationsSchema } from '../validators/location.validators'; // Схема Zod (создадим позже)

const router = Router();

router.post(
  '/',
  LocationController.createMultipleLocations
);

router.get(
  '/',
  LocationController.getAllLocations
);

export default router;