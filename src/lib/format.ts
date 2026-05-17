const MONTH_PATTERN =
  /\s*(January|February|March|April|May|June|July|August|September|October|November|December)\b.*/i;

export function formatLocationLabel(name: string): string {
  if (!name) return name;
  let label = name.replace(/\s*\[.*?\]\s*/g, " "); // strip [bracketed sublocations]
  label = label.replace(MONTH_PATTERN, "");          // strip trailing date
  return label.replace(/\s+/g, " ").trim().replace(/\s*[:\-–]+$/, "");
}
