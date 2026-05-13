import { cn } from "@/lib/utils";

export function H1({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h1
      className={cn(
        "text-7xl font-black tracking-tighter md:text-9xl",
        className,
      )}
    >
      {children}
    </h1>
  );
}

export function H2({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        "font-mono text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground",
        className,
      )}
    >
      {children}
    </h2>
  );
}

export function P({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("text-base leading-7 text-muted-foreground", className)}>
      {children}
    </p>
  );
}

export function Muted({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span className={cn("text-sm text-muted-foreground", className)}>
      {children}
    </span>
  );
}
