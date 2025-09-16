import { Server } from 'socket.io';
import type { Server as HTTPServer } from 'http';

export function initializeSocketIo(httpServer: HTTPServer): Server {
  const io = new Server(httpServer, {
    cors: { origin: '*', methods: ['GET', 'POST'] }
  });

  const chat = io.of('/chat');
  chat.on('connection', (socket) => {
    socket.on('joinRoom', (roomId: string) => {
      socket.join(roomId);
    });
    socket.on('message', ({ roomId, text }: { roomId: string; text: string }) => {
      chat.to(roomId).emit('message', { senderId: socket.id, text, ts: Date.now() });
    });
  });

  return io;
}


