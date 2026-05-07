import { ScrollView, Text, View, TouchableOpacity, ActivityIndicator } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "expo-router";
import { trpc } from "@/lib/trpc";
import { useColors } from "@/hooks/use-colors";
import { useEffect } from "react";

export default function HomeScreen() {
  const router = useRouter();
  const { user, isAuthenticated, loading: authLoading, logout } = useAuth();
  const colors = useColors();

  const statsQuery = trpc.stickers.stats.useQuery(undefined, {
    enabled: isAuthenticated && !authLoading,
  });

  useEffect(() => {
    if (!isAuthenticated && !authLoading) {
      router.replace("/login");
    }
  }, [isAuthenticated, authLoading]);

  if (authLoading || statsQuery.isLoading) {
    return (
      <ScreenContainer className="flex items-center justify-center">
        <ActivityIndicator size="large" color={colors.primary} />
      </ScreenContainer>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const stats = statsQuery.data || { total: 0, tenho: 0, repetidas: 0, faltam: 0 };
  const progressPercent = stats.total > 0 ? Math.round((stats.tenho / stats.total) * 100) : 0;

  return (
    <ScreenContainer className="bg-background">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="flex-1">
        <View className="flex-1 gap-6 pb-8">
          {/* Header */}
          <View className="flex-row items-center justify-between">
            <View className="gap-1">
              <Text className="text-sm text-muted">Bem-vindo,</Text>
              <Text className="text-2xl font-bold text-foreground">{user?.name || "Colecionador"}</Text>
            </View>
            <TouchableOpacity
              className="px-4 py-2 rounded-full bg-surface active:opacity-70"
              onPress={() => {
                logout();
                router.replace("/login");
              }}
            >
              <Text className="text-sm font-semibold text-foreground">Sair</Text>
            </TouchableOpacity>
          </View>

          {/* Progress Overview */}
          <View className="bg-surface rounded-2xl p-6 gap-4">
            <View className="gap-2">
              <Text className="text-lg font-semibold text-foreground">Seu Progresso</Text>
              <Text className="text-3xl font-bold text-primary">{progressPercent}%</Text>
            </View>

            {/* Progress Bar */}
            <View className="h-2 bg-border rounded-full overflow-hidden">
              <View
                className="h-full bg-primary rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </View>

            <Text className="text-sm text-muted">
              {stats.tenho} de {stats.total} figurinhas coletadas
            </Text>
          </View>

          {/* Stats Grid */}
          <View className="gap-3">
            <View className="flex-row gap-3">
              {/* Tenho */}
              <TouchableOpacity
                className="flex-1 bg-success/10 rounded-2xl p-4 gap-2 active:opacity-70"
                onPress={() => router.push("/(tabs)/groups")}
              >
                <Text className="text-sm text-muted">Tenho</Text>
                <Text className="text-3xl font-bold text-success">{stats.tenho}</Text>
              </TouchableOpacity>

              {/* Repetidas */}
              <TouchableOpacity
                className="flex-1 bg-warning/10 rounded-2xl p-4 gap-2 active:opacity-70"
                onPress={() => router.push("/(tabs)/groups")}
              >
                <Text className="text-sm text-muted">Repetidas</Text>
                <Text className="text-3xl font-bold text-warning">{stats.repetidas}</Text>
              </TouchableOpacity>
            </View>

            {/* Faltam */}
            <TouchableOpacity
              className="bg-error/10 rounded-2xl p-4 gap-2 active:opacity-70"
              onPress={() => router.push("/(tabs)/groups")}
            >
              <Text className="text-sm text-muted">Faltam</Text>
              <Text className="text-3xl font-bold text-error">{stats.faltam}</Text>
            </TouchableOpacity>
          </View>

          {/* Action Buttons */}
          <View className="gap-3">
            <TouchableOpacity
              className="bg-primary rounded-full py-4 px-6 items-center active:opacity-80"
              onPress={() => router.navigate("/(tabs)/groups")}
            >
              <Text className="text-white font-semibold text-lg">Ver Grupos</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="bg-surface border border-border rounded-full py-4 px-6 items-center active:opacity-70"
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
