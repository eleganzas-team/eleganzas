import { getDeepValue, setDeepValue, resolveValue } from "./resolver";

export type EditorMode = "editor" | "preview" | "publish";

export type ThemeMapping = Record<string, readonly string[]>;

export type GeneratedData = {
  data: Record<string, unknown>;
  metadata?: {
    modifiedFields: string[];
    defaultFields: string[];
  };
};

/**
 * Generates merged data for different modes
 * 
 * @param mode - The mode: 'editor', 'preview', or 'publish'
 * @param defaultData - The template's default data
 * @param userConfig - The user's configuration data from database
 * @param mapping - The field mapping defining data sources
 * @returns Generated data appropriate for the mode
 */
export function generateData(
  mode: EditorMode,
  defaultData: Record<string, unknown>,
  userConfig: Record<string, unknown>,
  mapping: ThemeMapping
): GeneratedData {
  const sources = { user: userConfig, default: defaultData };
  const modifiedFields: string[] = [];
  const defaultFields: string[] = [];
  const result: Record<string, unknown> = {};

  // Process each field in the mapping
  for (const [fieldKey, paths] of Object.entries(mapping)) {
    // Resolve value from sources (user first, then default)
    const value = resolveValue([...paths], sources);
    
    // Track which source was used
    const userPath = paths.find((p) => p.startsWith("user."));
    const defaultPath = paths.find((p) => p.startsWith("default."));
    
    if (userPath && isValidValue(getDeepValue(userConfig, userPath.replace(/^user\./, "")))) {
      modifiedFields.push(fieldKey);
    } else if (defaultPath) {
      defaultFields.push(fieldKey);
    }

    // Set the value in the result using the field key
    setValueAtPath(result, fieldKey, value);
  }

  // For editor mode, include metadata about modified fields
  if (mode === "editor") {
    return {
      data: result,
      metadata: {
        modifiedFields,
        defaultFields,
      },
    };
  }

  // For preview and publish modes, return just the merged data
  return {
    data: result,
  };
}

/**
 * Checks if a value is valid (not undefined, null, or empty string)
 */
function isValidValue(value: unknown): boolean {
  return value !== undefined && value !== null && value !== "";
}

/**
 * Sets a value at a nested path in an object
 */
function setValueAtPath(
  obj: Record<string, unknown>,
  path: string,
  value: unknown
): void {
  const keys = path.split(".");
  let current: Record<string, unknown> = obj;

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (!current[key] || typeof current[key] !== "object") {
      current[key] = {};
    }
    current = current[key] as Record<string, unknown>;
  }

  const lastKey = keys[keys.length - 1];
  current[lastKey] = value;
}

/**
 * Extracts user data from the generated data for saving to database
 * Only includes fields that differ from default values
 * 
 * @param userData - The current user data state
 * @param defaultData - The template's default data
 * @param mapping - The field mapping
 * @returns Clean user config object for database storage
 */
export function extractUserConfig(
  userData: Record<string, unknown>,
  defaultData: Record<string, unknown>,
  mapping: ThemeMapping
): Record<string, unknown> {
  const result: Record<string, unknown> = {};

  for (const [fieldKey, paths] of Object.entries(mapping)) {
    const userPath = paths.find((p) => p.startsWith("user."));
    if (!userPath) continue;

    const cleanPath = userPath.replace(/^user\./, "");
    const userValue = getDeepValue(userData, cleanPath);
    const defaultPath = paths.find((p) => p.startsWith("default."));
    const defaultValue = defaultPath 
      ? getDeepValue(defaultData, defaultPath.replace(/^default\./, ""))
      : undefined;

    // Only include if user value differs from default
    if (isValidValue(userValue) && userValue !== defaultValue) {
      setValueAtPath(result, cleanPath, userValue);
    }
  }

  return result;
}

/**
 * Prepares data for publish mode - flattens and strips all editing metadata
 * 
 * @param data - The merged data
 * @returns Clean static data for publishing
 */
export function preparePublishData(
  data: Record<string, unknown>
): Record<string, unknown> {
  // Deep clone to avoid mutations
  const cloned = JSON.parse(JSON.stringify(data));
  
  // Remove any internal/editor-specific fields
  const clean = removeInternalFields(cloned);
  
  return clean;
}

/**
 * Removes internal/editor-specific fields from data
 */
function removeInternalFields(
  obj: Record<string, unknown>
): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  
  for (const [key, value] of Object.entries(obj)) {
    // Skip internal fields (those starting with _)
    if (key.startsWith("_")) continue;
    
    if (value && typeof value === "object" && !Array.isArray(value)) {
      result[key] = removeInternalFields(value as Record<string, unknown>);
    } else {
      result[key] = value;
    }
  }
  
  return result;
}

/**
 * Gets the display value for a field, considering the mode
 * In editor mode, returns user value or default value
 * In preview/publish mode, returns merged value
 * 
 * @param field - The field key
 * @param mode - The current mode
 * @param userData - User data
 * @param defaultData - Default data
 * @param mapping - Field mapping
 * @returns The display value
 */
export function getFieldValue(
  field: string,
  mode: EditorMode,
  userData: Record<string, unknown>,
  defaultData: Record<string, unknown>,
  mapping: ThemeMapping
): string {
  const paths = mapping[field];
  if (!paths) return "";

  const sources = { user: userData, default: defaultData };
  const value = resolveValue([...paths], sources);
  
  return String(value ?? "");
}

/**
 * Checks if a field is editable in the current mode
 * 
 * @param mode - The current mode
 * @returns boolean indicating if fields are editable
 */
export function isEditable(mode: EditorMode): boolean {
  return mode === "editor";
}

/**
 * Checks if editor UI should be shown
 * 
 * @param mode - The current mode
 * @returns boolean indicating if editor UI should be shown
 */
export function showEditorUI(mode: EditorMode): boolean {
  return mode === "editor";
}
