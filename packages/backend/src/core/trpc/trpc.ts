// packages/backend/src/core/trpc/trpc.ts
import { initTRPC, TRPCError } from "@trpc/server";
// import SuperJSON from 'superjson'; // SuperJSON пока отключен
import { ZodError } from "zod";

// Определяем простой контекст, если он вам не нужен более сложным на данном этапе
export interface Context {
  // userId?: string; // Пример, если будет аутентификация
  // prisma: PrismaClient; // Можно передавать PrismaClient, если не хотите импортировать его в каждом роутере
}

export const createTRPCContext = async (): Promise<Context> => {
  // Здесь можно будет получать данные пользователя из запроса для защищенных процедур
  return {
    // prisma, // Если решите передавать prisma через контекст
  };
};

const t = initTRPC.context<Context>().create({
  // transformer: SuperJSON, // SuperJSON пока отключен
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

export const router = t.router;
export const publicProcedure = t.procedure;

// Заготовка для защищенных процедур, если понадобится аутентификация
// export const protectedProcedure = t.procedure.use(
//   t.middleware(async ({ ctx, next }) => {
//     if (!ctx.userId) { // Пример проверки аутентификации
//       throw new TRPCError({ code: 'UNAUTHORIZED' });
//     }
//     return next({ ctx });
//   })
// );
