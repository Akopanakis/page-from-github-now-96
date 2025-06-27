import React from "react";
import { colors, spacing, fontSizes } from "../../styles/design-tokens";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
};

export function Button({ variant = "primary", children, ...props }: ButtonProps) {
  const bg = variant === "primary" ? colors.primary : colors.secondary;
  return (
    <button
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
}
