import React from "react";
import { colors, spacing, fontSizes } from "../../styles/design-tokens";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", children, ...props }, ref) => {
    const bg = variant === "primary" ? colors.primary : colors.secondary;
    return (
      <button
        ref={ref}
        style={{
          backgroundColor: bg,
          padding: spacing.md,
          fontSize: fontSizes.base,
          borderRadius: spacing.sm,
          color: "#fff",
        }}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
