"use client";

import Link from "next/link";
import { useWalletContext } from "@/modules/wallet/providers/wallet-provider";
import { useEscrows } from "@/modules/dashboard/hooks/use-escrows";
import { EscrowList } from "@/modules/dashboard/ui/escrow-list";
import { NotConnected } from "@/modules/dashboard/ui/not-connected";
import { Button } from "@/shared/ui/button";
import { Plus, RefreshCw } from "lucide-react";

export default function DashboardPage() {
  const { walletAddress } = useWalletContext();
  const { escrows, loading, fetched, fetchEscrows } = useEscrows(walletAddress);

  return (
    <div className="flex flex-col bg-white">
      {/* Header area */}
      <section className="relative overflow-hidden bg-white">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute right-0 top-0 h-[400px] w-[500px] -translate-y-1/3 translate-x-1/4 rounded-full bg-[#1a56db]/[0.04] blur-[100px]" />
        </div>

        <div className="mx-auto max-w-5xl px-6 pb-6 pt-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                My Deposits
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Manage your escrow deposits and track their status.
              </p>
            </div>
            {walletAddress && (
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={fetchEscrows}
                  disabled={loading}
                  className="cursor-pointer gap-2 border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                >
                  <RefreshCw
                    className={`h-4 w-4 ${loading ? "animate-spin" : ""}`}
                  />
                  Refresh
                </Button>
                <Button
                  asChild
                  size="sm"
                  className="cursor-pointer gap-2 bg-[#1a56db] text-white hover:bg-[#1545b5]"
                >
                  <Link href="/deposit/new">
                    <Plus className="h-4 w-4" />
                    New Deposit
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {!walletAddress ? (
        <div className="mx-auto max-w-5xl px-6">
          <NotConnected />
        </div>
      ) : (
        <section className="mx-auto w-full max-w-5xl px-6 pb-20">
          <EscrowList escrows={escrows} loading={loading} fetched={fetched} />
        </section>
      )}
    </div>
  );
}
