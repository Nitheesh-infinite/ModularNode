import { createUser, getUser, listUsers } from "../models/userModel.js";
import { rid } from "../utils/id.js";

export function listAll() {
  return listUsers();
}

export function createOne({ name, email, age }) {
  const id = rid();
  return createUser({ id, name, email, age });
}

export function findOne(id) {
  return getUser(id);
}