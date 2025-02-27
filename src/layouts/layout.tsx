import { useThemeStore } from "@/stores/theme.store";
import { layoutStyles } from "@/styles/layout.styles";
import type { FunctionComponent } from "@/types/react.type";
import { ThemeToggle } from "@/ui/theme-toggle";
import { Toaster } from "@/ui/toaster";
import { useMemo } from "react";

interface IProps {
  children: FunctionComponent;
}

export default function Layout({ children }: IProps): FunctionComponent {
  const { initTheme } = useThemeStore();

  useMemo(() => {
    initTheme();
  }, [initTheme]);

  return (
    <main className={layoutStyles.main}>
      <ThemeToggle />

      <div className={layoutStyles.children}>{children}</div>

      <Toaster />
    </main>
  );
}
