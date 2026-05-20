"use client";
import { useCallback, useEffect, useMemo } from "react";
import { useAuthSessionStore } from "@/lib/stores/authSessionStore";
import { auth } from "@/lib/services/auth.service";
import { useQueryClient } from "@tanstack/react-query";

export function useSession() {
  const queryClient = useQueryClient();
  const user = useAuthSessionStore((s) => s.user);
  const status = useAuthSessionStore((s) => s.status);
  const setUser = useAuthSessionStore((s) => s.setUser);
  const updateUser = useAuthSessionStore((s) => s.updateUser);
  const storeSignOut = useAuthSessionStore((s) => s.signOut);
  const hydrate = useAuthSessionStore((s) => s.hydrateFromStorage);

  useEffect(() => {
    // hydrate once on mount
    hydrate();
    // cross-tab sync via storage events
    const onStorage = (e: StorageEvent) => {
      if (!e.key) return;
      // change to .env values
      if (
        e.key === "auth_token" ||
        e.key === "refresh_token" ||
        e.key === "user"
      ) {
        hydrate();
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [hydrate]);

  // Listen for auth logout events from API layer  (token refresh failure)
  useEffect(() => {
    const onLogout = () => {
      storeSignOut(queryClient);
    };

    window.addEventListener("auth:logout", onLogout);

    return () => {
      window.removeEventListener("auth:logout", onLogout);
    };
  }, [storeSignOut, queryClient]);

  const refreshSession = useCallback(async () => {
    const id = user?.id;
    try {
      const response = await auth.getUserById(id);
      if (response?.data) {
        setUser(response.data);
        return { success: true, data: response.data };
      }
      return { success: false, error: "No data returned from server" };
    } catch (error) {
      console.error("Failed to refresh session:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Failed to refresh session";
      return { success: false, error: errorMessage };
    }
  }, [user?.id, setUser]);

  const isAuthenticated = useMemo(() => status === "authenticated", [status]);

  const signOut = useCallback(() => {
    storeSignOut(queryClient);
  }, [storeSignOut, queryClient]);

  return {
    user,
    status,
    isAuthenticated,
    // actions
    setUser,
    updateUser,
    signOut,
    refreshSession,
  } as const;
}
