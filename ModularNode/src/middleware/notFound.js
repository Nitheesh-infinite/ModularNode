import { notFound } from "../utils/response.js";

export function notFoundHandler(req, res) {
  notFound(res);
}