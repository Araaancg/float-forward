import httpStatus from "http-status";
import express, { Response, Request, NextFunction } from "express";
import {
  ApiError,
  errorConverter,
  errorHandler,
} from "./common/middlewares/error-handler";
import { initializeDatabase } from "./common/mongodb-init";
import { isProd } from "./common/config";
import routes from "./common/routes";

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
    res.status(200).send({ status: true });
  });

  // API routes
  app.use("/api/v1", routes());

  // Catch-all 404 handler
  app.use((req: Request, res: Response, next: NextFunction) => {
    next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
  });

  // Error handling middleware
  app.use(errorConverter());
  app.use(errorHandler(isProd));

  return app;
};
