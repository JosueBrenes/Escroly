"use client";

import { useState, useCallback, useEffect } from "react";
import type { ViewRole } from "@/modules/dashboard/types";

const STORAGE_KEY = "anchor-view-role";

function getStoredRole(): ViewRole {
  if (typeof window === "undefined") return "user";
  const v = localStorage.getItem(STORAGE_KEY);
  if (v === "hotel" || v === "resolver") return v;
  return "user";
}

export function useViewRole(): [ViewRole, (role: ViewRole) => void] {
  const [role, setRoleState] = useState<ViewRole>("user");

  useEffect(() => {
    setRoleState(getStoredRole());
  }, []);

  const setRole = useCallback((newRole: ViewRole) => {
    setRoleState(newRole);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, newRole);
    }
  }, []);

  return [role, setRole];
}
