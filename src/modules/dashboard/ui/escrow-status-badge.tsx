import type { GetEscrowsFromIndexerResponse } from "@trustless-work/escrow/types";
import { Badge } from "@/shared/ui/badge";
import { Clock, CheckCircle2, AlertTriangle } from "lucide-react";
import type { DashboardStatus } from "@/modules/dashboard/types";

export function getEscrowStatus(escrow: GetEscrowsFromIndexerResponse): DashboardStatus {
  const flags = escrow.flags;
  if (flags?.released) return "released";
  if (flags?.resolved) return "resolved";
  if (flags?.disputed) return "disputed";
  if (escrow.balance && escrow.balance > 0) return "funded";
  return "pending";
}

export function EscrowStatusBadge({ status }: { status: DashboardStatus }) {
  switch (status) {
    case "funded":
      return (
        <Badge className="border-0 bg-[#1a56db]/10 text-[#1a56db]">
          <Clock className="mr-1 h-3 w-3" />
          Active
        </Badge>
      );
    case "released":
    case "resolved":
      return (
        <Badge className="border-0 bg-emerald-50 text-emerald-600">
          <CheckCircle2 className="mr-1 h-3 w-3" />
          Released
        </Badge>
      );
    case "disputed":
      return (
        <Badge className="border-0 bg-amber-50 text-amber-600">
          <AlertTriangle className="mr-1 h-3 w-3" />
          Disputed
        </Badge>
      );
    default:
      return (
        <Badge className="border-0 bg-gray-100 text-gray-500">Pending</Badge>
      );
  }
}
