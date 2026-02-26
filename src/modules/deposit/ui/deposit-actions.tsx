import type { GetEscrowsFromIndexerResponse } from "@trustless-work/escrow/types";
import { Button } from "@/shared/ui/button";
import { Separator } from "@/shared/ui/separator";
import {
  Loader2,
  Send,
  CheckCircle2,
  AlertTriangle,
  Scale,
} from "lucide-react";
import type { EscrowStatus } from "@/modules/deposit/types";

interface DepositActionsProps {
  escrow: GetEscrowsFromIndexerResponse;
  status: EscrowStatus;
  actionLoading: string | null;
  isApprover: boolean;
  isOwner: boolean;
  isTenant: boolean;
  isResolver: boolean;
  onFund: () => void;
  onRelease: () => void;
  onDispute: () => void;
  onResolve: () => void;
}

export function DepositActions({
  escrow,
  status,
  actionLoading,
  isApprover,
  isOwner,
  isTenant,
  isResolver,
  onFund,
  onRelease,
  onDispute,
  onResolve,
}: DepositActionsProps) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <h3 className="mb-3 text-sm font-bold text-gray-900">Actions</h3>
      <div className="space-y-3">
        {status === "pending" && (
          <Button
            onClick={onFund}
            disabled={!!actionLoading}
            className="w-full cursor-pointer gap-2 bg-[#1a56db] text-white hover:bg-[#1545b5]"
          >
            {actionLoading === "Fund" ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
            Fund Deposit ({escrow.amount} {escrow.trustline?.symbol || "USDC"})
          </Button>
        )}

        {status === "funded" && (isApprover || isOwner || isTenant) && (
          <>
            <Button
              onClick={onRelease}
              disabled={!!actionLoading}
              className="w-full cursor-pointer gap-2 bg-emerald-600 text-white hover:bg-emerald-700"
            >
              {actionLoading === "Release" ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <CheckCircle2 className="h-4 w-4" />
              )}
              Release Deposit (No Incidents)
            </Button>
            <Separator className="bg-gray-100" />
            <Button
              variant="outline"
              onClick={onDispute}
              disabled={!!actionLoading}
              className="w-full cursor-pointer gap-2 border-amber-200 text-amber-600 hover:bg-amber-50 hover:text-amber-700"
            >
              {actionLoading === "Dispute" ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <AlertTriangle className="h-4 w-4" />
              )}
              Raise Dispute
            </Button>
          </>
        )}

        {status === "disputed" && isResolver && (
          <Button
            onClick={onResolve}
            disabled={!!actionLoading}
            className="w-full cursor-pointer gap-2 bg-[#1a56db] text-white hover:bg-[#1545b5]"
          >
            {actionLoading === "Resolve" ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Scale className="h-4 w-4" />
            )}
            Resolve Dispute
          </Button>
        )}

        {status === "released" && (
          <div className="flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-600 ring-1 ring-emerald-100">
            <CheckCircle2 className="h-4 w-4 shrink-0" />
            This deposit has been fully released.
          </div>
        )}

        {status === "resolved" && (
          <div className="flex items-center gap-2 rounded-xl bg-[#1a56db]/[0.05] px-4 py-3 text-sm text-[#1a56db] ring-1 ring-[#1a56db]/10">
            <Scale className="h-4 w-4 shrink-0" />
            This dispute has been resolved.
          </div>
        )}
      </div>
    </div>
  );
}
