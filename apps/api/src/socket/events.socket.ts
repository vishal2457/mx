import { Server as SocketIOServer } from 'socket.io';
import { GLOBAL_CONSTANTS } from '../shared/global-constants';

export const registerSocketEvents = (io: SocketIOServer): void => {
  io.on(GLOBAL_CONSTANTS.SOCKET_EVENTS.CONNECTION, (socket) => {
    // eslint-disable-next-line no-console
    console.log(socket.id + ' connected');
    // user connected
    socket.on(GLOBAL_CONSTANTS.SOCKET_EVENTS.DISCONNECT, () => {
      // eslint-disable-next-line no-console
      console.log(socket.id + ' disconnected');
      // user disconnected
    });
  });
};
