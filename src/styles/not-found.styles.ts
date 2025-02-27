import { cn } from "@/utils/tailwind";

export const notFoundStyles = {
  main: cn([
    "flex",
    "min-h-[100dvh]",
    "flex-col",
    "items-center",
    "justify-center",
    "bg-background",
    "px-4",
    "py-12",
    "sm:px-6",
    "lg:px-8",
  ]),
  title: cn([
    "mx-auto",
    "max-w-lg",
    "text-center",
    "[&>div]:text-9xl",
    "[&>div]:font-bold",
    "[&>div]:text-primary",
  ]),
  subtitle: cn([
    "mt-4",
    "text-3xl",
    "font-bold",
    "tracking-tight",
    "text-foreground",
    "sm:text-4xl",
  ]),
  description: cn(["mt-4", "text-muted-foreground"]),
  button: cn([
    "mt-6",
    "inline-flex",
    "items-center",
    "rounded-md",
    "bg-primary",
    "px-4",
    "py-2",
    "text-sm",
    "font-medium",
    "text-primary-foreground",
    "shadow-sm",
    "transition-colors",
    "hover:bg-primary/90",
    "focus:outline-none",
    "focus:ring-2",
    "focus:ring-primary",
    "focus:ring-offset-2",
  ]),
};
