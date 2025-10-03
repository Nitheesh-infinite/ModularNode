import { withErrorHandling } from "../middleware/errorHandler.js";
import { validateBody } from "../middleware/validate.js";
import * as users from "../controllers/usersController.js";

const createUserSchema = {
  name: "string|min:1|max:64",
  email: "email",
  age: "int|min:0|max:130?"
};

export function registerUsers(router) {
  router.add("GET", "/v1/users", withErrorHandling(users.list));
  router.add("POST", "/v1/users",
    validateBody(createUserSchema),
    withErrorHandling(users.create)
  );
  router.add("GET", "/v1/users/:id", withErrorHandling(users.get));
}