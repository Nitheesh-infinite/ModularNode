import http from "http";
import { parse } from "url";
import { config } from "./config/index.js";
import { handle } from "./app.js";
import { logger } from "./../src/utils/logger.js";

const server = http.createServer(async (req, res) => {
  const { pathname, query } = parse(req.url, true);
  const ctx = {
    method: (req.method || "GET").toUpperCase(),
    pathname: pathname || "/",
    query: query || {}
  };
  try {
    await handle(req, res, ctx);
  } catch (e) {
    logger.error("fatal", e?.stack || e?.message || String(e));
    res.statusCode = 500;
    res.end();
  }
});

server.listen(config.port, () => {
  logger.info(`server listening on http://localhost:${config.port} (${config.env})`);
});