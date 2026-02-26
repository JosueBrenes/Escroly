import Link from "next/link";
import type { GetEscrowsFromIndexerResponse } from "@trustless-work/escrow/types";
import { Button } from "@/shared/ui/button";
import { ArrowRight } from "lucide-react";
import { EscrowStatusBadge, getEscrowStatus } from "./escrow-status-badge";

interface EscrowCardProps {
  escrow: GetEscrowsFromIndexerResponse;
  index: number;
}

export function EscrowCard({ escrow, index }: EscrowCardProps) {
  const id = escrow.contractId || `escrow-${index}`;
  const title = escrow.title || `Deposit #${index + 1}`;
  const amount = escrow.amount;
  const status = getEscrowStatus(escrow);
  const symbol = escrow.trustline?.symbol || "USDC";

  return (
    <div className="group rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between">
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <EscrowStatusBadge status={status} />
      </div>
      <p className="mt-1 font-mono text-xs text-gray-400">
        {id.length > 20 ? `${id.slice(0, 8)}...${id.slice(-8)}` : id}
      </p>

      <div className="mt-4 flex items-end justify-between">
        <div>
          <p className="text-xs text-gray-400">Amount</p>
          <p className="text-lg font-bold text-gray-900">
            {amount}{" "}
            <span className="text-sm font-normal text-gray-400">{symbol}</span>
          </p>
        </div>
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="cursor-pointer gap-1 text-[#1a56db] hover:bg-[#1a56db]/[0.06] hover:text-[#1a56db]"
        >
          <Link href={`/deposit/${id}`}>
            View
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
