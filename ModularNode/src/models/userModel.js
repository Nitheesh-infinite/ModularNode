const store = new Map();

export function createUser({ id, name, email, age }) {
  const user = { id, name, email, ...(age !== undefined ? { age } : {}) };
  store.set(id, user);
  return user;
}

export function getUser(id) {
  return store.get(id) || null;
}

export function listUsers() {
  return Array.from(store.values());
}