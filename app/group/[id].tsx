import { ScrollView, Text, View, TouchableOpacity, FlatList, ActivityIndicator } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useLocalSearchParams, useRouter } from "expo-router";
import { STICKERS_DATA, FIGURINHAS_PER_COUNTRY } from "@/lib/countries";
import { trpc } from "@/lib/trpc";
import { useColors } from "@/hooks/use-colors";
import { useState } from "react";

export default function GroupDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const colors = useColors();
  const [expandedCountry, setExpandedCountry] = useState<string | null>(null);

  const stickersQuery = trpc.stickers.list.useQuery();
  const upsertMutation = trpc.stickers.upsert.useMutation();
  const deleteMutation = trpc.stickers.delete.useMutation();

  const stickers = stickersQuery.data || [];
  const groupId = String(id).toUpperCase();
  const countries = STICKERS_DATA[groupId as keyof typeof STICKERS_DATA] || [];

  const getCountryStats = (countryCode: string) => {
    const countrySt = stickers.filter((s) => s.countryCode === countryCode);
    const tenho = countrySt.filter((s) => s.status === "T").length;
    const repetidas = countrySt.filter((s) => s.status === "R").length;
    const faltam = FIGURINHAS_PER_COUNTRY - tenho;

    return { tenho, repetidas, faltam, total: FIGURINHAS_PER_COUNTRY };
  };

  const getStickerStatus = (countryCode: string, figurinhaNumber: number) => {
    return stickers.find(
      (s) => s.countryCode === countryCode && s.figurinhaNumber === figurinhaNumber
    )?.status;
  };

  const handleToggleFigurinha = async (countryCode: string, figurinhaNumber: number) => {
    const currentStatus = getStickerStatus(countryCode, figurinhaNumber);

    let newStatus: "T" | "R" | "F" | null = null;
    if (!currentStatus) {
      newStatus = "T";
    } else if (currentStatus === "T") {
      newStatus = "R";
    } else if (currentStatus === "R") {
      newStatus = "F";
    } else {
      // Delete
      await deleteMutation.mutateAsync({
        countryCode,
        figurinhaNumber,
      });
      return;
    }

    if (newStatus) {
      await upsertMutation.mutateAsync({
        countryCode,
        figurinhaNumber,
        status: newStatus,
      });
    }
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case "T":
        return "bg-success";
      case "R":
        return "bg-warning";
      case "F":
        return "bg-error";
      default:
        return "bg-surface border border-border";
    }
  };

  const getStatusLabel = (status?: string) => {
    switch (status) {
      case "T":
        return "T";
      case "R":
        return "R";
      case "F":
        return "F";
      default:
        return "";
    }
  };

  const renderCountry = ({ item: country }: { item: (typeof countries)[0] }) => {
    const stats = getCountryStats(country.code);
    const isExpanded = expandedCountry === country.code;

    return (
      <View className="gap-3 mb-4">
        <TouchableOpacity
          className="bg-surface rounded-2xl p-4 gap-3 active:opacity-70"
          onPress={() => setExpandedCountry(isExpanded ? null : country.code)}
        >
          <View className="flex-row items-center justify-between">
            <View className="gap-1 flex-1">
              <Text className="text-lg font-semibold text-foreground">{country.name}</Text>
              <Text className="text-sm text-muted">{country.code}</Text>
            </View>
            <View className="items-end gap-1">
              <Text className="text-lg font-bold text-primary">
                {Math.round((stats.tenho / stats.total) * 100)}%
              </Text>
              <Text className="text-xs text-muted">{stats.tenho}/{stats.total}</Text>
            </View>
          </View>

          {/* Progress Bar */}
          <View className="h-2 bg-border rounded-full overflow-hidden">
            <View
              className="h-full bg-primary rounded-full"
              style={{ width: `${(stats.tenho / stats.total) * 100}%` }}
            />
          </View>
        </TouchableOpacity>

        {/* Figurinhas Grid */}
        {isExpanded && (
          <View className="bg-surface rounded-2xl p-4 gap-3">
            <View className="flex-row flex-wrap gap-2">
              {Array.from({ length: FIGURINHAS_PER_COUNTRY }).map((_, index) => {
                const status = getStickerStatus(country.code, index);
                const isLoading =
                  upsertMutation.isPending || deleteMutation.isPending;

                return (
                  <TouchableOpacity
                    key={index}
                    className={`w-12 h-12 rounded-lg items-center justify-center ${getStatusColor(
                      status
                    )} active:opacity-70`}
                    onPress={() => handleToggleFigurinha(country.code, index)}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <ActivityIndicator size="small" color={colors.foreground} />
                    ) : (
                      <>
                        {status ? (
                          <Text className="text-xs font-bold text-white">
                            {getStatusLabel(status)}
                          </Text>
                        ) : (
                          <Text className="text-xs font-bold text-muted">{index}</Text>
                        )}
                      </>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Legend */}
            <View className="border-t border-border pt-3 gap-2">
              <View className="flex-row gap-4">
                <View className="flex-row items-center gap-2">
                  <View className="w-4 h-4 rounded bg-success" />
                  <Text className="text-xs text-muted">Tenho</Text>
                </View>
                <View className="flex-row items-center gap-2">
                  <View className="w-4 h-4 rounded bg-warning" />
                  <Text className="text-xs text-muted">Repetida</Text>
                </View>
                <View className="flex-row items-center gap-2">
                  <View className="w-4 h-4 rounded bg-error" />
                  <Text className="text-xs text-muted">Falta</Text>
                </View>
              </View>
            </View>
          </View>
        )}
      </View>
    );
  };

  return (
    <ScreenContainer className="bg-background">
      <View className="flex-row items-center gap-4 mb-6">
        <TouchableOpacity onPress={() => router.back()} className="p-2 active:opacity-70">
          <Text className="text-2xl">←</Text>
        </TouchableOpacity>
        <View>
          <Text className="text-2xl font-bold text-foreground">Grupo {groupId}</Text>
          <Text className="text-sm text-muted">{countries.length} países</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="flex-1">
        <View className="pb-8">
          <FlatList
            data={countries}
            keyExtractor={(item) => item.code}
            renderItem={renderCountry}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
