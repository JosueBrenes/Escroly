import Link from "next/link";
import { Building2, Plus } from "lucide-react";
import { Button } from "@/shared/ui/button";

export function EmptyState() {
  return (
    <div className="flex flex-col items-center gap-5 rounded-2xl border border-dashed border-gray-200 py-16 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-50">
        <Building2 className="h-6 w-6 text-gray-400" />
      </div>
      <div>
        <h3 className="font-semibold text-gray-900">No deposits yet</h3>
        <p className="mt-1 text-sm text-gray-500">
          Create your first escrow deposit to get started.
        </p>
      </div>
      <Button
        asChild
        className="cursor-pointer gap-2 bg-[#1a56db] text-white hover:bg-[#1545b5]"
      >
        <Link href="/deposit/new">
          <Plus className="h-4 w-4" />
          Create Deposit
        </Link>
      </Button>
    </div>
  );
}
