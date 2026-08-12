import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { buttonMotion } from "@/lib/motion";

type ButtonVariant = "primary" | "secondary" | "ghost" | "glass";
type ButtonSize = "sm" | "md" | "lg";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-cta text-white hover:bg-cta-hover shadow-sm",
  secondary: "border-2 border-border bg-card text-foreground hover:border-cta hover:bg-muted",
  ghost: "text-foreground hover:bg-muted",
  glass: "glass-btn text-white font-medium",
};

const sizes: Record<ButtonSize, string> = {
  sm: "px-4 py-2.5 text-sm min-h-[44px]",
  md: "px-6 py-3 text-sm min-h-[44px]",
  lg: "px-7 py-3.5 text-base min-h-[48px]",
};

interface ButtonProps {
  children: ReactNode;
  className?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
}

export function Button({ className, variant = "primary", size = "md", children, type = "button", onClick, disabled }: ButtonProps) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: 1.02, y: -1 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "interactive inline-flex items-center justify-center rounded-xl font-medium transition-colors duration-200",
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </motion.button>
  );
}

interface ButtonLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  download?: boolean;
}

export function ButtonLink({ href, children, className, variant = "primary", size = "md", download }: ButtonLinkProps) {
  return (
    <motion.a
      href={href}
      download={download}
      className={cn(
        "interactive inline-flex items-center justify-center rounded-xl font-medium transition-colors duration-200",
        variants[variant],
        sizes[size],
        className
      )}
      {...buttonMotion}
    >
      {children}
    </motion.a>
  );
}
