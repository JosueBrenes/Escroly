"use client";

import type { ViewRole } from "@/modules/dashboard/types";
import { VIEW_ROLE_LABELS } from "@/modules/dashboard/types";
import { Building2, User, Scale } from "lucide-react";
import { cn } from "@/shared/lib/utils";

const ROLE_ICONS: Record<ViewRole, React.ElementType> = {
  hotel: Building2,
  user: User,
  resolver: Scale,
};

interface RoleSelectorProps {
  role: ViewRole;
  onRoleChange: (role: ViewRole) => void;
  className?: string;
}

export function RoleSelector({ role, onRoleChange, className }: RoleSelectorProps) {
  return (
    <div
      className={cn(
        "inline-flex rounded-xl border border-gray-200 bg-gray-50/80 p-1",
        className,
      )}
      role="tablist"
      aria-label="Vista por rol"
    >
      {(["hotel", "user", "resolver"] as const).map((r) => {
        const Icon = ROLE_ICONS[r];
        const isActive = role === r;
        return (
          <button
            key={r}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onRoleChange(r)}
            className={cn(
              "flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors",
              isActive
                ? "bg-white text-gray-900 shadow-sm ring-1 ring-gray-200"
                : "text-gray-500 hover:text-gray-700",
            )}
          >
            <Icon className="h-4 w-4 shrink-0" />
            {VIEW_ROLE_LABELS[r]}
          </button>
        );
      })}
    </div>
  );
}
