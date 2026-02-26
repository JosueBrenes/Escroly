import type React from "react";

interface RoleRowProps {
  label: string;
  address: string;
  icon: React.ElementType;
}

export function RoleRow({ label, address, icon: Icon }: RoleRowProps) {
  if (!address) return null;
  const short =
    address.length > 16
      ? `${address.slice(0, 6)}...${address.slice(-6)}`
      : address;

  return (
    <div className="flex items-center justify-between py-2.5">
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <Icon className="h-4 w-4" />
        {label}
      </div>
      <span className="font-mono text-xs text-gray-900">{short}</span>
    </div>
  );
}
