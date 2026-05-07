import { ScrollView, Text, View, TouchableOpacity, FlatList, useWindowDimensions } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useRouter } from "expo-router";
import { GROUPS, STICKERS_DATA } from "@/lib/countries";
import { trpc } from "@/lib/trpc";
import { useColors } from "@/hooks/use-colors";

export default function GroupsScreen() {
  const router = useRouter();
  const colors = useColors();
  const { width } = useWindowDimensions();

  const stickersQuery = trpc.stickers.list.useQuery();
  const stickers = stickersQuery.data || [];

  // Determinar número de colunas baseado na largura da tela
  const isDesktop = width > 1024;
  const numColumns = isDesktop ? 2 : 1;

  const getGroupStats = (group: string) => {
    const countries = STICKERS_DATA[group as keyof typeof STICKERS_DATA] || [];
    const totalFigurinas = countries.length * 21; // 21 figurinhas por país

    const groupStickers = stickers.filter((s) =>
      countries.some((c) => c.code === s.countryCode)
    );

    const tenho = groupStickers.filter((s) => s.status === "T").length;
    const faltam = totalFigurinas - tenho;

    return {
      tenho,
      faltam,
      total: totalFigurinas,
      percent: totalFigurinas > 0 ? Math.round((tenho / totalFigurinas) * 100) : 0,
    };
  };

  const renderGroup = ({ item: group }: { item: string }) => {
    const stats = getGroupStats(group);
    const countries = STICKERS_DATA[group as keyof typeof STICKERS_DATA] || [];

    return (
      <TouchableOpacity
        className="bg-surface rounded-2xl p-6 gap-4 mb-4 active:opacity-70"
        style={{ marginRight: isDesktop ? 16 : 0 }}
        onPress={() => router.navigate(`/group/${group}`)}
      >
        <View className="flex-row items-center justify-between">
          <View className="gap-1 flex-1">
            <Text className="text-2xl font-bold text-foreground">Grupo {group}</Text>
            <Text className="text-base text-muted">{countries.length} países</Text>
          </View>
          <View className="items-end gap-2">
            <Text className="text-4xl font-bold text-primary">{stats.percent}%</Text>
            <Text className="text-sm text-muted">{stats.tenho}/{stats.total}</Text>
          </View>
        </View>

        {/* Progress Bar */}
        <View className="h-3 bg-border rounded-full overflow-hidden">
          <View
            className="h-full bg-primary rounded-full"
            style={{ width: `${stats.percent}%` }}
          />
        </View>

        {/* Countries Preview */}
        <View className="flex-row gap-3 flex-wrap">
          {countries.map((country) => (
            <View
              key={country.code}
              className="bg-background rounded-lg px-3 py-2"
            >
              <Text className="text-sm font-semibold text-foreground">{country.code}</Text>
            </View>
          ))}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <ScreenContainer className="bg-background">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="flex-1">
        <View className="gap-6 pb-8" style={{ paddingHorizontal: isDesktop ? 32 : 0 }}>
          {/* Header */}
          <View className="gap-2">
            <Text className="text-3xl font-bold text-foreground">Grupos da Copa 2026</Text>
            <Text className="text-base text-muted">Selecione um grupo para ver os países e figurinhas</Text>
          </View>

          {/* Groups Grid */}
          <View style={{ flexDirection: isDesktop ? "row" : "column", flexWrap: "wrap" }}>
            {GROUPS.map((group) => (
              <View
                key={group}
                style={{ width: isDesktop ? "50%" : "100%", paddingRight: isDesktop ? 8 : 0 }}
              >
                {renderGroup({ item: group })}
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
