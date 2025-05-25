import {router} from "expo-router";
import {APP_ROUTES} from "@/constants/urls";
import CTopHeader from "@/components/CTopHeader";
import CTopHeaderSubMenu from "@/components/CTopHeaderSubMenu";
import {View} from "react-native";
import {useBackRedirect} from "@/hooks/useBackRedirect";

const ReportByElectorTypeScreen = () => {
	useBackRedirect(() => {
		router.replace(APP_ROUTES.MAIN.REPORTS);
		return true;
	});

	const handleAction = {
		onBack: () => {
			router.push(APP_ROUTES.MAIN.REPORTS);
		}
	}

	return (
		<>
			<View className="flex-1 bg-gray-100">
				<CTopHeaderSubMenu title="Report by Elector Type" handlePress={handleAction.onBack} />
			</View>
		</>
	)
}

export default ReportByElectorTypeScreen