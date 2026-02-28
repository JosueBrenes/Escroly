"use client";

import { useState } from "react";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { AlertTriangle, Loader2 } from "lucide-react";

interface DisputeModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (amountToHotel: number, reason: string) => void;
  maxAmount: number;
  symbol: string;
  loading?: boolean;
}

export function DisputeModal({
  open,
  onClose,
  onSubmit,
  maxAmount,
  symbol,
  loading = false,
}: DisputeModalProps) {
  const [amount, setAmount] = useState("");
  const [reason, setReason] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseFloat(amount.replace(",", "."));
    if (!Number.isFinite(num) || num < 0 || num > maxAmount) return;
    if (!reason.trim()) return;
    onSubmit(num, reason.trim());
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        aria-hidden
      />
      <div className="relative w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100">
            <AlertTriangle className="h-5 w-5 text-amber-600" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900">Justificar disputa</h3>
            <p className="text-sm text-gray-500">
              Indica cuánto reclamas para el hotel y el motivo. El resolver verá esta información.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="dispute-amount" className="mb-1 block text-sm font-medium text-gray-700">
              Cantidad para el hotel ({symbol})
            </label>
            <Input
              id="dispute-amount"
              type="number"
              min={0}
              max={maxAmount}
              step="0.01"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="border-gray-200"
              required
            />
            <p className="mt-1 text-xs text-gray-400">Máximo: {maxAmount} {symbol}</p>
          </div>
          <div>
            <label htmlFor="dispute-reason" className="mb-1 block text-sm font-medium text-gray-700">
              Motivo de la disputa <span className="text-red-500">*</span>
            </label>
            <textarea
              id="dispute-reason"
              rows={4}
              placeholder="Ej.: Daños en el mobiliario, limpieza pendiente..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full rounded-lg border border-gray-200 bg-gray-50/50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a56db]"
              required
            />
          </div>
          <div className="flex gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 cursor-pointer"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={loading || !amount.trim() || !reason.trim()}
              className="flex-1 cursor-pointer gap-2 bg-amber-600 text-white hover:bg-amber-700"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <AlertTriangle className="h-4 w-4" />
              )}
              Iniciar disputa
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
