import type React from "react";

interface StepItemProps {
  number: string;
  icon: React.ElementType;
  title: string;
  description: string;
  role: string;
}

export function StepItem({ number, icon: Icon, title, description, role }: StepItemProps) {
  return (
    <div className="relative flex gap-6 sm:gap-8">
      <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-[#1a56db]/20 bg-[#1a56db]/[0.06] text-sm font-bold text-[#1a56db]">
        {number}
      </div>

      <div className="flex flex-1 flex-col gap-2 pb-2">
        <div className="flex flex-wrap items-center gap-3">
          <Icon className="h-5 w-5 text-[#1a56db]/60" />
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <span className="rounded-full bg-[#1a56db]/[0.06] px-2.5 py-0.5 text-xs font-medium text-[#1a56db]">
            {role}
          </span>
        </div>
        <p className="max-w-xl leading-relaxed text-gray-500">{description}</p>
      </div>
    </div>
  );
}
