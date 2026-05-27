"use client";
import { useCallback, useEffect, useMemo } from "react";
import { useAuthSessionStore } from "@/lib/stores/authSessionStore";
import { auth } from "@/lib/services/auth.service";
import { useQueryClient } from "@tanstack/react-query";

export function useSession() {
  const queryClient = useQueryClient();
  const session = useAuthSessionStore((s) => s.user);
  const status = useAuthSessionStore((s) => s.status);
  const setUser = useAuthSessionStore((s) => s.setUser);
  const setTokens = useAuthSessionStore((s) => s.setTokens);
  // const updateUser = useAuthSessionStore((s) => s.updateUser);
  const storeSignOut = useAuthSessionStore((s) => s.signOut);
  const hydrate = useAuthSessionStore((s) => s.hydrateFromStorage);

  const USER_KEY = process.env.NEXT_PUBLIC_USER_KEY;
  const ACCESS_KEY = process.env.NEXT_PUBLIC_ACCESS_KEY;
  const REFRESH_KEY = process.env.NEXT_PUBLIC_REFRESH_KEY;

  useEffect(() => {
    // hydrate once on mount
    hydrate();
    // cross-tab sync via storage events
    const onStorage = (e: StorageEvent) => {
      if (!e.key) return;
      // change to .env values
      if (e.key === ACCESS_KEY || e.key === REFRESH_KEY || e.key === USER_KEY) {
        hydrate();
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [hydrate, USER_KEY, ACCESS_KEY, REFRESH_KEY]);

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
    const id = session?.id;
    if (!id) return { success: false, error: "No user ID found" };
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
  }, [session?.id, setUser]);

  const isAuthenticated = useMemo(() => status === "authenticated", [status]);

  const signOut = useCallback(() => {
    storeSignOut(queryClient);
  }, [storeSignOut, queryClient]);

  return {
    session,
    status,
    isAuthenticated,
    // actions
    setUser,
    setTokens,
    // updateUser,
    signOut,
    refreshSession,
  } as const;
}
