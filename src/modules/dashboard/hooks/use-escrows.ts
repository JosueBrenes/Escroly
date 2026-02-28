"use client";

import { useState, useCallback, useEffect } from "react";
import { useGetEscrowsFromIndexerByRole } from "@trustless-work/escrow/hooks";
import type {
  GetEscrowsFromIndexerByRoleParams,
  GetEscrowsFromIndexerResponse,
} from "@trustless-work/escrow/types";
import type { ViewRole } from "@/modules/dashboard/types";

/** Roles to fetch when showing all (legacy). */
const ROLES_TO_FETCH: GetEscrowsFromIndexerByRoleParams["role"][] = [
  "approver",
  "disputeResolver",
  "receiver",
  "serviceProvider",
];

/** Single role per view: Hotel = serviceProvider, User = receiver, Resolver = disputeResolver. */
export const ROLE_BY_VIEW: Record<ViewRole, GetEscrowsFromIndexerByRoleParams["role"]> = {
  hotel: "serviceProvider",
  user: "receiver",
  resolver: "disputeResolver",
};

function mergeByContractId(
  lists: GetEscrowsFromIndexerResponse[][],
): GetEscrowsFromIndexerResponse[] {
  const byId = new Map<string, GetEscrowsFromIndexerResponse>();
  for (const list of lists) {
    for (const e of list) {
      const id = e.contractId ?? "";
      if (id && !byId.has(id)) byId.set(id, e);
    }
  }
  return Array.from(byId.values()).sort(
    (a, b) => Number(b.updatedAt ?? 0) - Number(a.updatedAt ?? 0),
  );
}

export function useEscrows(walletAddress: string | null) {
  const { getEscrowsByRole } = useGetEscrowsFromIndexerByRole();

  const [escrows, setEscrows] = useState<GetEscrowsFromIndexerResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetched, setFetched] = useState(false);

  const fetchEscrows = useCallback(async () => {
    if (!walletAddress) return;
    setLoading(true);
    try {
      const results = await Promise.all(
        ROLES_TO_FETCH.map((role) =>
          getEscrowsByRole({
            role,
            roleAddress: walletAddress,
            orderDirection: "desc",
            orderBy: "updatedAt",
            page: 1,
          }),
        ),
      );
      const lists = results.map((r) => (Array.isArray(r) ? r : []));
      setEscrows(mergeByContractId(lists));
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

/** Fetch escrows for a single view role (Hotel / User / Resolver). */
export function useEscrowsForRole(
  walletAddress: string | null,
  viewRole: ViewRole,
) {
  const { getEscrowsByRole } = useGetEscrowsFromIndexerByRole();
  const [escrows, setEscrows] = useState<GetEscrowsFromIndexerResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetched, setFetched] = useState(false);

  const roleToFetch = ROLE_BY_VIEW[viewRole];

  const fetchEscrows = useCallback(async () => {
    if (!walletAddress) return;
    setLoading(true);
    try {
      const result = await getEscrowsByRole({
        role: roleToFetch,
        roleAddress: walletAddress,
        orderDirection: "desc",
        orderBy: "updatedAt",
        page: 1,
      });
      const list = Array.isArray(result) ? result : [];
      setEscrows(list);
    } catch {
      setEscrows([]);
    } finally {
      setLoading(false);
      setFetched(true);
    }
  }, [walletAddress, roleToFetch, getEscrowsByRole]);

  useEffect(() => {
    if (walletAddress) {
      setEscrows([]);
      setFetched(false);
    }
  }, [walletAddress, viewRole]);

  useEffect(() => {
    if (walletAddress && !fetched) {
      fetchEscrows();
    }
  }, [walletAddress, fetched, fetchEscrows]);

  return { escrows, loading, fetched, fetchEscrows };
}
