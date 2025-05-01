import {Redirect, useRouter} from "expo-router";
import { APP_ROUTES } from "@/constants/urls";
import { useAuth } from "@/queries/useAuth";
import { ActivityIndicator, View } from "react-native";
import colors from "@/constants/colors";
import {useEffect, useState} from "react";
import {Camera} from "expo-camera";
import * as Location from 'expo-location';

export default function Index() {
  const { isAuthenticated, isLoading, isCheckingAuth } = useAuth();
  const [permissionsChecked, setPermissionsChecked] = useState(false);
  const [permissionsGranted, setPermissionsGranted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkPermissions = async () => {
      try {
        const { status: locationStatus } = await Location.requestForegroundPermissionsAsync();
        const { status: cameraStatus } = await Camera.requestCameraPermissionsAsync();

        if (locationStatus === 'granted' && cameraStatus === 'granted') {
          setPermissionsGranted(true);
        } else {
          setPermissionsGranted(false);
        }
      } catch (error) {
        console.error("Error checking permissions:", error);
      } finally {
        setPermissionsChecked(true);
      }
    };

    checkPermissions();
  }, []);

  useEffect(() => {
    if (!isCheckingAuth) {
      router.replace(isAuthenticated ? APP_ROUTES.MAIN.DASHBOARD : APP_ROUTES.AUTH.SIGN_IN);
    }
  }, [isAuthenticated, isCheckingAuth, router]);

  if (isCheckingAuth) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color={colors.secondary} />
      </View>
    );
  }

  return <Redirect href={isAuthenticated ? APP_ROUTES.MAIN.DASHBOARD : APP_ROUTES.AUTH.SIGN_IN} />;
}
