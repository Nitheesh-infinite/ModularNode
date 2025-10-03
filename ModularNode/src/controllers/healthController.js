import { ok } from "../utils/response.js";
export async function health(req, res) {
  ok(res, { status: "ok" });
}