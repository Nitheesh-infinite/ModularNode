import { Router } from "./utils/router.js";
import { jsonParser } from "./middleware/jsonParser.js";
import { requestLogger } from "./middleware/requestLogger.js";
import { notFoundHandler } from "./middleware/notFound.js";
import { registerAll } from "./routes/index.js";
import { rid } from "./utils/id.js";

const router = new Router();

export async function handle(req, res, ctx) {
  // Attach request id + basic context
  req.id = rid();
  req.ctx = ctx;

  // Simple middleware pipeline
  const fns = [
    requestLogger(),
    jsonParser,
    (rq, rs, next) => router.handle(rq, rs, ctx).then(() => next()).catch(next),
    notFoundHandler
  ];

  let i = 0;
  const next = async (err) => {
    if (err) throw err;
    const fn = fns[i++];
    if (!fn) return;
    await fn(req, res, next);
  };
  await next();
}

// Register routes once
registerAll(router);