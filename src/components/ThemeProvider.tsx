import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type Theme = "dark" | "light";
const ThemeContext = createContext<{ theme: Theme; toggleTheme: () => void }>({ theme: "dark", toggleTheme: () => {} });

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [ready, setReady] = useState(false);
  useEffect(() => {
    let saved: string | null = null;
    try { saved = localStorage.getItem("orbit-theme"); } catch { /* Device storage may be disabled. */ }
    setTheme(saved === "light" || saved === "dark" ? saved : matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
    setReady(true);
  }, []);
  useEffect(() => {
    if (!ready) return;
    document.documentElement.dataset['theme'] = theme;
    document.documentElement.classList.toggle("dark", theme === "dark");
    try { localStorage.setItem("orbit-theme", theme); } catch { /* Keep the switch functional without storage. */ }
  }, [theme, ready]);
  return <ThemeContext.Provider value={{ theme, toggleTheme: () => setTheme((current) => current === "dark" ? "light" : "dark") }}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => useContext(ThemeContext);