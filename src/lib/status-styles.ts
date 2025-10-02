// Status styling constants for consistent UI
export const STATUS_STYLES = {
  open: "bg-green-100 text-green-700",
  upcoming: "bg-yellow-100 text-yellow-700", 
  closed: "bg-gray-100 text-gray-700",
} as const;

export type StatusKey = keyof typeof STATUS_STYLES;

