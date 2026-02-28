"use client";

import React from "react";
import {
  development,
  mainNet,
  TrustlessWorkConfig,
} from "@trustless-work/escrow";

interface TrustlessWorkProviderProps {
  children: React.ReactNode;
}

/**
 * Trustless Work provider — matches docs.trustlesswork.com setup.
 * Write flows (deploy, fund, release) require a valid API key from the BackOffice dApp.
 */
export function TrustlessWorkProvider({ children }: TrustlessWorkProviderProps) {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY || "";
  const baseURL =
    process.env.NEXT_PUBLIC_TW_NETWORK === "mainnet" ? mainNet : development;

  if (typeof window !== "undefined" && !apiKey.trim()) {
    console.warn(
      "[Trustless Work] 401 Unauthorized — API key missing. " +
        "Get a key from BackOffice (Testnet for dev): https://dapp.trustlesswork.com → Settings → API Keys. " +
        "Set NEXT_PUBLIC_API_KEY in .env.local and restart the dev server.",
    );
  }

  return (
    <TrustlessWorkConfig baseURL={baseURL} apiKey={apiKey}>
      {children}
    </TrustlessWorkConfig>
  );
}

