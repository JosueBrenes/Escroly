import { Clock, Shield, CheckCircle2, AlertTriangle, Scale } from "lucide-react";
import type { EscrowStatus, StatusDisplayInfo } from "@/modules/deposit/types";

const STATUS_MAP: Record<EscrowStatus, StatusDisplayInfo> = {
  pending: { label: "Awaiting Funding", icon: Clock, color: "text-gray-500", bg: "bg-gray-50" },
  funded: { label: "Active", icon: Shield, color: "text-[#1a56db]", bg: "bg-[#1a56db]/[0.06]" },
  released: { label: "Released", icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50" },
  disputed: { label: "Disputed", icon: AlertTriangle, color: "text-amber-600", bg: "bg-amber-50" },
  resolved: { label: "Resolved", icon: Scale, color: "text-[#1a56db]", bg: "bg-[#1a56db]/[0.06]" },
};

export function getStatusDisplay(status: EscrowStatus): StatusDisplayInfo {
  return STATUS_MAP[status] ?? STATUS_MAP.pending;
}
