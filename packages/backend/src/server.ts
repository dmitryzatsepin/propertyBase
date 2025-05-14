// packages/backend/src/server.ts
import app from './app'; // Импортируем наше Express приложение из app.ts
import prisma from './core/utils/prismaClient'; // Импортируем Prisma Client для graceful shutdown

const PORT = process.env.PORT || 3001; // Используем переменную окружения PORT или 3001 по умолчанию

const server = app.listen(PORT, () => {
  console.log(`🚀 Backend server is running on http://localhost:${PORT}`);
  console.log(`🔗 API health check available at http://localhost:${PORT}/api/health`);
  console.log(`🏞️ Locations API available at http://localhost:${PORT}/api/v1/locations`);
});

// --- Graceful Shutdown ---
// Эта часть важна для корректного закрытия соединений, особенно с базой данных

const gracefulShutdown = async (signal: string) => {
  console.log(`\n👋 Received ${signal}. Shutting down gracefully...`);
  server.close(async () => {
    console.log('✅ HTTP server closed.');
    try {
      await prisma.$disconnect();
      console.log('🔌 Prisma Client disconnected.');
    } catch (e) {
      console.error('❌ Error disconnecting Prisma Client:', e);
    }
    process.exit(0); // Выход с кодом 0 (успех)
  });

  // Если сервер не закрывается в течение определенного времени, принудительно завершить
  setTimeout(() => {
    console.error('⚠️ Could not close connections in time, forcefully shutting down.');
    process.exit(1); // Выход с кодом 1 (ошибка)
  }, 10000); // 10 секунд таймаут
};

// Слушаем сигналы для graceful shutdown
process.on('SIGTERM', () => gracefulShutdown('SIGTERM')); // Сигнал от Docker/Kubernetes/etc.
process.on('SIGINT', () => gracefulShutdown('SIGINT'));   // Ctrl+C в терминале