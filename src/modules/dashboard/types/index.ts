/** Role used to filter dashboard and restrict actions (create = only Hotel). */
export type ViewRole = "hotel" | "user" | "resolver";

export const VIEW_ROLE_LABELS: Record<ViewRole, string> = {
  hotel: "Hotel / Entidad",
  user: "Usuario",
  resolver: "Dispute Resolver",
};

/** Escrow status for list/dashboard display. */
export type DashboardStatus = "pending" | "funded" | "released" | "disputed" | "resolved";
