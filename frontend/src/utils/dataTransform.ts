export function transformKeysToCamelCase(input: unknown): unknown {
  if (Array.isArray(input)) {
    return input.map((item) => transformKeysToCamelCase(item));
  } else if (typeof input === "object" && input !== null) {
    const transformed: Record<string, unknown> = {};
    for (const key in input) {
      if (Object.prototype.hasOwnProperty.call(input, key)) {
        const keyLowerCase = key.replace(/^([A-Z])/g, (_, letter) =>
          letter.toLowerCase()
        );
        const newKey = keyLowerCase.replace(/_([a-z])/g, (_, letter) =>
          letter.toUpperCase()
        );
        transformed[newKey] = transformKeysToCamelCase(
          (input as Record<string, unknown>)[key]
        );
      }
    }
    return transformed;
  }
  return input;
}

export function transformKeysToSnakeCase(input: unknown): unknown {
  if (Array.isArray(input)) {
    return input.map((item) => transformKeysToSnakeCase(item));
  } else if (typeof input === "object" && input !== null) {
    const transformed: Record<string, unknown> = {};
    for (const key in input) {
      if (Object.prototype.hasOwnProperty.call(input, key)) {
        const newKey = key.replace(/([A-Z])/g, "_$1").toLowerCase();
        transformed[newKey] = transformKeysToSnakeCase(
          (input as Record<string, unknown>)[key]
        );
      }
    }
    return transformed;
  }
  return input;
}
