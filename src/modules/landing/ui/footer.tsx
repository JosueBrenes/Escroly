import { Anchor } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-6 text-sm text-gray-400">
        <div className="flex items-center gap-2">
          <Anchor className="h-4 w-4 text-[#1a56db]" />
          <span className="font-semibold text-gray-900">Anchor</span>
        </div>
        <span>Powered by Trustless Work</span>
      </div>
    </footer>
  );
}
