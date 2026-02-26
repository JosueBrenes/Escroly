"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useWalletContext } from "@/modules/wallet/providers/wallet-provider";
import { useDepositForm } from "@/modules/deposit/hooks/use-deposit-form";
import { NotConnected } from "@/modules/dashboard/ui/not-connected";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Anchor, ArrowLeft, Loader2, CheckCircle2 } from "lucide-react";

export function DepositFormView() {
  const router = useRouter();
  const { walletAddress } = useWalletContext();
  const {
    form,
    step,
    error,
    contractId,
    canSubmit,
    updateField,
    handleSubmit,
    reset,
  } = useDepositForm(walletAddress);

  if (!walletAddress) {
    return (
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-6">
          <NotConnected message="You need to connect a Stellar wallet to create a deposit escrow." />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-white">
      <div className="mx-auto w-full max-w-2xl px-6 py-10">
        <Link
          href="/dashboard"
          className="mb-6 inline-flex items-center gap-1 text-sm text-gray-400 transition-colors hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>

        {step === "success" ? (
          <div className="flex flex-col items-center gap-5 rounded-2xl border border-gray-100 bg-white p-10 text-center shadow-sm">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50">
              <CheckCircle2 className="h-8 w-8 text-emerald-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Deposit Created</h2>
            <p className="text-gray-500">
              Your escrow deposit has been deployed on-chain. The tenant can now
              fund it.
            </p>
            {contractId && (
              <p className="break-all rounded-xl bg-gray-50 px-4 py-2 font-mono text-xs text-gray-500">
                {contractId}
              </p>
            )}
            <div className="flex gap-3 pt-2">
              {contractId && (
                <Button
                  onClick={() => router.push(`/deposit/${contractId}`)}
                  className="cursor-pointer gap-2 bg-[#1a56db] text-white hover:bg-[#1545b5]"
                >
                  View Deposit
                </Button>
              )}
              <Button
                variant="outline"
                onClick={reset}
                className="cursor-pointer border-gray-200 text-gray-700 hover:bg-gray-50"
              >
                Create Another
              </Button>
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1a56db]/[0.07]">
                <Anchor className="h-5 w-5 text-[#1a56db]" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">
                  Create Deposit Escrow
                </h1>
                <p className="text-sm text-gray-500">
                  Define the terms for a new rental deposit.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="space-y-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
                  Deposit Details
                </p>

                <div className="space-y-1.5">
                  <label htmlFor="title" className="text-sm font-medium text-gray-700">
                    Title
                  </label>
                  <Input
                    id="title"
                    placeholder="e.g. Apartment deposit — March 2026"
                    value={form.title}
                    onChange={updateField("title")}
                    className="border-gray-200 bg-gray-50/50 focus-visible:ring-[#1a56db]"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="description" className="text-sm font-medium text-gray-700">
                    Description <span className="text-gray-400">(optional)</span>
                  </label>
                  <Input
                    id="description"
                    placeholder="Conditions, property address, notes..."
                    value={form.description}
                    onChange={updateField("description")}
                    className="border-gray-200 bg-gray-50/50 focus-visible:ring-[#1a56db]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="amount" className="text-sm font-medium text-gray-700">
                    Deposit Amount (USDC)
                  </label>
                  <Input
                    id="amount"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="500.00"
                    value={form.amount}
                    onChange={updateField("amount")}
                    className="border-gray-200 bg-gray-50/50 focus-visible:ring-[#1a56db]"
                    required
                  />
                </div>
              </div>

              <div className="space-y-4 pt-2">
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
                  Parties Involved
                </p>

                <div className="space-y-1.5">
                  <label htmlFor="serviceProvider" className="text-sm font-medium text-gray-700">
                    Property Owner Address
                  </label>
                  <Input
                    id="serviceProvider"
                    placeholder="G... (Stellar address)"
                    value={form.serviceProvider}
                    onChange={updateField("serviceProvider")}
                    className="border-gray-200 bg-gray-50/50 font-mono text-xs focus-visible:ring-[#1a56db]"
                    required
                  />
                  <p className="text-xs text-gray-400">
                    Receives funds if damage is proven.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="receiver" className="text-sm font-medium text-gray-700">
                    Tenant Address
                  </label>
                  <Input
                    id="receiver"
                    placeholder="G... (Stellar address)"
                    value={form.receiver}
                    onChange={updateField("receiver")}
                    className="border-gray-200 bg-gray-50/50 font-mono text-xs focus-visible:ring-[#1a56db]"
                    required
                  />
                  <p className="text-xs text-gray-400">
                    Receives the deposit back if there are no incidents.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="disputeResolver" className="text-sm font-medium text-gray-700">
                    Dispute Resolver{" "}
                    <span className="text-gray-400">(optional)</span>
                  </label>
                  <Input
                    id="disputeResolver"
                    placeholder="G... (defaults to your address)"
                    value={form.disputeResolver}
                    onChange={updateField("disputeResolver")}
                    className="border-gray-200 bg-gray-50/50 font-mono text-xs focus-visible:ring-[#1a56db]"
                  />
                  <p className="text-xs text-gray-400">
                    Neutral third party who resolves disputes.
                  </p>
                </div>
              </div>

              {error && (
                <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600 ring-1 ring-red-100">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                size="lg"
                disabled={!canSubmit || step === "signing"}
                className="mt-2 cursor-pointer bg-[#1a56db] text-white shadow-lg shadow-[#1a56db]/25 hover:bg-[#1545b5]"
              >
                {step === "signing" ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing Transaction...
                  </>
                ) : (
                  "Create Deposit Escrow"
                )}
              </Button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
