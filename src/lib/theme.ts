export function computePalette(hex: string) {
  const primary = hex || process.env.NEXT_PUBLIC_BRAND_DEFAULT || "#2563EB";
  return {
    primary,
    surface: "#FFFFFF",
    canvas: "#FAFBFD",
    ink: "#111827",
    line: "#E5E7EB",
    good: "#10B981",
    warn: "#F59E0B",
  };
}
