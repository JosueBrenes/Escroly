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

export function TrustlessWorkProvider({ children }: TrustlessWorkProviderProps) {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY?.trim() ?? "";
  const baseURL =
    process.env.NEXT_PUBLIC_TW_NETWORK === "mainnet" ? mainNet : development;

  if (typeof window !== "undefined" && !apiKey) {
    console.warn(
      "[Trustless Work] NEXT_PUBLIC_API_KEY is missing. Set it in .env and restart the dev server. Helper endpoints (e.g. get-escrows-by-role) will return 401 without it.",
    );
  }

  return (
    <TrustlessWorkConfig baseURL={baseURL} apiKey={apiKey}>
      {children}
    </TrustlessWorkConfig>
  );
}

