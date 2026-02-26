"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

export interface WalletContextValue {
  walletAddress: string | null;
  walletName: string | null;
  setWalletInfo: (address: string, name: string) => void;
  clearWalletInfo: () => void;
}

const WalletContext = createContext<WalletContextValue | undefined>(undefined);

export function WalletProvider({ children }: { children: ReactNode }) {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [walletName, setWalletName] = useState<string | null>(null);

  useEffect(() => {
    const storedAddress = localStorage.getItem("walletAddress");
    const storedName = localStorage.getItem("walletName");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (storedAddress) setWalletAddress(storedAddress);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (storedName) setWalletName(storedName);
  }, []);

  const setWalletInfo = (address: string, name: string) => {
    setWalletAddress(address);
    setWalletName(name);
    localStorage.setItem("walletAddress", address);
    localStorage.setItem("walletName", name);
  };

  const clearWalletInfo = () => {
    setWalletAddress(null);
    setWalletName(null);
    localStorage.removeItem("walletAddress");
    localStorage.removeItem("walletName");
  };

  return (
    <WalletContext.Provider
      value={{ walletAddress, walletName, setWalletInfo, clearWalletInfo }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export function useWalletContext(): WalletContextValue {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWalletContext must be used within WalletProvider");
  }
  return context;
}
