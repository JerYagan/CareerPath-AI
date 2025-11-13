import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { Appearance, ColorSchemeName } from "react-native";

// ---- TYPES ---- //
interface ThemeContextType {
  theme: ColorSchemeName;
  setTheme: (theme: ColorSchemeName) => void;
}

// Create context with fallback undefined to force proper usage
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// ---- PROVIDER ---- //
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const systemTheme = Appearance.getColorScheme();

  const [theme, setTheme] = useState<ColorSchemeName>(
    systemTheme || "light"
  );

  useEffect(() => {
    const listener = Appearance.addChangeListener(({ colorScheme }) => {
      setTheme(colorScheme);
    });

    return () => listener.remove();
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// ---- HOOK ---- //
export const useTheme = () => {
  const ctx = useContext(ThemeContext);

  if (!ctx) {
    throw new Error("useTheme must be used inside <ThemeProvider>");
  }

  return ctx;
};