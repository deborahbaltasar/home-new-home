import { cn } from "@/shared/lib/cn";
import type { ButtonHTMLAttributes } from "react";

export type TabItem = {
  id: string;
  label: string;
};

type TabsProps = {
  items: TabItem[];
  activeId: string;
  className?: string;
};

type TabButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  active?: boolean;
};

export function Tabs({ activeId, className, items }: TabsProps) {
  return (
    <div className={cn("inline-flex rounded-pill bg-surface-muted p-1", className)}>
      {items.map((item) => (
        <TabButton key={item.id} active={item.id === activeId} type="button">
          {item.label}
        </TabButton>
      ))}
    </div>
  );
}

function TabButton({ active = false, className, ...props }: TabButtonProps) {
  return (
    <button
      className={cn(
        "rounded-pill px-4 py-2 text-sm font-medium transition",
        active ? "bg-surface text-foreground shadow-soft" : "text-muted hover:text-foreground",
        className
      )}
      {...props}
    />
  );
}

