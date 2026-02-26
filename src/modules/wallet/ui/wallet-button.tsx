"use client";

import * as React from "react";
import { useWallet } from "@/modules/wallet/hooks/use-wallet";
import { useWalletContext } from "@/modules/wallet/providers/wallet-provider";
import { Button } from "@/shared/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { Check, Copy, LogOut, ChevronDown, Wallet } from "lucide-react";

export function WalletButton() {
  const { handleConnect, handleDisconnect } = useWallet();
  const { walletAddress, walletName } = useWalletContext();
  const [copied, setCopied] = React.useState(false);

  const shortAddress = React.useMemo(() => {
    if (!walletAddress) return "";
    if (walletAddress.length <= 10) return walletAddress;
    return `${walletAddress.slice(0, 6)}…${walletAddress.slice(-4)}`;
  }, [walletAddress]);

  const copyAddress = async () => {
    if (!walletAddress) return;
    try {
      await navigator.clipboard.writeText(walletAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Error copying address to clipboard", err);
    }
  };

  if (walletAddress) {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="h-10 gap-2 bg-transparent px-4 font-medium cursor-pointer"
          >
            <Wallet className="h-4 w-4" />
            <span className="hidden sm:inline">{walletName}</span>
            <span className="font-mono text-sm text-muted-foreground">
              {shortAddress}
            </span>
            <ChevronDown className="ml-1 h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-0" align="end">
          <div className="space-y-3 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Wallet className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">{walletName}</span>
              </div>
              <span className="rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground">
                Testnet
              </span>
            </div>

            <div className="rounded-lg border bg-muted/50 p-3">
              <p className="mb-1 text-xs text-muted-foreground">Address</p>
              <p className="break-all font-mono text-sm">{walletAddress}</p>
            </div>
          </div>

          <div className="border-t p-4">
            <div className="flex gap-2">
              <Button
                onClick={copyAddress}
                variant="ghost"
                size="sm"
                className="flex-1 cursor-pointer"
                disabled={copied}
              >
                {copied ? (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="mr-2 h-4 w-4" />
                    Copy
                  </>
                )}
              </Button>
              <Button
                onClick={handleDisconnect}
                variant="outline"
                size="sm"
                className="flex-1 bg-transparent text-destructive hover:text-destructive cursor-pointer"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Disconnect
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Button
      className="h-10 gap-2 px-6 font-medium cursor-pointer"
      onClick={handleConnect}
    >
      <Wallet className="h-4 w-4" />
      Connect Wallet
    </Button>
  );
}
