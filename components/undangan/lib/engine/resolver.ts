export type DataSourceMap = Record<string, unknown>;

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const isValidValue = (value: unknown) => value !== undefined && value !== null && value !== "";

export function getDeepValue(object: unknown, path: string): unknown {
  if (!path) return object;

  return path.split(".").reduce<unknown>((current, key) => {
    if (!isRecord(current)) return undefined;
    return current[key];
  }, object);
}

export function setDeepValue<T extends Record<string, unknown>>(object: T, path: string, value: unknown): T {
  const keys = path.split(".").filter(Boolean);
  if (keys.length === 0) return object;

  const next = structuredClone(object) as Record<string, unknown>;
  let cursor: Record<string, unknown> = next;

  keys.forEach((key, index) => {
    if (index === keys.length - 1) {
      cursor[key] = value;
      return;
    }

    const existing = cursor[key];
    if (!isRecord(existing)) cursor[key] = {};
    cursor = cursor[key] as Record<string, unknown>;
  });

  return next as T;
}

export function resolveValue(paths: string[], sources: DataSourceMap): unknown {
  for (const path of paths) {
    const [sourceName, ...valuePath] = path.split(".");
    if (!sourceName || valuePath.length === 0) continue;

    const source = sources[sourceName];
    const value = getDeepValue(source, valuePath.join("."));
    if (isValidValue(value)) return value;
  }

  return undefined;
}
