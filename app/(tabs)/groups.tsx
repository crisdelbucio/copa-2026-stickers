import { ScrollView, Text, View, TouchableOpacity, FlatList } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useRouter } from "expo-router";
import { GROUPS, STICKERS_DATA } from "@/lib/countries";
import { trpc } from "@/lib/trpc";
import { useColors } from "@/hooks/use-colors";

export default function GroupsScreen() {
  const router = useRouter();
  const colors = useColors();

  const stickersQuery = trpc.stickers.list.useQuery();
  const stickers = stickersQuery.data || [];

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
        className="bg-surface rounded-2xl p-4 gap-3 mb-3 active:opacity-70"
        onPress={() => router.navigate(`/group/${group}`)}
      >
        <View className="flex-row items-center justify-between">
          <View className="gap-1">
            <Text className="text-lg font-bold text-foreground">Grupo {group}</Text>
            <Text className="text-sm text-muted">{countries.length} países</Text>
          </View>
          <View className="items-end gap-1">
            <Text className="text-2xl font-bold text-primary">{stats.percent}%</Text>
            <Text className="text-xs text-muted">{stats.tenho}/{stats.total}</Text>
          </View>
        </View>

        {/* Progress Bar */}
        <View className="h-2 bg-border rounded-full overflow-hidden">
          <View
            className="h-full bg-primary rounded-full"
            style={{ width: `${stats.percent}%` }}
          />
        </View>

        {/* Countries Preview */}
        <View className="flex-row gap-2 flex-wrap">
          {countries.map((country) => (
            <View
              key={country.code}
              className="bg-background rounded-lg px-2 py-1"
            >
              <Text className="text-xs font-semibold text-foreground">{country.code}</Text>
            </View>
          ))}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <ScreenContainer className="bg-background">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="flex-1">
        <View className="gap-4 pb-8">
          {/* Header */}
          <View className="gap-2">
            <Text className="text-2xl font-bold text-foreground">Grupos</Text>
            <Text className="text-sm text-muted">Selecione um grupo para ver os países</Text>
          </View>

          {/* Groups List */}
          <FlatList
            data={GROUPS}
            keyExtractor={(item) => item}
            renderItem={renderGroup}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
