import CTopHeader from "@/components/CTopHeader";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AccountScreen = () => {
	const handleAction = {
		onPress: async () => {
			try {
				await AsyncStorage.clear();
				console.log("Storage cleared!");
			} catch (error) {
				console.error("Error clearing storage:", error);
			}
		}
	}

	return (
		<>
			<CTopHeader />
		</>
	)
}

export default AccountScreen