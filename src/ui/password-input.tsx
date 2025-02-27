"use client";
import * as React from "react";

import { cn } from "@/utils/tailwind";
import { Input } from "../ui/input";
import { EyeIcon, EyeOffIcon } from "lucide-react";

export interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  blackIcon?: boolean;
}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, type, blackIcon, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    return (
      <div className="relative">
        <Input
          type={showPassword ? "text" : "password"}
          {...props}
          ref={ref}
          className={cn("pr-10", className)}
        />

        <span className="absolute top-[8px] right-2 cursor-pointer select-none">
          {showPassword ? (
            <EyeIcon
              strokeWidth={1}
              className={cn("text-primary", blackIcon && "text-secondary")}
              onClick={() => setShowPassword(false)}
            />
          ) : (
            <EyeOffIcon
              strokeWidth={1}
              className={cn("text-primary", blackIcon && "text-secondary")}
              onClick={() => setShowPassword(true)}
            />
          )}
        </span>
      </div>
    );
  }
);
PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
