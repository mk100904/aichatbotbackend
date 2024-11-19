import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createServer } from 'http';
import { Server } from 'socket.io';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const port = process.env.PORT ?? 3000;

  const server = createServer(app.getHttpAdapter().getInstance());

  const io = new Server(server, {
    cors: {
      origin: '*',
    },
  });

  io.on('connection', (socket) => {
    console.log('Client Connected:', socket.id);
  });

  // Start the server
  await server.listen(port);
  console.log(`Application is running on http://localhost:${port}`);
}
bootstrap();
