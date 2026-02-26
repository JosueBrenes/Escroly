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

export const USDC_TRUSTLINE = {
  address: "CBIELTK6YBZJU5UP2WWQEUCYKLPU6AUNZ2BQ4WWFEIE3USCIHMXQDAMA",
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
