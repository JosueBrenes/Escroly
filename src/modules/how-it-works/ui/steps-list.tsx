import {
  FileText,
  Wallet,
  Eye,
  Clock,
  CheckCircle2,
  ShieldAlert,
} from "lucide-react";
import { StepItem } from "./step-item";

const steps = [
  {
    number: "01",
    icon: FileText,
    title: "Define the terms",
    description:
      "The property owner or hotel creates a deposit escrow with clear conditions: amount, duration, rules for damage claims, and who the parties are. Everything is transparent from the start.",
    role: "Property owner / Hotel",
  },
  {
    number: "02",
    icon: Wallet,
    title: "Tenant funds the deposit",
    description:
      "The tenant sends the deposit to a neutral escrow — not to the landlord's account. The funds are held securely with conditions visible to everyone. No card numbers surrendered.",
    role: "Tenant / Guest",
  },
  {
    number: "03",
    icon: Eye,
    title: "Transparent rental period",
    description:
      "During the stay or rental, both parties can see the escrow status. Any claim must be backed by documented evidence — photos, reports, timestamped records. No arbitrary decisions.",
    role: "Both parties",
  },
  {
    number: "04",
    icon: Clock,
    title: "Rental ends",
    description:
      "When the rental period is over, the escrow evaluation begins. The system checks whether any claims were raised and validates evidence before releasing funds.",
    role: "Automatic",
  },
  {
    number: "05",
    icon: CheckCircle2,
    title: "Deposit released",
    description:
      "If there are no incidents, the full deposit returns to the tenant automatically. If damage is proven with evidence, the corresponding amount goes to the owner. Fair and verifiable.",
    role: "Automatic",
  },
  {
    number: "06",
    icon: ShieldAlert,
    title: "Dispute resolution",
    description:
      "In case of conflict, the escrow prevents any unilateral charges. A neutral dispute resolver reviews the evidence and determines the fair outcome for both parties.",
    role: "Dispute resolver",
  },
];

export function StepsList() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-4xl px-6 py-16">
        <div className="relative">
          <div className="absolute left-6 top-0 hidden h-full w-px bg-[#1a56db]/10 sm:block" />
          <div className="flex flex-col gap-14">
            {steps.map((step) => (
              <StepItem key={step.number} {...step} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
