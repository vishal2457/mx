import { Server as HttpServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import { registerSocketEvents } from './events.socket';

export const initializeSocket = (server: HttpServer): SocketIOServer => {
  const io = new SocketIOServer(server, {
    cors: {
      origin: '*', // Allow all origins (for development purposes)
      methods: ['GET', 'POST'],
    },
  });

  registerSocketEvents(io);

  return io;
};
