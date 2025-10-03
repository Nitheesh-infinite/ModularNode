import { badRequest } from "../utils/response.js";

export async function jsonParser(req, res, next) {
  if (req.method === "GET" || req.method === "HEAD") return next();
  const ctype = req.headers["content-type"] || "";
  if (!ctype.includes("application/json")) return next();
  let data = [];
  req.on("data", (chunk) => data.push(chunk));
  req.on("end", () => {
    if (data.length === 0) { req.body = {}; return next(); }
    try {
      req.body = JSON.parse(Buffer.concat(data).toString("utf8"));
      next();
    } catch {
      badRequest(res, "Invalid JSON");
    }
  });
}