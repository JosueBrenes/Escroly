export interface DepositFormData {
  title: string;
  description: string;
  amount: string;
  serviceProvider: string;
  receiver: string;
  disputeResolver: string;
  platformFee: string;
}

export const INITIAL_FORM: DepositFormData = {
  title: "",
  description: "",
  amount: "",
  serviceProvider: "",
  receiver: "",
  disputeResolver: "",
  platformFee: "0",
};

/** USDC on Stellar testnet — issuer address (G...) required by API; C... contract IDs are invalid. */
export const USDC_TRUSTLINE = {
  address: "GBBD47IF6LWK7P7MDEVSCWR7DPUWV3NY3DTQEVFL4NAT4AQH3ZLLFLA5",
  symbol: "USDC",
} as const;

export type DepositStep = "form" | "signing" | "success";

export type EscrowStatus = "pending" | "funded" | "released" | "disputed" | "resolved";

export interface StatusDisplayInfo {
  label: string;
  icon: React.ElementType;
  color: string;
  bg: string;
}

/** Stored when hotel raises a dispute so resolver can see justification. */
export interface DisputeJustification {
  amountToHotel: number;
  reason: string;
  createdAt: number;
}

const DISPUTE_JUSTIFICATION_KEY = "anchor-dispute-justification";

export function getDisputeJustification(contractId: string): DisputeJustification | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(`${DISPUTE_JUSTIFICATION_KEY}:${contractId}`);
    if (!raw) return null;
    const data = JSON.parse(raw) as unknown;
    if (
      data &&
      typeof data === "object" &&
      "amountToHotel" in data &&
      "reason" in data &&
      "createdAt" in data &&
      typeof (data as DisputeJustification).reason === "string" &&
      typeof (data as DisputeJustification).createdAt === "number"
    ) {
      const d = data as DisputeJustification;
      return {
        amountToHotel: Number(d.amountToHotel),
        reason: d.reason,
        createdAt: d.createdAt,
      };
    }
  } catch {
    /* ignore */
  }
  return null;
}

export function setDisputeJustification(
  contractId: string,
  data: Omit<DisputeJustification, "createdAt">,
): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(
      `${DISPUTE_JUSTIFICATION_KEY}:${contractId}`,
      JSON.stringify({ ...data, createdAt: Date.now() }),
    );
  } catch {
    /* ignore */
  }
}
