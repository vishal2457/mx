import { Server as HttpServer } from 'http';
import { Server as SocketIOServer, Socket } from 'socket.io';
import { GLOBAL_CONSTANTS } from '../global-constants';

interface ClientMap {
  [userId: string]: string;
}

type EventHandler = (socket: Socket, ...args: any[]) => void;

interface EventConfig {
  event: string;
  handler: EventHandler;
}

class SocketManager {
  private static instance: SocketManager;
  private io: SocketIOServer;
  public clients: ClientMap = {};

  private constructor(server: HttpServer, events: EventConfig[]) {
    this.io = new SocketIOServer(server, {
      cors: {
        origin: '*', // Allow all origins (for development purposes)
        methods: ['GET', 'POST'],
      },
    });

    this.io.on(GLOBAL_CONSTANTS.SOCKET_EVENTS.CONNECTION, (socket) =>
      this.handleConnection(socket, events)
    );
  }

  public static initialize(
    server: HttpServer,
    events: EventConfig[]
  ): SocketManager {
    if (!SocketManager.instance) {
      SocketManager.instance = new SocketManager(server, events);
    }
    return SocketManager.instance;
  }

  private handleConnection(socket: Socket, events: EventConfig[]): void {
    const userId = socket.handshake.query.userId as string;
    if (userId) {
      this.clients[userId] = socket.id;
    }

    events.forEach(({ event, handler }) => {
      socket.on(event, (...args: any[]) => handler(socket, ...args));
    });

    socket.on(GLOBAL_CONSTANTS.SOCKET_EVENTS.DISCONNECT, () => {
      // eslint-disable-next-line no-console
      console.log('User disconnected');
      const userId = Object.keys(this.clients).find(
        (key) => this.clients[key] === socket.id
      );
      if (userId) {
        delete this.clients[userId];
      }
    });
  }

  public sendNotification(userId: string, message: string): void {
    const socketId = this.clients[userId];
    if (socketId) {
      this.io
        .to(socketId)
        .emit(GLOBAL_CONSTANTS.SOCKET_EVENTS.NOTIFICATION, message);
    }
  }
}

export default SocketManager;
