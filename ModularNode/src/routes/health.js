import { withErrorHandling } from "../middleware/errorHandler.js";
import { health } from "../controllers/healthController.js";

export function registerHealth(router) {
  router.add("GET", "/health", withErrorHandling(health));
}