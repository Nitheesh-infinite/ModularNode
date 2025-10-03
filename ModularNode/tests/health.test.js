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

test("health ok", async () => {
  const res = await req("/health");
  assert.equal(res.status, 200);
  assert.equal(res.body.status, "ok");
});