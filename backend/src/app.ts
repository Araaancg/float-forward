import httpStatus from "http-status";
import express, { Response, Request, NextFunction } from "express";
import http from 'http';
import {
  ApiError,
  errorConverter,
  errorHandler,
} from "./common/middlewares/error-handler";
import { initializeDatabase } from "./common/mongodb-init";
import { isProd } from "./common/config";
import routes from "./common/routes";
import { Server } from "socket.io";

export let io: Server;

export const init = async () => {
  const app = express();

  // Initialize Database connection and models
  await initializeDatabase();

  // Middleware setup
  app.use(express.json()); // Parse JSON bodies
  app.use(express.urlencoded({ extended: false })); // Parse URL-encoded bodies

  // Rate-limiting middleware (only in production)
  // if (isProd) {
  //   app.use('/v1', rateLimiter());
  // }

  // Example status route for health-check
  app.get("/status", async (req, res) => {
    res.status(200).send({ status: "Active and ready to receive requests, LET'S GO!" });
  });

  // API routes
  app.use("/api/v1", routes());

  // Catch-all 404 handler
  app.use((req: Request, res: Response, next: NextFunction) => {
    next(new ApiError(httpStatus.NOT_FOUND, "Route not found"));
  });

  // Error handling middleware
  app.use(errorConverter());
  app.use(errorHandler(isProd));

  return app;
};

export const setupSocketIO = (server: http.Server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
      credentials: true
    }
  });
  
  io.on("connection", (socket) => {
    console.log('Client connected:', socket.id);
    socket.on('send_message', (data) => {
      console.log('Message received:', data);
      // Broadcast to everyone in the room except sender
      socket.to(data.room).emit('receive_message', data);
      
      // Here you would typically call your chat service
      // chatService.saveMessage(data);
    });
  });
  
  return io;
};

export const getIO = () => {
  if (!io) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Socket.IO not initialized");
  }
  return io;
};