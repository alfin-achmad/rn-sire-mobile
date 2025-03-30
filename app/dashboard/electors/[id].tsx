import {ActivityIndicator, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {router, useLocalSearchParams} from "expo-router";
import CTopHeaderSubMenu from "@/components/CTopHeaderSubMenu";
import CAvatar from "@/components/CAvatar";
import colors from "@/constants/colors";
import {useAuth} from "@/queries/useAuth";
import {useEffect, useState} from "react";
import useElector from "@/queries/useElector";
import {Ionicons} from "@expo/vector-icons";
import {APP_ROUTES} from "@/constants/urls";
import CElectorDetail from "@/components/CElectorDetail";

const ElectorDetail = () => {
	const {user} = useAuth();
	const {processVerifyElector, updateParam, fetchFindElector, data, params, isLoading, resetParams, resetFindElectorByID} = useElector();
	const [verifyDialog, setVerifyDialog] = useState(false);
	const {id, fromScreen, historySearchText, keyParam} = useLocalSearchParams();
	const electorByID = data?.findElectorByID?.rows[0]

	useEffect(() => {
        resetFindElectorByID()
		if (id){
			if (fromScreen === APP_ROUTES.MAIN.SEARCH_BY_QR){
				resetParams();
			}
			updateParam("findElector", "prkdelektor", id)
			fetchFindElector(true, true)
		}
	}, [id]);

	const handleAction = {
		onBack: () => {
            resetFindElectorByID()
            router.back();
		},
	}

	return (
		<>
			<View className="flex-1 bg-gray-100">
				<CTopHeaderSubMenu title={`Detail Elector #${id}`} handlePress={handleAction.onBack} />

				<ScrollView showsVerticalScrollIndicator={false}>
				<View className="px-4 py-2">
                    {isLoading ? (
                        <ActivityIndicator />
                    ):(
                        <CElectorDetail dataElectorDetail={electorByID} />
                    )}
				</View>
				</ScrollView>
			</View>
		</>
	)
}

export default ElectorDetail;