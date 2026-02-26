import { Wallet } from "lucide-react";

interface NotConnectedProps {
  message?: string;
}

export function NotConnected({
  message = "Connect a Stellar wallet to view your active deposits and create new ones.",
}: NotConnectedProps) {
  return (
    <div className="flex flex-col items-center gap-5 py-32 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#1a56db]/[0.06]">
        <Wallet className="h-7 w-7 text-[#1a56db]" />
      </div>
      <div>
        <h2 className="text-xl font-bold text-gray-900">Connect your wallet</h2>
        <p className="mt-1 text-gray-500">{message}</p>
      </div>
    </div>
  );
}
