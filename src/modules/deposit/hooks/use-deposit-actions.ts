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
import { setDisputeJustification } from "@/modules/deposit/types";

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

  const getErrorMessage = (err: unknown, fallback: string): string => {
    if (err instanceof Error && err.message) return err.message;
    const o = err as Record<string, unknown>;
    if (o?.message && typeof o.message === "string") return o.message;
    const ax = err as { response?: { data?: unknown; status?: number } };
    const data = ax.response?.data;
    if (data != null && typeof data === "object") {
      const d = data as Record<string, unknown>;
      const msg = d.message ?? d.error ?? d.msg;
      if (typeof msg === "string") return msg;
    }
    if (typeof data === "string") return data;
    const status = ax.response?.status;
    if (status === 400) return "Solicitud inválida. Revisa que la transacción sea correcta.";
    if (status === 401) return "No autorizado. Revisa tu API key.";
    if (status && status >= 400) return `Error del servidor (${status}). Intenta de nuevo.`;
    return fallback;
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
      if (typeof window !== "undefined") console.error("[Anchor]", actionName, err);
      setError(getErrorMessage(err, "La acción falló. Abre la consola (F12) para ver el error."));
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

  const handleDispute = (justification?: { amountToHotel: number; reason: string }) =>
    executeAction("Dispute", async () => {
      if (!walletAddress) return;
      if (justification) {
        setDisputeJustification(contractId, justification);
      }
      const res = await startDispute(
        { contractId, signer: walletAddress },
        "single-release",
      );
      if (res.unsignedTransaction) await signAndSend(res.unsignedTransaction);
    });

  const handleResolve = (escrow: GetEscrowsFromIndexerResponse) =>
    executeAction("Resolve", async () => {
      if (!walletAddress) return;
      const roles = (escrow.roles || {}) as Record<string, string | undefined>;
      const receiver = roles.receiver?.trim() ?? "";
      const amount = Number(escrow.amount);
      if (!receiver) throw new Error("Falta la dirección del receptor. No se puede resolver.");
      if (!Number.isFinite(amount) || amount <= 0) throw new Error("Monto del escrow inválido.");
      const res = await resolveDispute(
        {
          contractId,
          disputeResolver: walletAddress,
          distributions: [{ address: receiver, amount }],
        },
        "single-release",
      );
      const xdr = res?.unsignedTransaction ?? (res as { unsignedTransaction?: string })?.unsignedTransaction;
      if (!xdr) throw new Error("La API no devolvió transacción. Intenta de nuevo.");
      try {
        await signAndSend(xdr);
      } catch (signOrSendErr) {
        const msg = getErrorMessage(signOrSendErr, "");
        if (msg.toLowerCase().includes("cancel") || msg.toLowerCase().includes("denied")) {
          throw new Error("Firma cancelada. Acepta la transacción en Freighter para completar.");
        }
        if (msg) throw new Error(msg);
        throw new Error(
          "Firma en Freighter o envío de la transacción falló. Abre la consola (F12) para más detalle.",
        );
      }
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
