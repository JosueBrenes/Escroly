import type { GetEscrowsFromIndexerResponse } from "@trustless-work/escrow/types";
import { RefreshCw } from "lucide-react";
import { EscrowCard } from "./escrow-card";
import { EmptyState } from "./empty-state";

interface EscrowListProps {
  escrows: GetEscrowsFromIndexerResponse[];
  loading: boolean;
  fetched: boolean;
}

export function EscrowList({ escrows, loading, fetched }: EscrowListProps) {
  if (loading && !fetched) {
    return (
      <div className="flex flex-col items-center gap-3 py-20 text-gray-400">
        <RefreshCw className="h-6 w-6 animate-spin" />
        <p className="text-sm">Loading deposits...</p>
      </div>
    );
  }

  if (escrows.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {escrows.map((escrow, i) => (
        <EscrowCard key={escrow.contractId || `escrow-${i}`} escrow={escrow} index={i} />
      ))}
    </div>
  );
}
