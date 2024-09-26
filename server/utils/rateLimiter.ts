import rateLimit from "express-rate-limit";
export const createRateLimiter = (windowMs: number, limit: number) =>
  rateLimit({
    windowMs,
    max: limit,
    legacyHeaders: false,
    standardHeaders: "draft-7",
  });
