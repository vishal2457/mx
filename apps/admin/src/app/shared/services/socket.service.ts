import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket!: Socket;

  init() {
    this.socket = io(environment.api);
  }

  emit(payload) {
    this.socket.emit(payload);
  }
}
