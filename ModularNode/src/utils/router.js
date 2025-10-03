import { notFound } from "../utils/response.js";

export class Router {
  constructor() {
    this.routes = [];
  }

  add(method, pattern, ...handlers) {
    const keys = [];
    const regex = new RegExp("^" + pattern.replace(/:[^/]+/g, (m) => {
      keys.push(m.slice(1));
      return "([^/]+)";
    }) + "$");
    this.routes.push({ method: method.toUpperCase(), regex, keys, handlers });
  }

  async handle(req, res, ctx) {
    const { method, pathname } = ctx;
    for (const r of this.routes) {
      if (r.method !== method) continue;
      const m = pathname.match(r.regex);
      if (!m) continue;

      req.params = {};
      r.keys.forEach((k, i) => (req.params[k] = decodeURIComponent(m[i + 1])));

      let i = 0;
      const next = async (err) => {
        if (err) throw err;
        const fn = r.handlers[i++];
        if (!fn) return;
        await fn(req, res, next);
      };
      try {
        await next();
      } catch (e) {
        throw e;
      }
      return;
    }
    notFound(res);
  }
}