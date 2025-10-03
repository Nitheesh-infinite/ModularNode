import { validate } from "../utils/schema.js";
import { badRequest } from "../utils/response.js";

export function validateBody(schema) {
  return (req, res, next) => {
    const { ok, errors } = validate(req.body || {}, schema);
    if (!ok) return badRequest(res, errors.join(", "));
    next();
  };
}