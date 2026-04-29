export type FieldType =
  | "text"
  | "textarea"
  | "image"
  | "url"
  | "color"
  | "date"
  | "time"
  | "number"
  | "email"
  | "select";

export interface FieldSchema {
  type?: FieldType;
  label?: string;
}

/** Detect field type from name and optional default value */
export function inferFieldType(field: string, defaultValue?: unknown): FieldType {
  const lower = field.toLowerCase();

  // Image-related fields
  if (
    lower.includes("image") ||
    lower.includes("img") ||
    lower.includes("photo") ||
    lower.includes("foto") ||
    lower.includes("picture") ||
    lower.includes("thumbnail") ||
    lower.includes("cover") ||
    lower.endsWith("qrisurl") ||
    (typeof defaultValue === "string" &&
      (defaultValue.startsWith("/images/") ||
        defaultValue.startsWith("http") ||
        defaultValue.startsWith("data:image")))
  ) {
    return "image";
  }

  // Color fields
  if (
    lower.includes("color") ||
    lower.includes("warna") ||
    lower.includes("accent") ||
    (typeof defaultValue === "string" && /^#[0-9A-Fa-f]{3,8}$/.test(defaultValue))
  ) {
    return "color";
  }

  // URL / Link fields
  if (
    lower.endsWith("url") ||
    lower.endsWith("link") ||
    lower.endsWith("maps") ||
    lower.includes("mapurl") ||
    lower.includes("ig") ||
    lower.includes("instagram") ||
    lower.includes("website") ||
    lower.includes("video")
  ) {
    return "url";
  }

  // Date fields
  if (lower.includes("date") && !lower.includes("update")) {
    return "date";
  }

  // Time fields
  if (lower.includes("time") && !lower.includes("timestamp")) {
    return "time";
  }

  // Email fields
  if (lower.includes("email")) {
    return "email";
  }

  // Number fields
  if (lower.includes("number") || lower.includes("count") || lower.includes("age")) {
    return "number";
  }

  // Select / enum fields
  if (lower.includes("style") || lower.includes("variant") || lower.includes("theme")) {
    return "select";
  }

  // Textarea fields — long text content
  if (
    lower.includes("message") ||
    lower.includes("translation") ||
    lower.includes("verse") ||
    lower.includes("story") ||
    lower.includes("description") ||
    lower.includes("bio") ||
    lower.includes("address") ||
    lower.includes("doa") ||
    lower.includes("hadith") ||
    (typeof defaultValue === "string" && defaultValue.length > 120)
  ) {
    return "textarea";
  }

  return "text";
}

/** Generate human-readable label from field path */
export function generateLabel(field: string): string {
  // Custom overrides for common fields
  const overrides: Record<string, string> = {
    "opening.bismillah": "Bismillah",
    "opening.salam": "Salam Pembuka",
    "quran.verse": "Ayat Quran (Arab)",
    "quran.translation": "Terjemahan Ayat",
    "hadith.translation": "Terjemahan Hadits",
    "doa.translation": "Terjemahan Doa",
    "closing.message": "Pesan Penutup",
    "closing.thankyou": "Ucapan Terima Kasih",
    "closing.couplenames": "Nama Pasangan Penutup",
    "event.date": "Tanggal Acara",
    "event.datehijri": "Tanggal Hijriah",
    "event.location": "Lokasi Acara",
    "akad.date": "Tanggal Akad",
    "akad.time": "Waktu Akad",
    "akad.location": "Lokasi Akad",
    "akad.address": "Alamat Akad",
    "akad.mapurl": "Link Google Maps Akad",
    "resepsi.date": "Tanggal Resepsi",
    "resepsi.time": "Waktu Resepsi",
    "resepsi.location": "Lokasi Resepsi",
    "resepsi.address": "Alamat Resepsi",
    "resepsi.mapurl": "Link Google Maps Resepsi",
    "dresscode": "Kode Busana",
    "rsvp.link": "Link RSVP",
    "music.url": "URL Musik",
    "music.title": "Judul Musik",
    "music.artist": "Artis Musik",
    "gift.qrisurl": "URL QRIS",
  };

  const lowerKey = field.toLowerCase().replace(/\./g, "");
  if (overrides[lowerKey]) return overrides[lowerKey];

  // e.g. "groom.fullName" -> "Groom Full Name"
  return field
    .split(".")
    .map((segment) =>
      segment
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (str) => str.toUpperCase())
        .trim(),
    )
    .join(" ");
}

/** Build a full schema map from mapping + defaultData + optional custom schema */
export function buildFieldSchema(
  mapping: Record<string, readonly string[]>,
  defaultData: Record<string, unknown>,
  customSchema?: Record<string, FieldSchema>,
): Record<string, Required<FieldSchema>> {
  const schema: Record<string, Required<FieldSchema>> = {};

  for (const field of Object.keys(mapping)) {
    const custom = customSchema?.[field];
    const defaultValue = getDefaultValue(field, mapping, defaultData);

    schema[field] = {
      type: custom?.type ?? inferFieldType(field, defaultValue),
      label: custom?.label ?? generateLabel(field),
    };
  }

  return schema;
}

function getDefaultValue(
  field: string,
  mapping: Record<string, readonly string[]>,
  defaultData: Record<string, unknown>,
): unknown {
  const paths = mapping[field];
  if (!paths) return undefined;

  const defaultPath = paths.find((p) => p.startsWith("default."));
  if (!defaultPath) return undefined;

  const cleanPath = defaultPath.replace(/^default\./, "");
  return getDeepValue(defaultData, cleanPath);
}

function getDeepValue(obj: unknown, path: string): unknown {
  if (!path) return obj;
  return path.split(".").reduce<unknown>((current, key) => {
    if (current && typeof current === "object" && !Array.isArray(current)) {
      return (current as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);
}

