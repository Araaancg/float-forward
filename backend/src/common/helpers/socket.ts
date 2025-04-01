// src/socket.ts (or wherever your server files are located)
import { Server } from "socket.io";
import http from "http";

const userSocketMap: Record<string, string> = {}; // {userId: socketId}

export const getReceiverSocketId = (receiverId: string): string | undefined => {
  return userSocketMap[receiverId];
};

let io: Server;

export const initializeSocket = (server: http.Server) => {
  io = new Server(server, {
    cors: {
      origin: ["http://localhost:3000"],
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("\n\na user connected", socket.id);

    const userId = socket.handshake.query.userId;
    if (userId !== "undefined") userSocketMap[userId as string] = socket.id;

    // io.emit() is used to send events to all the connected clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("sendMessage", (messageData) => {
      const { receiverId } = messageData;
      const receiverSocketId = getReceiverSocketId(receiverId);

      if (receiverSocketId) {
        // Send to specific user
        socket.to(receiverSocketId).emit("newMessage", messageData);
      }

      // Send back to sender (for their own chat window)
      socket.emit("newMessage", messageData);
    });

    // socket.on() is used to listen to the events. can be used both on client and server side
    socket.on("disconnect", () => {
      console.log("user disconnected", socket.id);
      delete userSocketMap[userId as string];
      io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
  });

  return io;
};

export const getIO = (): Server => {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }
  return io;
};
