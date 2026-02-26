"use client";

import { useState, useCallback, useEffect } from "react";
import { useGetEscrowFromIndexerByContractIds } from "@trustless-work/escrow/hooks";
import type { GetEscrowsFromIndexerResponse } from "@trustless-work/escrow/types";
import type { EscrowStatus } from "@/modules/deposit/types";

export function getEscrowDetailStatus(escrow: GetEscrowsFromIndexerResponse): EscrowStatus {
  const flags = escrow.flags;
  if (flags?.released) return "released";
  if (flags?.resolved) return "resolved";
  if (flags?.disputed) return "disputed";
  if (escrow.balance && escrow.balance > 0) return "funded";
  return "pending";
}

export function useDepositDetail(contractId: string) {
  const { getEscrowByContractIds } = useGetEscrowFromIndexerByContractIds();

  const [escrow, setEscrow] = useState<GetEscrowsFromIndexerResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEscrow = useCallback(async () => {
    if (!contractId) return;
    setLoading(true);
    setError(null);
    try {
      const results = await getEscrowByContractIds({ contractIds: [contractId] });
      setEscrow(results.length > 0 ? results[0] : null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load deposit.");
    } finally {
      setLoading(false);
    }
  }, [contractId, getEscrowByContractIds]);

  useEffect(() => {
    fetchEscrow();
  }, [fetchEscrow]);

  return { escrow, loading, error, setError, fetchEscrow };
}
