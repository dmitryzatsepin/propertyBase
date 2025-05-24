// packages/backend/src/api/routes/location.routes.ts
import { Router } from "express";
import { LocationController } from "../controllers/location.controller";
import { validateRequestBody } from "../middlewares/validateRequest";
import { createManyLocationsSchema } from "../validators/location.validators"; // Схема Zod (создадим позже)

const router: Router = Router();

router.post(
  "/",
  validateRequestBody(createManyLocationsSchema),
  LocationController.createMultipleLocations
);

router.get("/", LocationController.getAllLocations);

export default router;
