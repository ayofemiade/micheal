import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const button = cva(
  [
    "group/btn inline-flex min-h-12 cursor-pointer items-center justify-center gap-3",
    "rounded-full text-[0.9375rem] font-semibold tracking-[0.005em] whitespace-nowrap",
    "transition-[background-color,color,border-color,box-shadow] duration-300 ease-[var(--ease-editorial)]",
  ],
  {
    variants: {
      variant: {
        /** Default on light grounds */
        solid:
          "bg-charcoal px-7 text-ivory hover:bg-terracotta-deep focus-visible:bg-terracotta-deep",
        /** Primary on dark grounds */
        light:
          "bg-ivory px-7 text-charcoal hover:bg-terracotta-light focus-visible:bg-terracotta-light",
        /** Secondary on dark grounds */
        outlineLight:
          "border border-ivory/40 px-7 text-ivory hover:border-ivory hover:bg-ivory hover:text-charcoal",
        /** Secondary on light grounds — quiet text link with a rule */
        link: "min-h-11 rounded-none border-b border-charcoal/30 px-0 pb-0.5 text-charcoal hover:border-terracotta-deep hover:text-terracotta-deep",
        /** Quiet link on dark grounds */
        linkLight:
          "min-h-11 rounded-none border-b border-ivory/35 px-0 pb-0.5 text-ivory hover:border-terracotta-light hover:text-terracotta-light",
      },
    },
    defaultVariants: { variant: "solid" },
  },
);

interface ButtonProps extends VariantProps<typeof button> {
  href: string;
  children: React.ReactNode;
  className?: string;
  /** Hide the trailing arrow */
  plain?: boolean;
}

export function Button({
  href,
  variant,
  children,
  className,
  plain = false,
}: ButtonProps) {
  return (
    <Link href={href} className={cn(button({ variant }), className)}>
      <span>{children}</span>
      {!plain && (
        <ArrowRight
          aria-hidden
          className="size-4 shrink-0 transition-transform duration-300 ease-[var(--ease-editorial)] group-hover/btn:translate-x-1"
          strokeWidth={1.75}
        />
      )}
    </Link>
  );
}
