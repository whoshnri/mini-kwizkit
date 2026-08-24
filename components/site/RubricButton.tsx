"use client";

import Link from"next/link";
import type { MouseEventHandler, ReactNode } from"react";
import { cn } from"@/lib/utils";

type RubricButtonVariant ="primary"|"secondary"|"ghost"|"inverse";
type RubricButtonSize ="sm"|"md"|"lg";

type BaseProps = {
 children: ReactNode;
 variant?: RubricButtonVariant;
 size?: RubricButtonSize;
 className?: string;
};

type LinkButtonProps = BaseProps & {
 href: string;
 onClick?: never;
 type?: never;
 disabled?: never;
 target?: string;
 rel?: string;
};

type ActionButtonProps = BaseProps & {
 href?: never;
 onClick?: MouseEventHandler<HTMLButtonElement>;
 type?:"button"|"submit"|"reset";
 disabled?: boolean;
 target?: never;
 rel?: never;
};

export type RubricButtonProps = LinkButtonProps | ActionButtonProps;

const variantClasses: Record<RubricButtonVariant, string> = {
 primary: "bg-[var(--foreground)] hover:opacity-90",
 secondary:
  "border border-[var(--foreground)] bg-transparent hover:bg-[color-mix(in_srgb,var(--foreground)_6%,transparent)]",
 ghost:
  "bg-transparent hover:bg-[color-mix(in_srgb,var(--foreground)_6%,transparent)]",
 inverse: "bg-[var(--surface-strong)] hover:opacity-95",
};

const sizeClasses: Record<RubricButtonSize, string> = {
 sm:"h-10 px-4 text-sm",
 md:"h-12 px-5 text-sm",
 lg:"h-14 px-6 text-base",
};

const baseClasses =
"inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-150 active:scale-[0.98] disabled:cursor-not-allowed cursor-pointer disabled:opacity-50";

const variantStyles: Record<RubricButtonVariant, React.CSSProperties> = {
  primary: {
    backgroundColor: "var(--foreground)",
    color: "var(--background)",
  },
  secondary: {
    backgroundColor: "transparent",
    borderColor: "var(--foreground)",
    color: "var(--foreground)",
  },
  ghost: {
    backgroundColor: "transparent",
    color: "var(--rubric-slate)",
  },
  inverse: {
    backgroundColor: "var(--surface-strong)",
    color: "var(--foreground)",
  },
};

export function RubricButton(props: RubricButtonProps) {
 const { children, className, variant ="primary", size ="md"} = props;
 const classes = cn(baseClasses, variantClasses[variant], sizeClasses[size], className);
 const style = variantStyles[variant];

 if ("href"in props && props.href) {
 const { href, target, rel } = props;
 return (
 <Link href={href} target={target} rel={rel} className={classes} style={style}>
 {children}
 </Link>
 );
 }

 const { onClick, type ="button", disabled } = props;
 return (
 <button type={type} onClick={onClick} disabled={disabled} className={classes} style={style}>
 {children}
 </button>
 );
}
