import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { StepsList } from "@/modules/how-it-works/ui/steps-list";

export default function HowItWorksPage() {
  return (
    <div className="flex flex-col bg-white">
      {/* Header */}
      <section className="relative overflow-hidden bg-white">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-[#1a56db]/[0.05] blur-[120px]" />
        </div>

        <div className="mx-auto max-w-5xl px-6 pb-6 pt-20 text-center sm:pt-24">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#1a56db]">
            How It Works
          </p>
          <h1 className="mt-3 text-balance text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            From deposit to resolution in 6 steps
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-pretty leading-relaxed text-gray-500">
            Anchor replaces uncertainty with a clear, auditable process.
            Here&rsquo;s exactly what happens at each stage.
          </p>
        </div>
      </section>

      <StepsList />

      {/* CTA */}
      <section className="bg-white pb-20">
        <div className="flex flex-col items-center gap-4 text-center">
          <p className="text-gray-500">
            Compatible with traditional fiat payments. End users never need to
            interact with crypto.
          </p>
          <Button
            asChild
            size="lg"
            className="cursor-pointer bg-[#1a56db] px-8 text-white shadow-lg shadow-[#1a56db]/25 hover:bg-[#1545b5]"
          >
            <Link href="/deposit/new">
              Create Your First Deposit
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
