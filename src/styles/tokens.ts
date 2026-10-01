/**
 * ANIVEL MEDIA Visual Design System Tokens
 * Dark-first, editorial, high-craft digital agency system.
 */

export const colors = {
  background: "#000000",
  primaryAccent: "#CB2957",
  primaryAccentLight: "#E14D75",
  primaryAccentDark: "#9A1B3E",
  primaryAccentGlow: "rgba(203, 41, 87, 0.35)",
  primaryAccentSubtle: "rgba(203, 41, 87, 0.12)",
  
  // Surfaces (slightly elevated from pure black)
  surfaceBase: "#000000",
  surface1: "#08080A",
  surface2: "#0D0D11",
  surface3: "#131318",
  surfaceGlass: "rgba(10, 10, 14, 0.75)",
  
  // Text
  textPrimary: "#EEEEEE",
  textSecondary: "#DDDDDD",
  textMuted: "#888890",
  textDisabled: "#55555A",
  
  // Borders
  borderSubtle: "rgba(255, 255, 255, 0.08)",
  borderMedium: "rgba(255, 255, 255, 0.16)",
  borderAccent: "rgba(203, 41, 87, 0.4)",
  borderActive: "#CB2957",
} as const;

export const radii = {
  sharp: "4px",
  sm: "8px",
  md: "12px",
  lg: "16px",
  editorialMax: "18px",
} as const;

export const shadows = {
  subtle: "0 4px 20px rgba(0, 0, 0, 0.5)",
  card: "0 8px 30px rgba(0, 0, 0, 0.7)",
  crimsonGlow: "0 0 25px -4px rgba(203, 41, 87, 0.35)",
  crimsonLg: "0 0 50px -10px rgba(203, 41, 87, 0.45)",
} as const;
