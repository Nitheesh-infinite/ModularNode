# ModularNode

A compact, modular Node.js web server using only core modules (`http`, `url`, etc.).  
It includes a tiny router, middleware pipeline, request IDs + logging, input validation, and centralized error handling.

## Features
- Lightweight router with path params (`/v1/users/:id`)
- Middleware pipeline: JSON parser, request logger, validator, 404 + error handler
- Request ID and structured logs for traceability
- Input validation with a tiny schema DSL (string/int/email, min/max)
- Layered structure: routes → controllers → services → models
- No external dependencies (Node 18+)

## Endpoints
- `GET /health` – liveness check
- `GET /v1/users` – list users
- `POST /v1/users` – create user `{ name, email, age? }`
- `GET /v1/users/:id` – fetch a user

## Quick start
```bash
# Node 18+
node -v

# run
npm run dev
# or
node src/server.js
```

Server listens on `PORT` env var or `3000` by default.

## Project layout
```
src/
  config/
  controllers/
  middleware/
  models/
  routes/
  services/
  utils/
tests/
```

## Validation schema
See `src/routes/users.js`:
```js
const createUserSchema = {
  name: "string|min:1|max:64",
  email: "email",
  age: "int|min:0|max:130?"
};
```
The `?` suffix makes a field optional.

## Notes
- Data is in-memory for demo purposes.
- Logs are plain text with timestamps and a request id.
- Keep/extend as needed for your use case.