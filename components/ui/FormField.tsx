import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  ({ label, error, id, className, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        <label htmlFor={id} className="text-sm font-medium text-paper/90">
          {label}
        </label>
        <input
          ref={ref}
          id={id}
          className={cn(
            "rounded-xl border border-ink-border bg-ink-surface px-4 py-3 text-sm text-paper placeholder:text-muted/60",
            "transition-colors focus:border-signal",
            error && "border-signal",
            className,
          )}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          {...props}
        />
        {error && (
          <p id={`${id}-error`} className="text-xs text-signal">
            {error}
          </p>
        )}
      </div>
    );
  },
);

FormField.displayName = "FormField";
