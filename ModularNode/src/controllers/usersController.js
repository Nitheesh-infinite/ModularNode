import { ok, created, notFound } from "../utils/response.js";
import * as svc from "../services/usersService.js";

export async function list(req, res) {
  ok(res, { data: svc.listAll() });
}

export async function create(req, res) {
  const user = svc.createOne(req.body);
  created(res, { data: user });
}

export async function get(req, res) {
  const user = svc.findOne(req.params.id);
  if (!user) return notFound(res, "User not found");
  ok(res, { data: user });
}