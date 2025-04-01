import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const initializeSocket = (userId: string) => {
  if (socket) return socket;
  
  socket = io("http://localhost:8000", {
    query: { userId },
  });

  socket.on("connect", () => {
    console.log("Connected to socket server");
  });

  socket.on("disconnect", () => {
    console.log("Disconnected from socket server");
  });

  return socket;
};

export const getSocket = (): Socket => {
  if (!socket) {
    throw new Error("Socket not initialized. Call initializeSocket first.");
  }
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};