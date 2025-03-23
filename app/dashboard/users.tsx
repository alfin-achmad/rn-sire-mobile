import {Text} from "react-native-paper";
import {router} from "expo-router";
import {APP_ROUTES} from "@/constants/urls";
import {useEffect} from "react";
import {View} from "react-native";
import CTopHeaderSubMenu from "@/components/CTopHeaderSubMenu";

const UsersScreen = () => {
	const handleAction = {
		onBack: () => {
			router.replace(APP_ROUTES.DASHBOARD);
		}
	}

	useEffect(() => {
		alert("Error Gradle : Image Base64 too long")
	}, []);

	return (
		<View className="flex-1 bg-gray-100">
			<CTopHeaderSubMenu title="Users" handlePress={handleAction.onBack} />

		</View>
	)
}

export default UsersScreen