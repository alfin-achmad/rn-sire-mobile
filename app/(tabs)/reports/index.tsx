import {router} from "expo-router";
import {APP_ROUTES} from "@/constants/urls";
import CTopHeader from "@/components/CTopHeader";

const ReportsScreen = () => {
	const handleAction = {
		onBack: () => {
			router.replace(APP_ROUTES.DASHBOARD);
		}
	}

	return (
		<>
			<CTopHeader />
		</>
	)
}

export default ReportsScreen