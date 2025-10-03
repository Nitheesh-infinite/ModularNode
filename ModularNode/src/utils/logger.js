function ts() {
  return new Date().toISOString();
}

export const logger = {
  info: (...args) => console.log(ts(), "INFO", ...args),
  error: (...args) => console.error(ts(), "ERROR", ...args),
  warn: (...args) => console.warn(ts(), "WARN", ...args),
  debug: (...args) => console.debug(ts(), "DEBUG", ...args)
};