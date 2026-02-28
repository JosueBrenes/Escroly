"use client";

import { useState, useCallback, useEffect } from "react";
import { useGetEscrowFromIndexerByContractIds } from "@trustless-work/escrow/hooks";
import type { GetEscrowsFromIndexerResponse } from "@trustless-work/escrow/types";
import type { EscrowStatus } from "@/modules/deposit/types";

const FETCH_TIMEOUT_MS = 15_000;

export function getEscrowDetailStatus(escrow: GetEscrowsFromIndexerResponse): EscrowStatus {
  const flags = escrow.flags;
  if (flags?.released) return "released";
  if (flags?.resolved) return "resolved";
  if (flags?.disputed) return "disputed";
  if (escrow.balance && escrow.balance > 0) return "funded";
  return "pending";
}

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return Promise.race([
    promise,
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("Request timed out. The deposit may not be indexed yet.")), ms),
    ),
  ]);
}

export function useDepositDetail(contractId: string) {
  const { getEscrowByContractIds } = useGetEscrowFromIndexerByContractIds();

  const [escrow, setEscrow] = useState<GetEscrowsFromIndexerResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEscrow = useCallback(async () => {
    if (!contractId?.trim()) {
      setLoading(false);
      setEscrow(null);
      setError("Missing deposit ID.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const results = await withTimeout(
        getEscrowByContractIds({ contractIds: [contractId.trim()] }),
        FETCH_TIMEOUT_MS,
      );
      const list = Array.isArray(results) ? results : [];
      setEscrow(list.length > 0 ? list[0] : null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load deposit.");
      setEscrow(null);
    } finally {
      setLoading(false);
    }
  }, [contractId, getEscrowByContractIds]);

  // Only run when contractId changes. If we depended on fetchEscrow, the SDK hook
  // returns a new function reference every render and the effect would loop forever (stuck loading).
  useEffect(() => {
    fetchEscrow();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- intentional: fetchEscrow excluded to avoid infinite re-fetch
  }, [contractId]);

  return { escrow, loading, error, setError, fetchEscrow };
}
