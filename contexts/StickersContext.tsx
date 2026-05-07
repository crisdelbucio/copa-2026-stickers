import React, { createContext, useContext, useEffect, useState } from "react";
import { trpc } from "@/lib/trpc";

export interface UserSticker {
  id: number;
  userId: number;
  countryCode: string;
  figurinhaNumber: number;
  status: "T" | "R" | "F";
  createdAt: Date;
  updatedAt: Date;
}

interface StickersContextType {
  stickers: UserSticker[];
  loading: boolean;
  updateSticker: (countryCode: string, figurinhaNumber: number, status: "T" | "R" | "F") => Promise<void>;
  deleteSticker: (countryCode: string, figurinhaNumber: number) => Promise<void>;
  getStickersByCountry: (countryCode: string) => UserSticker[];
  getCountryStats: (countryCode: string) => { tenho: number; repetidas: number; faltam: number };
  refetch: () => void;
}

const StickersContext = createContext<StickersContextType | undefined>(undefined);

export function StickersProvider({ children }: { children: React.ReactNode }) {
  const [stickers, setStickers] = useState<UserSticker[]>([]);
  const [loading, setLoading] = useState(false);

  const listQuery = trpc.stickers.list.useQuery();
  const upsertMutation = trpc.stickers.upsert.useMutation();
  const deleteMutation = trpc.stickers.delete.useMutation();

  useEffect(() => {
    if (listQuery.data) {
      setStickers(listQuery.data);
    }
  }, [listQuery.data]);

  const updateSticker = async (countryCode: string, figurinhaNumber: number, status: "T" | "R" | "F") => {
    setLoading(true);
    try {
      await upsertMutation.mutateAsync({
        countryCode,
        figurinhaNumber,
        status,
      });
      // Update local state
      const existing = stickers.find(
        (s) => s.countryCode === countryCode && s.figurinhaNumber === figurinhaNumber
      );
      if (existing) {
        setStickers(
          stickers.map((s) =>
            s.countryCode === countryCode && s.figurinhaNumber === figurinhaNumber
              ? { ...s, status, updatedAt: new Date() }
              : s
          )
        );
      } else {
        setStickers([
          ...stickers,
          {
            id: Math.random(),
            userId: 0,
            countryCode,
            figurinhaNumber,
            status,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ]);
      }
    } finally {
      setLoading(false);
    }
  };

  const deleteSticker = async (countryCode: string, figurinhaNumber: number) => {
    setLoading(true);
    try {
      await deleteMutation.mutateAsync({
        countryCode,
        figurinhaNumber,
      });
      setStickers(
        stickers.filter(
          (s) => !(s.countryCode === countryCode && s.figurinhaNumber === figurinhaNumber)
        )
      );
    } finally {
      setLoading(false);
    }
  };

  const getStickersByCountry = (countryCode: string): UserSticker[] => {
    return stickers.filter((s) => s.countryCode === countryCode);
  };

  const getCountryStats = (countryCode: string) => {
    const countrySt = getStickersByCountry(countryCode);
    return {
      tenho: countrySt.filter((s) => s.status === "T").length,
      repetidas: countrySt.filter((s) => s.status === "R").length,
      faltam: countrySt.filter((s) => s.status === "F").length,
    };
  };

  const refetch = () => {
    listQuery.refetch();
  };

  return (
    <StickersContext.Provider
      value={{
        stickers,
        loading,
        updateSticker,
        deleteSticker,
        getStickersByCountry,
        getCountryStats,
        refetch,
      }}
    >
      {children}
    </StickersContext.Provider>
  );
}

export function useStickers() {
  const context = useContext(StickersContext);
  if (!context) {
    throw new Error("useStickers must be used within StickersProvider");
  }
  return context;
}
