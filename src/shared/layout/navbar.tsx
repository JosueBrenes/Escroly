"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Anchor } from "lucide-react";
import { WalletButton } from "@/modules/wallet/ui/wallet-button";
import { cn } from "@/shared/lib/utils";

const links = [
  { href: "/", label: "Home" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/dashboard", label: "Dashboard" },
] as const;

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-lg">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Anchor className="h-6 w-6 text-primary" />
          <span className="text-lg font-semibold tracking-tight">Anchor</span>
        </Link>

        <div className="hidden items-center gap-1 sm:flex">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                pathname === href
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {label}
            </Link>
          ))}
        </div>

        <WalletButton />
      </nav>
    </header>
  );
}
