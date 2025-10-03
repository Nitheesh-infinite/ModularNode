import { logger } from "../utils/logger.js";

export function requestLogger() {
  return async (req, res, next) => {
    const start = Date.now();
    const end = res.end;
    res.end = function (...args) {
      const ms = Date.now() - start;
      logger.info(`${req.id} ${req.method} ${req.url} ${res.statusCode} ${ms}ms`);
      end.apply(this, args);
    };
    next();
  };
}