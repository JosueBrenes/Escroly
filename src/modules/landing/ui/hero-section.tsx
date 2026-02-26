import Link from "next/link";
import { Anchor, ArrowRight } from "lucide-react";
import { Button } from "@/shared/ui/button";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#1a56db]/[0.05] blur-[120px]" />
      </div>

      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-6 py-28 text-center sm:py-36">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#1a56db]/15 bg-[#1a56db]/[0.04] px-4 py-1.5 text-sm font-medium text-[#1a56db]">
          <Anchor className="h-4 w-4" />
          Decentralized Trust Infrastructure
        </div>

        <h1 className="max-w-3xl text-balance text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
          Rental deposits that{" "}
          <span className="text-[#1a56db]">protect everyone</span>
        </h1>

        <p className="max-w-2xl text-pretty text-lg leading-relaxed text-gray-500">
          Programmable escrow with clear rules and verifiable evidence. No
          arbitrary charges. No &ldquo;my word against yours.&rdquo; Just trust,
          built into the flow.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
          <Button
            asChild
            size="lg"
            className="cursor-pointer bg-[#1a56db] px-8 text-white shadow-lg shadow-[#1a56db]/25 hover:bg-[#1545b5]"
          >
            <Link href="/how-it-works">
              Learn More
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="cursor-pointer border-gray-200 bg-gray-800 px-8 text-white hover:bg-gray-800"
          >
            <Link href="/dashboard">Go to Dashboard</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
