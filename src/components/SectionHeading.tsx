import type { ReactNode } from "react";

const titleSizes = {
  lg: "text-[clamp(32px,4vw,52px)]",
  md: "text-[clamp(30px,3.6vw,46px)]",
};

export function SectionTitle({
  size = "lg",
  className = "",
  children,
}: {
  size?: keyof typeof titleSizes;
  className?: string;
  children: ReactNode;
}) {
  return (
    <h2
      className={`${titleSizes[size]} font-semibold tracking-[-.02em] ${className}`}
    >
      {children}
    </h2>
  );
}

export function Eyebrow({
  className = "text-accent",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return <p className={`text-[14px] font-semibold ${className}`}>{children}</p>;
}
