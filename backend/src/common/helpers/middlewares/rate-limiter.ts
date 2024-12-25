import rateLimit from "express-rate-limit";

export const rateLimiter = (
  windowMs = 1 * 60 * 1000,
  max = 60,
  skipSuccessfulRequests = true
) =>
  rateLimit({
    windowMs,
    max,
    skipSuccessfulRequests,
  });
