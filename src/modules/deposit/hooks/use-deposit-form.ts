"use client";

import { useState } from "react";
import { useInitializeEscrow, useSendTransaction } from "@trustless-work/escrow/hooks";
import type { InitializeSingleReleaseEscrowResponse } from "@trustless-work/escrow/types";
import { signTransaction } from "@/modules/wallet/lib/wallet-kit";
import {
  type DepositFormData,
  type DepositStep,
  INITIAL_FORM,
  USDC_TRUSTLINE,
} from "@/modules/deposit/types";

export function useDepositForm(walletAddress: string | null) {
  const { deployEscrow } = useInitializeEscrow();
  const { sendTransaction } = useSendTransaction();

  const [form, setForm] = useState<DepositFormData>(INITIAL_FORM);
  const [step, setStep] = useState<DepositStep>("form");
  const [error, setError] = useState<string | null>(null);
  const [contractId, setContractId] = useState<string | null>(null);

  const updateField =
    (field: keyof DepositFormData) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const canSubmit =
    form.title.trim() &&
    form.amount.trim() &&
    form.serviceProvider.trim() &&
    form.receiver.trim() &&
    parseFloat(form.amount) > 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!walletAddress || !canSubmit) return;

    setError(null);
    setStep("signing");

    try {
      const payload = {
        signer: walletAddress,
        engagementId: `anchor-${Date.now()}`,
        title: form.title,
        description: form.description || `Rental deposit: ${form.title}`,
        amount: parseFloat(form.amount),
        platformFee: parseFloat(form.platformFee) || 0,
        roles: {
          approver: walletAddress,
          serviceProvider: form.serviceProvider,
          platformAddress: walletAddress,
          releaseSigner: walletAddress,
          disputeResolver: form.disputeResolver || walletAddress,
          receiver: form.receiver,
        },
        milestones: [
          { description: "Rental deposit — released if no incidents" },
        ],
        trustline: USDC_TRUSTLINE,
      };

      const response = await deployEscrow(payload, "single-release");
      if (!response.unsignedTransaction) {
        throw new Error("No transaction returned from escrow initialization.");
      }

      const signedXdr = await signTransaction({
        unsignedTransaction: response.unsignedTransaction,
        address: walletAddress,
      });
      if (!signedXdr) throw new Error("Transaction signing cancelled.");

      const result = (await sendTransaction(signedXdr)) as InitializeSingleReleaseEscrowResponse;
      setContractId(result.contractId || null);
      setStep("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setStep("form");
    }
  };

  const reset = () => {
    setForm(INITIAL_FORM);
    setStep("form");
    setContractId(null);
  };

  return {
    form,
    step,
    error,
    contractId,
    canSubmit,
    updateField,
    handleSubmit,
    reset,
  };
}
