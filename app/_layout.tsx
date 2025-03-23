import { useEffect } from "react";
import { Slot } from "expo-router"; // ✅ Use Slot (not Stack)
import { PaperProvider } from "react-native-paper";
import * as SplashScreen from "expo-splash-screen";
import { useFonts, IBMPlexSans_400Regular, IBMPlexSans_700Bold } from "@expo-google-fonts/ibm-plex-sans";
import { QueryClientProvider } from "@tanstack/react-query";
import FlashMessage from "react-native-flash-message";

import "../global.css";
import { queryClient } from "@/providers/react-query";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "IBMPlexSans": IBMPlexSans_400Regular,
    "IBMPlexSans_Bold": IBMPlexSans_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider>
        <FlashMessage position="top" />
        <Slot />
      </PaperProvider>
    </QueryClientProvider>
  );
}
