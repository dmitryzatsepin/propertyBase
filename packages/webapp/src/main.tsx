// packages/webapp/src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "@mantine/carousel/styles.css";
import "./index.css";

import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";
import "@mantine/notifications/styles.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { trpc, getBaseUrl } from "./utils/trpc"; // Наша утилита tRPC

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Глобальные настройки для react-query, если нужны
      // staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: getBaseUrl(),
      // Ты можешь передавать заголовки здесь, если нужно (например, для авторизации)
      // async headers() {
      //   return {
      //     authorization: getAuthCookie(),
      //   };
      // },
    }),
  ],
  // transformer: SuperJSON, // Если/когда решишь проблему с SuperJSON и включишь его на клиенте и сервере
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <MantineProvider /* твои настройки Mantine theme, если есть */>
          {/* NotificationsProvider, если используешь @mantine/notifications */}
          {/* <Notifications /> */}
          <App />
        </MantineProvider>
      </QueryClientProvider>
    </trpc.Provider>
  </React.StrictMode>
);
