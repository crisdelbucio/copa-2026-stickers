import { ScrollView, Text, View, TouchableOpacity, useWindowDimensions, Image } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "expo-router";
import { trpc } from "@/lib/trpc";

export default function HomeScreen() {
  const { user } = useAuth();
  const router = useRouter();
  const { width } = useWindowDimensions();

  const statsQuery = trpc.stickers.stats.useQuery();
  const stats = statsQuery.data || { total: 0, tenho: 0, repetidas: 0, faltam: 0 };

  const isDesktop = width > 1024;

  const percentComplete = stats.total > 0 ? Math.round((stats.tenho / stats.total) * 100) : 0;

  return (
    <ScreenContainer className="bg-background">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="flex-1">
        <View
          className="gap-8 pb-8"
          style={{ paddingHorizontal: isDesktop ? 48 : 24 }}
        >
          {/* Header */}
          <View className="gap-4">
            <View className="flex-row items-center justify-between">
              <View className="gap-2 flex-1">
                <Text className="text-4xl font-bold text-foreground">
                  Bem-vindo, {user?.name?.split(" ")[0] || "Colecionador"}!
                </Text>
                <Text className="text-lg text-muted">
                  Acompanhe seu progresso na Copa 2026
                </Text>
              </View>
              <Image
                source={require("@/assets/images/avatar-clown.png")}
                style={{ width: 80, height: 80 }}
                resizeMode="contain"
              />
            </View>
          </View>

          {/* Main Progress Card */}
          <View className="bg-primary rounded-3xl p-8 gap-4">
            <Text className="text-white text-lg font-semibold">Progresso Geral</Text>

            <View className="flex-row items-center justify-between gap-4">
              <View className="flex-1 gap-2">
                <Text className="text-5xl font-bold text-white">{percentComplete}%</Text>
                <Text className="text-white/80 text-base">
                  {stats.tenho} de {stats.total} figurinhas
                </Text>
              </View>

              {/* Progress Ring */}
              <View className="items-center justify-center">
                <View
                  className="w-24 h-24 rounded-full border-4 items-center justify-center"
                  style={{
                    borderColor: "rgba(255,255,255,0.3)",
                  }}
                >
                  <Text className="text-3xl font-bold text-white">{percentComplete}%</Text>
                </View>
              </View>
            </View>

            {/* Progress Bar */}
            <View className="h-3 rounded-full overflow-hidden" style={{ backgroundColor: "rgba(255,255,255,0.3)" }}>
              <View
                className="h-full bg-white rounded-full"
                style={{ width: `${percentComplete}%` }}
              />
            </View>
          </View>

          {/* Statistics Grid */}
          <View
            style={{
              flexDirection: isDesktop ? "row" : "column",
              gap: 16,
              flexWrap: "wrap",
            }}
          >
            <View
              style={{
                width: isDesktop ? "48%" : "100%",
              }}
              className="bg-surface rounded-2xl p-6 gap-3"
            >
              <Text className="text-base text-muted">Figurinhas Coletadas</Text>
              <Text className="text-4xl font-bold text-success">{stats.tenho}</Text>
              <Text className="text-sm text-muted">Você tem essas figurinhas</Text>
            </View>

            <View
              style={{
                width: isDesktop ? "48%" : "100%",
              }}
              className="bg-surface rounded-2xl p-6 gap-3"
            >
              <Text className="text-base text-muted">Figurinhas Repetidas</Text>
              <Text className="text-4xl font-bold text-warning">{stats.repetidas}</Text>
              <Text className="text-sm text-muted">Extras para trocar</Text>
            </View>

            <View
              style={{
                width: isDesktop ? "48%" : "100%",
              }}
              className="bg-surface rounded-2xl p-6 gap-3"
            >
              <Text className="text-base text-muted">Figurinhas Faltando</Text>
              <Text className="text-4xl font-bold text-error">{stats.faltam}</Text>
              <Text className="text-sm text-muted">Ainda precisa coletar</Text>
            </View>

            <View
              style={{
                width: isDesktop ? "48%" : "100%",
              }}
              className="bg-surface rounded-2xl p-6 gap-3"
            >
              <Text className="text-base text-muted">Total de Figurinhas</Text>
              <Text className="text-4xl font-bold text-foreground">{stats.total}</Text>
              <Text className="text-sm text-muted">Na coleção completa</Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View
            style={{
              flexDirection: isDesktop ? "row" : "column",
              gap: 12,
            }}
          >
            <TouchableOpacity
              className="bg-primary rounded-full py-4 px-8 items-center active:opacity-80"
              style={{
                flex: isDesktop ? 1 : undefined,
              }}
              onPress={() => router.navigate("/(tabs)/groups")}
            >
              <Text className="text-white font-semibold text-lg">Ver Grupos</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="bg-surface border border-border rounded-full py-4 px-8 items-center active:opacity-70"
              style={{
                flex: isDesktop ? 1 : undefined,
              }}
              onPress={() => router.navigate("/(tabs)/profile")}
            >
              <Text className="text-foreground font-semibold text-lg">Meu Perfil</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
