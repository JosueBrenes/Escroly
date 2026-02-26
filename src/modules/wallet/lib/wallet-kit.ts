import type { ModuleInterface } from "@creit.tech/stellar-wallets-kit/types";

type SdkModule = typeof import("@creit.tech/stellar-wallets-kit/sdk");
type TypesModule = typeof import("@creit.tech/stellar-wallets-kit/types");
type ModulesUtilsModule =
  typeof import("@creit.tech/stellar-wallets-kit/modules/utils");
type StellarWalletsKitStatic = SdkModule["StellarWalletsKit"];
type NetworksEnum = TypesModule["Networks"];

let walletKitPromise: Promise<{
  StellarWalletsKit: StellarWalletsKitStatic;
  Networks: NetworksEnum;
}> | null = null;

const loadWalletKit = async () => {
  if (typeof window === "undefined") {
    throw new Error("StellarWalletsKit is only available in the browser");
  }

  if (!walletKitPromise) {
    walletKitPromise = (async () => {
      const [sdk, types, modules] = await Promise.all([
        import("@creit.tech/stellar-wallets-kit/sdk") as Promise<SdkModule>,
        import("@creit.tech/stellar-wallets-kit/types") as Promise<TypesModule>,
        import(
          "@creit.tech/stellar-wallets-kit/modules/utils"
        ) as Promise<ModulesUtilsModule>,
      ]);

      const { StellarWalletsKit } = sdk;
      const { Networks } = types;
      const { defaultModules } = modules;

      StellarWalletsKit.init({
        network: Networks.TESTNET,
        modules: defaultModules(),
      });

      return { StellarWalletsKit, Networks };
    })();
  }

  return walletKitPromise;
};

export interface SignTransactionParams {
  unsignedTransaction: string;
  address: string;
}

export const openAuthModal = async (): Promise<{ address: string }> => {
  const { StellarWalletsKit } = await loadWalletKit();
  return StellarWalletsKit.authModal();
};

export const getSelectedWallet = async (): Promise<ModuleInterface> => {
  const { StellarWalletsKit } = await loadWalletKit();
  return StellarWalletsKit.selectedModule;
};

export const disconnectWalletKit = async (): Promise<void> => {
  const { StellarWalletsKit } = await loadWalletKit();
  return StellarWalletsKit.disconnect();
};

export const signTransaction = async ({
  unsignedTransaction,
  address,
}: SignTransactionParams): Promise<string> => {
  const { StellarWalletsKit, Networks } = await loadWalletKit();

  const { signedTxXdr } = await StellarWalletsKit.signTransaction(
    unsignedTransaction,
    {
      address,
      networkPassphrase: Networks.TESTNET,
    },
  );

  return signedTxXdr;
};
