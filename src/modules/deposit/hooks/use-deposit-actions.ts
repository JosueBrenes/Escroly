"use client";

import { useState } from "react";
import {
  useFundEscrow,
  useApproveMilestone,
  useStartDispute,
  useReleaseFunds,
  useResolveDispute,
  useSendTransaction,
} from "@trustless-work/escrow/hooks";
import type { GetEscrowsFromIndexerResponse } from "@trustless-work/escrow/types";
import { signTransaction } from "@/modules/wallet/lib/wallet-kit";

export function useDepositActions(
  contractId: string,
  walletAddress: string | null,
  onSuccess: () => Promise<void>,
) {
  const { fundEscrow } = useFundEscrow();
  const { approveMilestone } = useApproveMilestone();
  const { startDispute } = useStartDispute();
  const { releaseFunds } = useReleaseFunds();
  const { resolveDispute } = useResolveDispute();
  const { sendTransaction } = useSendTransaction();

  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  const signAndSend = async (unsignedTransaction: string) => {
    if (!walletAddress) throw new Error("Wallet not connected.");
    const signedXdr = await signTransaction({ unsignedTransaction, address: walletAddress });
    if (!signedXdr) throw new Error("Transaction signing cancelled.");
    return sendTransaction(signedXdr);
  };

  const executeAction = async (actionName: string, action: () => Promise<void>) => {
    setActionLoading(actionName);
    setError(null);
    setActionSuccess(null);
    try {
      await action();
      setActionSuccess(actionName);
      await onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : `${actionName} failed.`);
    } finally {
      setActionLoading(null);
    }
  };

  const handleFund = (escrow: GetEscrowsFromIndexerResponse) =>
    executeAction("Fund", async () => {
      if (!walletAddress) return;
      const res = await fundEscrow(
        { contractId, signer: walletAddress, amount: escrow.amount },
        "single-release",
      );
      if (res.unsignedTransaction) await signAndSend(res.unsignedTransaction);
    });

  const handleApproveAndRelease = () =>
    executeAction("Release", async () => {
      if (!walletAddress) return;
      const approveRes = await approveMilestone(
        { contractId, milestoneIndex: "0", approver: walletAddress },
        "single-release",
      );
      if (approveRes.unsignedTransaction) await signAndSend(approveRes.unsignedTransaction);
      const releaseRes = await releaseFunds(
        { contractId, releaseSigner: walletAddress },
        "single-release",
      );
      if (releaseRes.unsignedTransaction) await signAndSend(releaseRes.unsignedTransaction);
    });

  const handleDispute = () =>
    executeAction("Dispute", async () => {
      if (!walletAddress) return;
      const res = await startDispute(
        { contractId, signer: walletAddress },
        "single-release",
      );
      if (res.unsignedTransaction) await signAndSend(res.unsignedTransaction);
    });

  const handleResolve = (escrow: GetEscrowsFromIndexerResponse) =>
    executeAction("Resolve", async () => {
      if (!walletAddress) return;
      const roles = escrow.roles as { receiver?: string };
      const res = await resolveDispute(
        {
          contractId,
          disputeResolver: walletAddress,
          distributions: [{ address: roles.receiver || "", amount: escrow.amount }],
        },
        "single-release",
      );
      if (res.unsignedTransaction) await signAndSend(res.unsignedTransaction);
    });

  return {
    actionLoading,
    error,
    actionSuccess,
    handleFund,
    handleApproveAndRelease,
    handleDispute,
    handleResolve,
  };
}
