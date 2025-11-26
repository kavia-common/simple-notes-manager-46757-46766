import React, { createContext, useContext } from "react";

/**
 * Ocean Professional theme tokens and helpers.
 * Use ThemeProvider to inject theme and consume with useTheme().
 */
export type Theme = {
  name: string;
  colors: {
    primary: string; // #2563EB
    secondary: string; // #F59E0B
    error: string; // #EF4444
    background: string; // #f9fafb
    surface: string; // #ffffff
    text: string; // #111827
    gradientFrom: string; // blue-500/10
    gradientTo: string; // gray-50
  };
  radius: {
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  shadow: {
    sm: string;
    md: string;
    lg: string;
  };
};

const defaultTheme: Theme = {
  name: "Ocean Professional",
  colors: {
    primary: "#2563EB",
    secondary: "#F59E0B",
    error: "#EF4444",
    background: "#f9fafb",
    surface: "#ffffff",
    text: "#111827",
    gradientFrom: "rgba(59,130,246,0.10)",
    gradientTo: "rgba(249,250,251,1)",
  },
  radius: {
    sm: 6,
    md: 10,
    lg: 14,
    xl: 20,
  },
  shadow: {
    sm: "0 1px 2px rgba(0,0,0,0.05)",
    md: "0 4px 10px rgba(0,0,0,0.08)",
    lg: "0 10px 25px rgba(0,0,0,0.10)",
  },
};

const ThemeContext = createContext<Theme>(defaultTheme);

export const ThemeProvider: React.FC<{ children: React.ReactNode; theme?: Theme }> = ({
  children,
  theme,
}) => {
  return <ThemeContext.Provider value={theme ?? defaultTheme}>{children}</ThemeContext.Provider>;
};

// PUBLIC_INTERFACE
export const useTheme = () => useContext(ThemeContext);

export const appBaseStyles: React.CSSProperties = {
  minHeight: "100%",
  background: `linear-gradient(180deg, ${defaultTheme.colors.gradientFrom}, ${defaultTheme.colors.gradientTo})`,
  color: defaultTheme.colors.text,
  fontFamily: "Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
};
