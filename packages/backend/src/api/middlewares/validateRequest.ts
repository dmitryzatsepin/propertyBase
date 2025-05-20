// packages/backend/src/api/middlewares/validateRequest.ts
import { Request, Response, NextFunction } from 'express';
import { ZodError, z } from 'zod';

/**
 * Middleware для валидации тела запроса (req.body) с использованием предоставленной Zod-схемы.
 * @param schema - Zod-схема для валидации.
 */
export const validateRequestBody =
(schema: z.ZodTypeAny) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const validationErrors = error.errors.map((err) => ({
          path: err.path.join('.'),
          message: err.message,
        }));
        
        console.warn('VALIDATION_MW: Validation failed:', validationErrors);
        res.status(400).json({
          message: 'Validation failed',
          errors: validationErrors,
        });
      } else {
        console.error('VALIDATION_MW: Unexpected error during validation:', error);
        next(error);
      }
    }
  };