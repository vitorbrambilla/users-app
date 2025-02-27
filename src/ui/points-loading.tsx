import { cn } from "@/utils/tailwind";

export function PointsLoading(): JSX.Element {
  const pointStyles =
    "size-2 rounded-full bg-primary-700 dark:text-white animate-bounce";

  return (
    <div className="flex gap-2 bg-primary-200 p-3 rounded-[14px]">
      <div className={cn(pointStyles)} />
      <div className={cn(pointStyles, "[animation-delay:-.1s]")} />
      <div className={cn(pointStyles, "[animation-delay:-.3s]")} />
    </div>
  );
}
