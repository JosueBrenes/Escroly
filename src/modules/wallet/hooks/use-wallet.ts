import {
  openAuthModal,
  disconnectWalletKit,
  getSelectedWallet,
} from "@/modules/wallet/lib/wallet-kit";
import { useWalletContext } from "@/modules/wallet/providers/wallet-provider";

export function useWallet() {
  const { setWalletInfo, clearWalletInfo } = useWalletContext();

  const connectWallet = async () => {
    const { address } = await openAuthModal();
    const { productName } = await getSelectedWallet();
    setWalletInfo(address, productName);
  };

  const disconnectWallet = async () => {
    await disconnectWalletKit();
    clearWalletInfo();
  };

  const handleConnect = async () => {
    try {
      await connectWallet();
    } catch (error: unknown) {
      if (
        typeof error === "object" &&
        error !== null &&
        "code" in error &&
        (error as { code: number }).code === -1
      ) {
        return;
      }
      console.error("Error connecting wallet:", error);
    }
  };

  const handleDisconnect = async () => {
    try {
      await disconnectWallet();
    } catch (error) {
      console.error("Error disconnecting wallet:", error);
    }
  };

  return { connectWallet, disconnectWallet, handleConnect, handleDisconnect };
}
