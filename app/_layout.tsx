import {useCallback, useEffect, useState} from "react";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useFonts, IBMPlexSans_400Regular, IBMPlexSans_700Bold } from "@expo-google-fonts/ibm-plex-sans";
import {PaperProvider} from "react-native-paper";


import "../global.css";
import {QueryClientProvider} from "@tanstack/react-query";
import {queryClient} from "@/providers/react-query";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'IBMPlexSans': IBMPlexSans_400Regular,
    'IBMPlexSans_Bold': IBMPlexSans_700Bold,
  });

  useEffect(() => {
    async function prepare() {
      if (fontsLoaded) {
        await SplashScreen.hideAsync();
      }
    }

    prepare();
  }, [fontsLoaded]);

  const onLayoutRootView = useCallback(() => {
    if (fontsLoaded) {
      SplashScreen.hide();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider>
        <Stack screenOptions={{headerShown: false}} />
      </PaperProvider>
    </QueryClientProvider>
  )
}
