import { useAuth } from "@/hooks/use-auth";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator, ScrollView, Image } from "react-native";

export default function LoginScreen() {
  const { user, isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const colors = useColors();

  useEffect(() => {
    if (isAuthenticated && !loading) {
      router.replace("/(tabs)");
    }
  }, [isAuthenticated, loading]);

  if (loading) {
    return (
      <ScreenContainer className="flex items-center justify-center">
        <ActivityIndicator size="large" color={colors.primary} />
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer className="bg-background">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="flex-1">
        <View className="flex-1 items-center justify-center px-6 gap-8">
          {/* Avatar */}
          <View className="items-center gap-4">
            <Image
              source={require("@/assets/images/avatar-clown.png")}
              style={{ width: 200, height: 200 }}
              resizeMode="contain"
            />
            <Image
              source={require("@/assets/images/logo-kimana.png")}
              style={{ width: 200, height: 60 }}
              resizeMode="contain"
            />
          </View>

          {/* Header */}
          <View className="items-center gap-4">
            <Text className="text-3xl font-bold text-foreground text-center">
              Figurinhas Copa 2026
            </Text>
            <Text className="text-base text-muted text-center">
              Controle suas figurinhas e acompanhe seu progresso
            </Text>
          </View>

          {/* Features */}
          <View className="w-full gap-4">
            <View className="bg-surface rounded-2xl p-4 gap-2">
              <Text className="text-lg font-semibold text-foreground">✓ Marque suas figurinhas</Text>
              <Text className="text-sm text-muted">
                Registre quais figurinhas você tem, repetidas e faltam
              </Text>
            </View>

            <View className="bg-surface rounded-2xl p-4 gap-2">
              <Text className="text-lg font-semibold text-foreground">✓ Acompanhe o progresso</Text>
              <Text className="text-sm text-muted">
                Veja em tempo real quantas figurinhas você já coletou
              </Text>
            </View>

            <View className="bg-surface rounded-2xl p-4 gap-2">
              <Text className="text-lg font-semibold text-foreground">✓ Sincronize na nuvem</Text>
              <Text className="text-sm text-muted">
                Seus dados são salvos e sincronizados automaticamente
              </Text>
            </View>
          </View>

          {/* Login Button */}
          <View className="w-full gap-3">
            <TouchableOpacity
              className="bg-primary rounded-full py-4 px-6 items-center active:opacity-80"
              onPress={() => {
                // Auth flow will be handled by useAuth hook
              }}
            >
              <Text className="text-white font-semibold text-lg">Entrar com Manus</Text>
            </TouchableOpacity>

            <Text className="text-xs text-muted text-center">
              Ao entrar, você concorda com nossos Termos de Serviço
            </Text>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
