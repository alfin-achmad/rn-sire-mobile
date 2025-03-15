import { Redirect, Slot } from "expo-router";
import { useAuth } from "@/queries/useAuth";
import { APP_ROUTES } from "@/constants/urls";
import { ActivityIndicator, View } from "react-native";

const ProtectedLayout = () => {
	const { isAuthenticated, isCheckingAuth } = useAuth();

	if (isCheckingAuth) {
		return (
			<View className="flex-1 justify-center items-center">
				<ActivityIndicator size="large" color="#007AFF" />
			</View>
		);
	}

	if (!isAuthenticated) {
		return <Redirect href={APP_ROUTES.AUTH.SIGN_IN} />;
	}

	return <Slot />;
};

export default ProtectedLayout;
