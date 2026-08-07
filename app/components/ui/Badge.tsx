import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  active?: boolean;
  onClick?: () => void;
  interactive?: boolean;
}

export function Badge({ children, className, active, onClick, interactive }: BadgeProps) {
  const Comp = interactive ? motion.button : motion.span;

  return (
    <Comp
      type={interactive ? "button" : undefined}
      onClick={onClick}
      whileHover={interactive ? { scale: 1.05 } : undefined}
      whileTap={interactive ? { scale: 0.97 } : undefined}
      className={cn(
        "rounded-lg px-2.5 py-1 text-xs font-medium ring-1 transition-colors duration-200",
        active
          ? "bg-cta text-white ring-cta"
          : "bg-muted text-foreground ring-border hover:bg-cta/10 hover:text-cta hover:ring-cta/30",
        interactive && "cursor-pointer",
        className
      )}
    >
      {children}
    </Comp>
  );
}

export function SectionBadge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn("section-badge inline-flex items-center", className)}>
      {children}
    </span>
  );
}
