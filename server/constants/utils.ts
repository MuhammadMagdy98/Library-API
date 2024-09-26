export const FIFTEEN_MINUTES = 15 * 60 * 1000;
export const MAX_REQUESTS = 100;

export const rateLimitSettings = {
  windowMs: FIFTEEN_MINUTES,
  limit: MAX_REQUESTS,
  legacyHeaders: false,
  standardHeaders: "draft-7",
};
