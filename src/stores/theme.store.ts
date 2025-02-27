import type { Theme, ThemeStore } from "@/types/theme.type";
import { create } from "zustand";

const STORAGE_KEY = "theme";
const DEFAULT_THEME = "system";

const handleThemeChange = (theme: Theme): Theme => {
  const root = window.document.documentElement;
  root.classList.remove("light", "dark");

  if (theme === "system") {
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";
    root.classList.add(systemTheme);
    localStorage.setItem(STORAGE_KEY, systemTheme);

    return systemTheme;
  }

  root.classList.add(theme);
  localStorage.setItem(STORAGE_KEY, theme);

  return theme;
};

export const useThemeStore = create<ThemeStore>((set) => ({
  theme: handleThemeChange(DEFAULT_THEME),
  setTheme: (theme: Theme): void => {
    set({ theme });
    handleThemeChange(theme);
  },
  initTheme: (): void => {
    const theme = (localStorage.getItem(STORAGE_KEY) ?? DEFAULT_THEME) as Theme;
    handleThemeChange(theme);
  },
}));
