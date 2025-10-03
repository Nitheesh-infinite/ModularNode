export function send(res, status, data, headers = {}) {
  const body = JSON.stringify(data);
  res.writeHead(status, { "Content-Type": "application/json", "Content-Length": Buffer.byteLength(body), ...headers });
  res.end(body);
}

export function ok(res, data, headers = {}) { send(res, 200, data, headers); }
export function created(res, data, headers = {}) { send(res, 201, data, headers); }
export function badRequest(res, message, code = "BAD_REQUEST") { send(res, 400, { error: { message, code } }); }
export function notFound(res, message = "Not Found") { send(res, 404, { error: { message, code: "NOT_FOUND" } }); }
export function internal(res, message = "Internal Server Error") { send(res, 500, { error: { message, code: "INTERNAL" } }); }