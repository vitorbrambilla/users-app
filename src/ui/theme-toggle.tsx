import { useThemeStore } from "@/stores/theme.store";
import { Icons } from "./icons";
import { themeToggleStyles } from "@/styles/theme-toggle.styles";

export function ThemeToggle(): JSX.Element {
  const { setTheme, theme } = useThemeStore();

  return (
    <div className="absolute right-4 top-4">
      {theme === "light" ? (
        <Icons.lightbulb
          size={24}
          className={themeToggleStyles.lightOnIcon}
          onClick={() => {
            setTheme("dark");
          }}
        />
      ) : (
        <Icons.lightbulbOff
          size={24}
          className={themeToggleStyles.lightOffIcon}
          onClick={() => {
            setTheme("light");
          }}
        />
      )}
    </div>
  );
}
