import { internal } from "../utils/response.js";
import { logger } from "../utils/logger.js";

export function withErrorHandling(fn) {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (e) {
      logger.error(req.id, e?.stack || e?.message || String(e));
      internal(res);
    }
  };
}