import { cn } from "@/utils/tailwind";
import { Check, ChevronsUpDown } from "lucide-react";
import * as React from "react";
import { Button } from "./button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./command";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { useWindowWidth } from "@/hooks/use-window-width";
import { SelectOrderingOption } from "@/types/select-option.type";
import { Icons } from "./icons";

interface ComboboxProps<T> {
  options: Array<SelectOrderingOption>;
  value?: SelectOrderingOption<T>;
  onChange: (value: SelectOrderingOption<T>) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  isLoading?: boolean;
}

export function Combobox<T>({
  options,
  value,
  onChange,
  placeholder = "Selecione",
  className,
  disabled,
  isLoading = false,
}: ComboboxProps<T>) {
  const [triggerWidth, setTriggerWidth] = React.useState<number | null>(null);
  const [open, setOpen] = React.useState(false);

  const windowWidth = useWindowWidth();

  const triggerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (triggerRef.current) {
      setTriggerWidth(triggerRef.current.offsetWidth);
    }
  }, [open, windowWidth]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div ref={triggerRef} className={cn("w-full", className)}>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between bg-primary-50 hover:bg-primary-50 !border border-primary-200"
            disabled={disabled || isLoading}
          >
            {value ? (
              <span className="truncate text-ellipsis capitalize">
                {options.find((option) => option.value === value?.value)?.label}
              </span>
            ) : (
              <span className="w-full text-primary-500 font-light text-left">
                {isLoading ? (
                  <div className="flex justify-center items-center">
                    <Icons.loader2Icon className="size-5 animate-spin" />
                  </div>
                ) : (
                  placeholder
                )}
              </span>
            )}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </div>
      </PopoverTrigger>

      {!disabled && (
        <PopoverContent
          className="p-0 border border-primary-200"
          style={{ width: triggerWidth ?? 0 }}
        >
          <Command className="bg-primary-50">
            <CommandInput
              placeholder="Buscar"
              className="placeholder:text-primary-500 placeholder:font-light"
            />

            <CommandList>
              <CommandEmpty className="text-primary-500 font-light text-sm text-center py-6">
                Nenhum resultado encontrado.
              </CommandEmpty>

              <CommandGroup>
                {options.map((option, index) => (
                  <CommandItem
                    key={`${option.label}-${index}`}
                    value={option.label}
                    onSelect={() => {
                      onChange(option as SelectOrderingOption<T>);
                      setOpen(false);
                    }}
                    className="!bg-primary-50 hover:opacity-75 cursor-pointer capitalize"
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value?.value === option.value
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    <span
                      title={option.label}
                      className="truncate text-ellipsis"
                    >
                      {option.label}
                    </span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      )}
    </Popover>
  );
}
