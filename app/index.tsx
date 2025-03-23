import {Redirect, useRouter} from "expo-router";
import { APP_ROUTES } from "@/constants/urls";
import { useAuth } from "@/queries/useAuth";
import { ActivityIndicator, View } from "react-native";
import colors from "@/constants/colors";
import {useEffect} from "react";

export default function Index() {
  const { isAuthenticated, isLoading, isCheckingAuth } = useAuth();
  const router = useRouter();

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
