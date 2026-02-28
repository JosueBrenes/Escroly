import { useState } from "react";
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
import { DisputeModal } from "@/modules/deposit/ui/dispute-modal";

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
  onDispute: (justification?: { amountToHotel: number; reason: string }) => void;
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
  const [disputeModalOpen, setDisputeModalOpen] = useState(false);
  const maxAmount = Number(escrow.amount) || 0;
  const symbol = escrow.trustline?.symbol || "USDC";

  const handleDisputeSubmit = (amountToHotel: number, reason: string) => {
    setDisputeModalOpen(false);
    onDispute({ amountToHotel, reason });
  };

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <h3 className="mb-3 text-sm font-bold text-gray-900">Acciones</h3>
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
            Depositar ({escrow.amount} {symbol})
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
              Liberar depósito (sin incidencias)
            </Button>
            {!isResolver && (
              <>
                <Separator className="bg-gray-100" />
                <Button
                  variant="outline"
                  onClick={() => setDisputeModalOpen(true)}
                  disabled={!!actionLoading}
                  className="w-full cursor-pointer gap-2 border-amber-200 text-amber-600 hover:bg-amber-50 hover:text-amber-700"
                >
                  {actionLoading === "Dispute" ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <AlertTriangle className="h-4 w-4" />
                  )}
                  Iniciar disputa (justificar)
                </Button>
                <DisputeModal
                  open={disputeModalOpen}
                  onClose={() => setDisputeModalOpen(false)}
                  onSubmit={handleDisputeSubmit}
                  maxAmount={maxAmount}
                  symbol={symbol}
                  loading={actionLoading === "Dispute"}
                />
              </>
            )}
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
            Resolver disputa
          </Button>
        )}

        {status === "released" && (
          <div className="flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-600 ring-1 ring-emerald-100">
            <CheckCircle2 className="h-4 w-4 shrink-0" />
            Depósito liberado correctamente.
          </div>
        )}

        {status === "resolved" && (
          <div className="flex items-center gap-2 rounded-xl bg-[#1a56db]/[0.05] px-4 py-3 text-sm text-[#1a56db] ring-1 ring-[#1a56db]/10">
            <Scale className="h-4 w-4 shrink-0" />
            Disputa resuelta.
          </div>
        )}
      </div>
    </div>
  );
}
