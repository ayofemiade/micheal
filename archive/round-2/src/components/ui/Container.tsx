import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: "div" | "header" | "footer" | "nav";
}

/** The single content width + gutter used by every section. */
export function Container({
  as: Tag = "div",
  className,
  ...props
}: ContainerProps) {
  return <Tag className={cn("container-page", className)} {...props} />;
}
