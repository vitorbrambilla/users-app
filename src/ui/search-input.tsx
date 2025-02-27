import type { FunctionComponent } from "@/types/react.type";
import { Icons } from "@/ui/icons";
import { Input } from "@/ui/input";
import { cn } from "@/utils/tailwind";
import { useRef } from "react";

export interface SearchInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  wrapperClassName?: string;
  iconClassName?: string;
}

export default function SearchInput({
  value,
  onChange,
  wrapperClassName,
  className,
  iconClassName,
  disabled,
  autoFocus,
  ...props
}: SearchInputProps): FunctionComponent {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleIconClick = (): void => {
    inputRef.current?.focus();
  };

  return (
    <div
      className={cn(
        "w-[460px] max-w-full relative flex items-center",
        wrapperClassName
      )}
    >
      <Icons.search
        className={cn(
          "absolute right-3 text-primary-600 size-4",
          iconClassName
        )}
        onClick={handleIconClick}
      />

      <Input
        ref={inputRef}
        type="text"
        placeholder="Buscar"
        {...props}
        className={cn(
          "h-9",
          "bg-white",
          "pr-10 pl-4 py-2",
          "rounded-sm",
          "text-sm text-primary-300 font-light leading-normal",
          "placeholder:text-primary-300 placeholder:font-light placeholder:leading-normal",
          "focus-visible:ring-offset-0 focus-visible:ring-0",
          className
        )}
        value={value}
        onChange={onChange}
        disabled={disabled}
        autoFocus={autoFocus}
      />
    </div>
  );
}
