import { create } from "zustand";
import {  User } from "@/lib/services/auth.service";
import type { QueryClient } from "@tanstack/react-query";

export type SessionStatus = "loading" | "authenticated" | "unauthenticated";

interface AuthSessionState {
  user: User | null;

  status: SessionStatus;

  // Actions
  hydrateFromStorage: () => Promise<void>;

  setUser: (user: User | null) => void;
  // updateUser: (patch: Partial<User>) => Promise<void>;
  signOut: (queryClient?: QueryClient) => void;
}

const USER_KEY = `${process.env.NEXT_PUBLIC_USER_KEY}`;
const ACCESS_KEY = `${process.env.NEXT_PUBLIC_ACCESS_KEY}`;
const REFRESH_KEY = `${process.env.NEXT_PUBLIC_REFRESH_KEY}`;

const readJSON = <T>(key: string): T | null => {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
};

const writeJSON = (key: string, value: unknown) => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
};

export const useAuthSessionStore = create<AuthSessionState>((set, get) => ({
  user: null,
  status: "loading",

  hydrateFromStorage: async () => {
    // Determine status from storage
    const access =
      typeof window !== "undefined" ? localStorage.getItem(ACCESS_KEY) : null;
    const storedUser = readJSON<User>(USER_KEY);

    if (!access || !storedUser) {
      set({ user: null, status: "unauthenticated" });
      return;
    }

    set({ user: storedUser, status: "authenticated" });
  },

  setUser: (user) => {
    if (typeof window !== "undefined") {
      if (user) writeJSON(USER_KEY, user);
      else localStorage.removeItem(USER_KEY);
    }
    set({ user, status: user ? "authenticated" : "unauthenticated" });
  },

  // updateUser: async (patch) => {
  //   const current = get().user;
  //   if (!current?.id) return;
  //   const res = await auth.updateUserById({ id: current.id, payload: patch });
  //   if (res?.user) {
  //     writeJSON(USER_KEY, res.user);
  //     set({ user: res.user, status: "authenticated" });
  //   }
  // },

  signOut: (queryClient?: QueryClient) => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(ACCESS_KEY);
      localStorage.removeItem(REFRESH_KEY);
      localStorage.removeItem(USER_KEY);
    }

    // Clear user-specific query cache
    if (queryClient) {
      queryClient.removeQueries({ queryKey: ["cart"] });
      queryClient.removeQueries({ queryKey: ["orders"] });
      queryClient.removeQueries({ queryKey: ["orderDetails"] });
      queryClient.removeQueries({ queryKey: ["trackOrder"] });
      queryClient.removeQueries({ queryKey: ["favourites"] });
      queryClient.removeQueries({ queryKey: ["addresses"] });
      queryClient.removeQueries({ queryKey: ["walletBalance"] });
      queryClient.removeQueries({ queryKey: ["transactionRecords"] });
      queryClient.removeQueries({ queryKey: ["checkoutPreview"] });
      queryClient.removeQueries({ queryKey: ["reviews"] });
    }

    set({ user: null, status: "unauthenticated" });
  },
}));
