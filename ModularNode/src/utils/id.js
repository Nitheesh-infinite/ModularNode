import crypto from "crypto";

export function rid() {
  if (crypto.randomUUID) return crypto.randomUUID();
  return (Date.now().toString(36) + Math.random().toString(36).slice(2, 10)).toUpperCase();
}