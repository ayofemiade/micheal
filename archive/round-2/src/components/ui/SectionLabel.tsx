import { cn } from "@/lib/utils";

interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
  /** Rule + text tone for dark grounds */
  onDark?: boolean;
}

/** Small sentence-case label with a leading rule. Used once per section. */
export function SectionLabel({
  children,
  className,
  onDark = false,
}: SectionLabelProps) {
  return (
    <p
      className={cn(
        "t-label flex items-center gap-3",
        onDark ? "text-terracotta-light" : "text-terracotta-deep",
        className,
      )}
    >
      <span aria-hidden className="h-px w-8 bg-current opacity-70" />
      {children}
    </p>
  );
}
