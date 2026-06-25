import { cn } from "@/plugins/booking-modal/utils/cn";
import { LucideIcon } from "lucide-react";
import * as React from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  rightIcon?: LucideIcon;
  iconClassName?: string;
  onIconClick?: () => void;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      rightIcon: RightIcon,
      iconClassName,
      onIconClick,
      ...props
    },
    ref,
  ) => {
    return (
      <div className="relative w-full">
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed",
            RightIcon ? "pr-10" : "",
            className,
          )}
          ref={ref}
          {...props}
        />
        {RightIcon && (
          <div
            className={cn(
              "absolute inset-y-0 right-3 flex items-center",
              onIconClick ? "cursor-pointer hover:opacity-70" : "",
            )}
            onClick={onIconClick}
          >
            {" "}
            <RightIcon
              className={cn("h-5 w-5 text-muted-foreground", iconClassName)}
            />
          </div>
        )}
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };
