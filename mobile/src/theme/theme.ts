import { MD3LightTheme, MD3DarkTheme } from "react-native-paper";

export const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: "#3b82f6", // Blue-500
    primaryContainer: "#dbeafe", // Blue-100
    secondary: "#8b5cf6", // Purple-500
    secondaryContainer: "#e9d5ff", // Purple-100
    tertiary: "#ec4899", // Pink-500
    tertiaryContainer: "#fce7f3", // Pink-100
    surface: "#ffffff",
    surfaceVariant: "#f8fafc", // Slate-50
    background: "#ffffff",
    error: "#ef4444", // Red-500
    errorContainer: "#fee2e2", // Red-100
    onPrimary: "#ffffff",
    onSecondary: "#ffffff",
    onTertiary: "#ffffff",
    onSurface: "#0f172a", // Slate-900
    onSurfaceVariant: "#64748b", // Slate-500
    onBackground: "#0f172a", // Slate-900
    outline: "#cbd5e1", // Slate-300
    outlineVariant: "#e2e8f0", // Slate-200
    shadow: "#000000",
    scrim: "#000000",
    inverseSurface: "#1e293b", // Slate-800
    inverseOnSurface: "#f1f5f9", // Slate-100
    inversePrimary: "#60a5fa", // Blue-400
    // Custom colors for construction theme
    construction: {
      orange: "#ff6b35",
      yellow: "#f7931e",
      blue: "#1e88e5",
      green: "#43a047",
      red: "#e53935",
      gray: "#546e7a",
    },
    gradient: {
      primary: ["#3b82f6", "#8b5cf6", "#ec4899"],
      secondary: ["#10b981", "#3b82f6", "#8b5cf6"],
      accent: ["#f59e0b", "#ef4444", "#ec4899"],
    },
  },
};

export const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: "#60a5fa", // Blue-400
    primaryContainer: "#1e3a8a", // Blue-800
    secondary: "#a78bfa", // Purple-400
    secondaryContainer: "#5b21b6", // Purple-800
    tertiary: "#f472b6", // Pink-400
    tertiaryContainer: "#be185d", // Pink-800
    surface: "#0f172a", // Slate-900
    surfaceVariant: "#1e293b", // Slate-800
    background: "#020617", // Slate-950
    error: "#f87171", // Red-400
    errorContainer: "#7f1d1d", // Red-900
    onPrimary: "#1e3a8a", // Blue-800
    onSecondary: "#5b21b6", // Purple-800
    onTertiary: "#be185d", // Pink-800
    onSurface: "#f1f5f9", // Slate-100
    onSurfaceVariant: "#94a3b8", // Slate-400
    onBackground: "#f1f5f9", // Slate-100
    outline: "#475569", // Slate-600
    outlineVariant: "#334155", // Slate-700
    shadow: "#000000",
    scrim: "#000000",
    inverseSurface: "#f1f5f9", // Slate-100
    inverseOnSurface: "#1e293b", // Slate-800
    inversePrimary: "#3b82f6", // Blue-500
    // Custom colors for construction theme (dark mode)
    construction: {
      orange: "#ff8a65",
      yellow: "#ffb74d",
      blue: "#42a5f5",
      green: "#66bb6a",
      red: "#ef5350",
      gray: "#78909c",
    },
    gradient: {
      primary: ["#60a5fa", "#a78bfa", "#f472b6"],
      secondary: ["#34d399", "#60a5fa", "#a78bfa"],
      accent: ["#fbbf24", "#f87171", "#f472b6"],
    },
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 24,
  full: 9999,
};

export const typography = {
  fontSizes: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    "2xl": 24,
    "3xl": 30,
    "4xl": 36,
    "5xl": 48,
  },
  fontWeights: {
    normal: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
  },
  lineHeights: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
  },
};

export const shadows = {
  sm: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  md: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  lg: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  xl: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
  },
};
