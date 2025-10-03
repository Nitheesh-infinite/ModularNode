const isEmail = (s) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);

export function validate(obj, schema) {
  const errors = [];
  for (const [key, rule] of Object.entries(schema)) {
    const optional = rule.endsWith("?");
    const cleanRule = optional ? rule.slice(0, -1) : rule;
    const parts = cleanRule.split("|");
    const type = parts[0];
    const value = obj[key];

    if (value === undefined || value === null) {
      if (!optional) errors.push(`${key} is required`);
      continue;
    }

    switch (type) {
      case "string":
        if (typeof value !== "string") errors.push(`${key} must be a string`);
        break;
      case "int":
        if (!Number.isInteger(value)) errors.push(`${key} must be an integer`);
        break;
      case "email":
        if (typeof value !== "string" || !isEmail(value)) errors.push(`${key} must be a valid email`);
        break;
      default:
        errors.push(`unknown type for ${key}`);
    }

    for (const p of parts.slice(1)) {
      if (p.startsWith("min:")) {
        const n = Number(p.slice(4));
        if (typeof value === "string" && value.length < n) errors.push(`${key} min length ${n}`);
        if (Number.isInteger(value) && value < n) errors.push(`${key} min ${n}`);
      } else if (p.startsWith("max:")) {
        const n = Number(p.slice(4));
        if (typeof value === "string" && value.length > n) errors.push(`${key} max length ${n}`);
        if (Number.isInteger(value) && value > n) errors.push(`${key} max ${n}`);
      }
    }
  }
  return { ok: errors.length === 0, errors };
}