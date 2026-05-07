import { ScrollView, Text, View, TouchableOpacity, Alert } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "expo-router";
import { trpc } from "@/lib/trpc";
import { useColors } from "@/hooks/use-colors";

export default function ProfileScreen() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const colors = useColors();

  const statsQuery = trpc.stickers.stats.useQuery();
  const stats = statsQuery.data || { total: 0, tenho: 0, repetidas: 0, faltam: 0 };

  const handleLogout = () => {
    Alert.alert("Sair", "Tem certeza que deseja sair?", [
      { text: "Cancelar", onPress: () => {} },
      {
        text: "Sair",
        onPress: () => {
          logout();
          router.replace("/login");
        },
      },
    ]);
  };

  return (
    <ScreenContainer className="bg-background">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="flex-1">
        <View className="gap-6 pb-8">
          {/* Header */}
          <View className="gap-2">
            <Text className="text-2xl font-bold text-foreground">Meu Perfil</Text>
          </View>

          {/* User Info */}
          <View className="bg-surface rounded-2xl p-6 gap-4">
            <View className="items-center gap-2">
              <View className="w-16 h-16 rounded-full bg-primary/20 items-center justify-center">
                <Text className="text-3xl">👤</Text>
              </View>
              <Text className="text-2xl font-bold text-foreground">{user?.name || "Colecionador"}</Text>
              <Text className="text-sm text-muted">{user?.email}</Text>
            </View>

            <View className="border-t border-border pt-4 gap-3">
              <View className="flex-row justify-between">
                <Text className="text-sm text-muted">ID do Usuário</Text>
                <Text className="text-sm font-semibold text-foreground">{user?.id}</Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-sm text-muted">Método de Login</Text>
                <Text className="text-sm font-semibold text-foreground">{user?.loginMethod || "OAuth"}</Text>
              </View>
            </View>
          </View>

          {/* Statistics */}
          <View className="gap-3">
            <Text className="text-lg font-semibold text-foreground">Estatísticas</Text>

            <View className="gap-2">
              <View className="bg-surface rounded-2xl p-4 flex-row justify-between items-center">
                <Text className="text-sm text-muted">Figurinhas Coletadas</Text>
                <Text className="text-2xl font-bold text-success">{stats.tenho}</Text>
              </View>

              <View className="bg-surface rounded-2xl p-4 flex-row justify-between items-center">
                <Text className="text-sm text-muted">Figurinhas Repetidas</Text>
                <Text className="text-2xl font-bold text-warning">{stats.repetidas}</Text>
              </View>

              <View className="bg-surface rounded-2xl p-4 flex-row justify-between items-center">
                <Text className="text-sm text-muted">Figurinhas Faltando</Text>
                <Text className="text-2xl font-bold text-error">{stats.faltam}</Text>
              </View>

              <View className="bg-surface rounded-2xl p-4 flex-row justify-between items-center">
                <Text className="text-sm text-muted">Total de Figurinhas</Text>
                <Text className="text-2xl font-bold text-foreground">{stats.total}</Text>
              </View>
            </View>
          </View>

          {/* Actions */}
          <View className="gap-3">
            <TouchableOpacity
              className="bg-error/10 rounded-full py-4 px-6 items-center active:opacity-70"
              onPress={handleLogout}
            >
              <Text className="text-error font-semibold text-lg">Sair da Conta</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
