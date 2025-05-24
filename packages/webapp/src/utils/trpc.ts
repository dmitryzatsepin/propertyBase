// packages/webapp/src/utils/trpc.ts
import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "@propertybase/backend/core/trpc/_app"; // Предполагается, что этот импорт работает благодаря TS Paths/References

// Если импорт выше не работает, используй относительный путь (менее надежно)
// import type { AppRouter } from '../../../backend/src/core/trpc/_app';
// ИЛИ временную заглушку из shared
// import type { AppRouter } from '@propertybase/shared/trpc-types';

// Создаем типизированный клиент tRPC для React Query
export const trpc = createTRPCReact<AppRouter>();

// URL твоего tRPC API
// Убедись, что VITE_API_URL установлен в твоем .env файле (например, VITE_API_URL=http://localhost:3001/trpc)
// или замени на жестко закодированный URL для разработки
export const getBaseUrl = () => {
  if (typeof window !== "undefined") {
    // Мы на клиенте
    return import.meta.env.VITE_API_URL || "http://localhost:3001/trpc";
  }
  // Мы на сервере (SSR/SSG), если будет использоваться
  // Здесь может быть другая логика для определения URL
  return import.meta.env.VITE_API_URL_SERVER || "http://localhost:3001/trpc";
};
