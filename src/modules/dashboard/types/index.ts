import type { GetEscrowsFromIndexerResponse } from "@trustless-work/escrow/types";

export type EscrowListItem = GetEscrowsFromIndexerResponse;

export type DashboardStatus = "pending" | "funded" | "released" | "resolved" | "disputed";
