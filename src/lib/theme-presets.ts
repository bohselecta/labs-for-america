export const PRESETS = {
  CITY: {
    name: "City",
    description: "Community-friendly, civic engagement",
    borderRadius: "0.75rem", // rounded-xl
    borderColor: "rgba(0,0,0,0.05)",
    shadow: "0 1px 3px rgba(0,0,0,0.05)",
    buttonStyle: "rounded-xl",
    cardStyle: "soft"
  },
  PD: {
    name: "Police Department", 
    description: "Authoritative, strong, professional",
    borderRadius: "0.25rem", // square, strong
    borderColor: "rgba(0,0,0,0.2)",
    shadow: "0 0 0 2px rgba(0,0,0,0.25)",
    buttonStyle: "square",
    cardStyle: "strong"
  },
  FIRE: {
    name: "Fire Department",
    description: "Emergency-ready, warm, accessible", 
    borderRadius: "0.5rem",
    borderColor: "rgba(255,69,0,0.5)", // orange-red
    shadow: "0 0 0 2px rgba(255,69,0,0.25)",
    buttonStyle: "rounded-lg",
    cardStyle: "emergency"
  },
  COUNTY: {
    name: "County Government",
    description: "Official, trustworthy, comprehensive",
    borderRadius: "1rem", // very soft
    borderColor: "rgba(0,0,0,0.05)",
    shadow: "0 2px 8px rgba(0,0,0,0.08)",
    buttonStyle: "rounded-2xl",
    cardStyle: "official"
  }
} as const;

export type PresetKey = keyof typeof PRESETS;
