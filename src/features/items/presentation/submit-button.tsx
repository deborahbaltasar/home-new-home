"use client";

import type { ReactNode } from "react";
import { useFormStatus } from "react-dom";

import { Button } from "@/design-system/primitives/button";

type SubmitButtonProps = {
  idleLabel?: string;
  pendingLabel?: string;
  idleContent?: ReactNode;
  pendingContent?: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  title?: string;
  ariaLabel?: string;
};

export function SubmitButton({
  idleLabel,
  pendingLabel,
  idleContent,
  pendingContent,
  variant = "primary",
  size = "md",
  className,
  title,
  ariaLabel
}: SubmitButtonProps) {
  const { pending } = useFormStatus();
  const content = pending
    ? pendingContent ?? pendingLabel ?? idleContent ?? idleLabel
    : idleContent ?? idleLabel;

  return (
    <Button
      type="submit"
      variant={variant}
      size={size}
      className={className}
      disabled={pending}
      aria-disabled={pending}
      title={title}
      aria-label={ariaLabel}
    >
      {content}
    </Button>
  );
}
