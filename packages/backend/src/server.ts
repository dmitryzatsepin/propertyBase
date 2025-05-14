// packages/backend/src/server.ts
import app from './app';
import prisma from './core/utils/prismaClient';

const PORT = process.env.PORT || 3001;
const server = app.listen(PORT, () => {
  console.log(`🚀 Backend server is running on http://localhost:${PORT}`);
  console.log(`🔗 API health check available at http://localhost:${PORT}/api/health`);
  console.log(`🏞️ Locations API available at http://localhost:${PORT}/api/v1/locations`);
});

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
    process.exit(0);
  });

  setTimeout(() => {
    console.error('⚠️ Could not close connections in time, forcefully shutting down.');
    process.exit(1);
  }, 10000);
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM')); // Сигнал от Docker/Kubernetes/etc.
process.on('SIGINT', () => gracefulShutdown('SIGINT'));   // Ctrl+C в терминале