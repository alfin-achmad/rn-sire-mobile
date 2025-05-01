import { Redirect, Slot } from "expo-router";
import { useAuth } from "@/queries/useAuth";
import { APP_ROUTES } from "@/constants/urls";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import colors from "@/constants/colors";

const ProtectedLayout = () => {
	const { isAuthenticated, isCheckingAuth, checkAuth } = useAuth();

	useEffect(() => {
		checkAuth();
	}, []);

	if (isCheckingAuth) {
		return (
			<View className="flex-1 justify-center items-center">
				<ActivityIndicator size="large" color={colors.secondary} />
			</View>
		);
	}

	if (!isAuthenticated) {
		return <Redirect href={APP_ROUTES.AUTH.SIGN_IN} />;
	}

	return <Slot />;
};

export default ProtectedLayout;
