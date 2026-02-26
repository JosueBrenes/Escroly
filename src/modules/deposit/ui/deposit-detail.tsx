"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useWalletContext } from "@/modules/wallet/providers/wallet-provider";
import { useDepositDetail, getEscrowDetailStatus } from "@/modules/deposit/hooks/use-deposit-detail";
import { useDepositActions } from "@/modules/deposit/hooks/use-deposit-actions";
import { getStatusDisplay } from "@/modules/deposit/ui/deposit-status";
import { RoleRow } from "@/modules/deposit/ui/role-row";
import { DepositActions } from "@/modules/deposit/ui/deposit-actions";
import { NotConnected } from "@/modules/dashboard/ui/not-connected";
import { Button } from "@/shared/ui/button";
import { Badge } from "@/shared/ui/badge";
import {
  ArrowLeft,
  RefreshCw,
  DollarSign,
  User,
  Building2,
  Scale,
  FileCheck,
  Ban,
} from "lucide-react";

export function DepositDetailView() {
  const params = useParams();
  const contractId = params.id as string;
  const { walletAddress } = useWalletContext();

  const { escrow, loading, error: loadError, fetchEscrow } = useDepositDetail(contractId);
  const {
    actionLoading,
    error: actionError,
    actionSuccess,
    handleFund,
    handleApproveAndRelease,
    handleDispute,
    handleResolve,
  } = useDepositActions(contractId, walletAddress, fetchEscrow);

  if (!walletAddress) {
    return (
      <div className="bg-white">
        <div className="mx-auto max-w-3xl px-6">
          <NotConnected message="Connect a Stellar wallet to view this deposit." />
        </div>
      </div>
    );
  }

  const status = escrow ? getEscrowDetailStatus(escrow) : "pending";
  const { label: statusLabel, icon: StatusIcon, color: statusColor, bg: statusBg } =
    getStatusDisplay(status);

  const roles = (escrow?.roles || {}) as Record<string, string>;
  const serviceProvider = roles.serviceProvider || "";
  const receiver = roles.receiver || "";
  const disputeResolver = roles.disputeResolver || "";
  const approver = roles.approver || "";

  const isOwner = walletAddress === serviceProvider;
  const isTenant = walletAddress === receiver;
  const isResolver = walletAddress === disputeResolver;
  const isApprover = walletAddress === approver;

  const error = actionError || loadError;

  return (
    <div className="flex flex-col bg-white">
      <div className="mx-auto w-full max-w-3xl px-6 py-10">
        <Link
          href="/dashboard"
          className="mb-6 inline-flex items-center gap-1 text-sm text-gray-400 transition-colors hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>

        {loading ? (
          <div className="flex flex-col items-center gap-3 py-20 text-gray-400">
            <RefreshCw className="h-6 w-6 animate-spin" />
            <p className="text-sm">Loading deposit...</p>
          </div>
        ) : !escrow ? (
          <div className="flex flex-col items-center gap-4 rounded-2xl border border-gray-100 p-10 text-center shadow-sm">
            <Ban className="h-8 w-8 text-gray-400" />
            <h2 className="text-xl font-bold text-gray-900">Deposit not found</h2>
            <p className="text-sm text-gray-500">
              {loadError || "This contract ID doesn't match any known escrow."}
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            {/* Header */}
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                  {escrow.title}
                </h1>
                {escrow.description && (
                  <p className="mt-1 text-sm text-gray-500">{escrow.description}</p>
                )}
                <p className="mt-2 break-all font-mono text-xs text-gray-400">
                  {contractId}
                </p>
              </div>
              <Badge className={`gap-1 border-0 ${statusColor} ${statusBg}`}>
                <StatusIcon className="h-3.5 w-3.5" />
                {statusLabel}
              </Badge>
            </div>

            {/* Amount */}
            <div className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#1a56db]/[0.07]">
                <DollarSign className="h-6 w-6 text-[#1a56db]" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Deposit Amount</p>
                <p className="text-3xl font-bold text-gray-900">
                  {escrow.amount}{" "}
                  <span className="text-base font-normal text-gray-400">
                    {escrow.trustline?.symbol || "USDC"}
                  </span>
                </p>
              </div>
              {typeof escrow.balance === "number" && (
                <div className="ml-auto text-right">
                  <p className="text-xs text-gray-400">Balance</p>
                  <p className="text-lg font-semibold text-gray-900">{escrow.balance}</p>
                </div>
              )}
            </div>

            {/* Parties */}
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <h3 className="mb-2 text-sm font-bold text-gray-900">Parties</h3>
              <div className="flex flex-col divide-y divide-gray-100">
                <RoleRow label="Property Owner" address={serviceProvider} icon={Building2} />
                <RoleRow label="Tenant" address={receiver} icon={User} />
                <RoleRow label="Dispute Resolver" address={disputeResolver} icon={Scale} />
                <RoleRow label="Approver" address={approver} icon={FileCheck} />
              </div>
            </div>

            {/* Your Role */}
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <h3 className="mb-3 text-sm font-bold text-gray-900">Your Role</h3>
              <div className="flex flex-wrap gap-2">
                {isOwner && (
                  <Badge className="border-0 bg-gray-100 text-gray-700">Property Owner</Badge>
                )}
                {isTenant && (
                  <Badge className="border-0 bg-gray-100 text-gray-700">Tenant</Badge>
                )}
                {isResolver && (
                  <Badge className="border-0 bg-gray-100 text-gray-700">Dispute Resolver</Badge>
                )}
                {isApprover && !isOwner && !isTenant && (
                  <Badge className="border-0 bg-gray-100 text-gray-700">Approver</Badge>
                )}
                {!isOwner && !isTenant && !isResolver && !isApprover && (
                  <Badge className="border-0 bg-gray-50 text-gray-400">Observer</Badge>
                )}
              </div>
            </div>

            {/* Milestones */}
            {escrow.milestones.length > 0 && (
              <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <h3 className="mb-3 text-sm font-bold text-gray-900">Conditions</h3>
                <div className="space-y-2">
                  {escrow.milestones.map((m, i) => (
                    <div key={i} className="flex items-start gap-3 rounded-xl bg-gray-50 p-3">
                      <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#1a56db]/10 text-xs font-bold text-[#1a56db]">
                        {i + 1}
                      </div>
                      <div>
                        <p className="text-sm text-gray-700">{m.description}</p>
                        {m.status && (
                          <p className="mt-0.5 text-xs text-gray-400">Status: {m.status}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <DepositActions
              escrow={escrow}
              status={status}
              actionLoading={actionLoading}
              isApprover={isApprover}
              isOwner={isOwner}
              isTenant={isTenant}
              isResolver={isResolver}
              onFund={() => handleFund(escrow)}
              onRelease={handleApproveAndRelease}
              onDispute={handleDispute}
              onResolve={() => handleResolve(escrow)}
            />

            {/* Feedback */}
            {error && (
              <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600 ring-1 ring-red-100">
                {error}
              </div>
            )}
            {actionSuccess && (
              <div className="rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-600 ring-1 ring-emerald-100">
                {actionSuccess} completed successfully.
              </div>
            )}

            <div className="flex justify-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={fetchEscrow}
                className="cursor-pointer gap-2 text-gray-400 hover:text-gray-900"
              >
                <RefreshCw className="h-4 w-4" />
                Refresh Status
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
