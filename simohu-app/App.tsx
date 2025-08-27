import React, { useCallback, useEffect, useState } from "react";
import { View, Text } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { AppNavigator } from "./src/app/navigation";

// Impede que o splash suma sozinho
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appReady, setAppReady] = useState(false);

  // Simula carregamento (ex: fontes, API, etc.)
  useEffect(() => {
    async function prepare() {
      try {
        // Exemplo: delay de 2s
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppReady(true);
      }
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appReady) {
      // Esconde o splash quando estiver pronto
      await SplashScreen.hideAsync();
    }
  }, [appReady]);

  if (!appReady) {
    return null; // Enquanto não estiver pronto, mantém splash
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <AppNavigator />
    </View>
  );
}
