"use client";

import { useState, useCallback, useEffect } from "react";
import { useGetEscrowsFromIndexerByRole } from "@trustless-work/escrow/hooks";
import type {
  GetEscrowsFromIndexerByRoleParams,
  GetEscrowsFromIndexerResponse,
} from "@trustless-work/escrow/types";

export function useEscrows(walletAddress: string | null) {
  const { getEscrowsByRole } = useGetEscrowsFromIndexerByRole();

  const [escrows, setEscrows] = useState<GetEscrowsFromIndexerResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetched, setFetched] = useState(false);

  const fetchEscrows = useCallback(async () => {
    if (!walletAddress) return;
    setLoading(true);
    try {
      const payload: GetEscrowsFromIndexerByRoleParams = {
        role: "approver",
        roleAddress: walletAddress,
        orderDirection: "desc",
        orderBy: "updatedAt",
        page: 1,
      };
      const result = await getEscrowsByRole(payload);
      setEscrows(Array.isArray(result) ? result : []);
    } catch {
      setEscrows([]);
    } finally {
      setLoading(false);
      setFetched(true);
    }
  }, [walletAddress, getEscrowsByRole]);

  useEffect(() => {
    if (walletAddress && !fetched) {
      fetchEscrows();
    }
  }, [walletAddress, fetched, fetchEscrows]);

  return { escrows, loading, fetched, fetchEscrows };
}
