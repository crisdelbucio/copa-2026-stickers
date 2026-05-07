import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { trpc } from "@/lib/trpc";

interface StickerStats {
  total: number;
  tenho: number;
  repetidas: number;
  faltam: number;
}

interface AuthContextType {
  user: any;
  isAuthenticated: boolean;
  loading: boolean;
  logout: () => void;
  stickerStats: StickerStats | null;
  refetchStats: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated, loading, logout } = useAuth();
  const [stickerStats, setStickerStats] = useState<StickerStats | null>(null);

  const statsQuery = trpc.stickers.stats.useQuery(undefined, {
    enabled: isAuthenticated && !loading,
  });

  useEffect(() => {
    if (statsQuery.data) {
      setStickerStats(statsQuery.data);
    }
  }, [statsQuery.data]);

  const refetchStats = () => {
    statsQuery.refetch();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        logout,
        stickerStats,
        refetchStats,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within AuthProvider");
  }
  return context;
}
