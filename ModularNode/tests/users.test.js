import test from "node:test";
import assert from "node:assert";
import http from "node:http";
import { config } from "../src/config/index.js";
import "../src/server.js";

function req(path, method = "GET", data) {
  return new Promise((resolve, reject) => {
    const body = data ? JSON.stringify(data) : null;
    const opt = {
      hostname: "localhost",
      port: config.port,
      path,
      method,
      headers: body ? { "Content-Type": "application/json", "Content-Length": Buffer.byteLength(body) } : {}
    };
    const r = http.request(opt, (res) => {
      let chunks = [];
      res.on("data", (c) => chunks.push(c));
      res.on("end", () => {
        const txt = Buffer.concat(chunks).toString("utf8");
        resolve({ status: res.statusCode, body: txt ? JSON.parse(txt) : {} });
      });
    });
    r.on("error", reject);
    if (body) r.write(body);
    r.end();
  });
}

test("users lifecycle", async () => {
  // list empty
  let res = await req("/v1/users");
  assert.equal(res.status, 200);
  assert.ok(Array.isArray(res.body.data));
  const before = res.body.data.length;

  // create
  res = await req("/v1/users", "POST", { name: "Ava", email: "ava@example.com", age: 23 });
  assert.equal(res.status, 201);
  const id = res.body.data.id;
  assert.ok(id);

  // get
  res = await req(`/v1/users/${id}`);
  assert.equal(res.status, 200);
  assert.equal(res.body.data.name, "Ava");

  // list grows
  res = await req("/v1/users");
  assert.equal(res.body.data.length, before + 1);
});

test("validation works", async () => {
  const res = await req("/v1/users", "POST", { name: "", email: "nope" });
  assert.equal(res.status, 400);
  assert.ok(res.body.error);
});