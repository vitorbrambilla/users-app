export type Theme = "dark" | "light" | "system";

export type ThemeStore = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  initTheme: () => void;
};
