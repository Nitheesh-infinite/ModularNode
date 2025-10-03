import { registerUsers } from "./users.js";
import { registerHealth } from "./health.js";

export function registerAll(router) {
  registerHealth(router);
  registerUsers(router);
}