import {router, useFocusEffect, useRouter} from "expo-router";
import {APP_ROUTES} from "@/constants/urls";
import CTopHeader from "@/components/CTopHeader";
import CTopHeaderSubMenu from "@/components/CTopHeaderSubMenu";
import {Animated, BackHandler, TouchableOpacity, View} from "react-native";
import React, {useCallback, useEffect, useState} from "react";
import {useBackRedirect} from "@/hooks/useBackRedirect";
import {SceneMap, TabView} from "react-native-tab-view";
import ReportRegionDistrictScreen from "@/app/reports/region/district";
import ReportRegionSubdistrictScreen from "@/app/reports/region/subdistrict";
import ReportRegionSuccoScreen from "@/app/reports/region/succo";
import ReportRegionAldeiaScreen from "@/app/reports/region/aldeia";
import colors from "@/constants/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ReportByRegionScreen = () => {
	useBackRedirect(() => {
		router.replace(APP_ROUTES.MAIN.REPORTS);
		return true;
	});

	const router = useRouter()
	const [indexTab, setIndexTab] = useState(0);
	const [routesTab] = useState([
		{ key: 'district', title: 'District' },
		{ key: 'subdistrict', title: 'Sub District' },
		{ key: 'aldeia', title: 'Aldeia' },
		{ key: 'succo', title: 'Succo' },
	]);

	const renderTabScene = SceneMap({
		district: ReportRegionDistrictScreen,
		subdistrict: ReportRegionSubdistrictScreen,
		succo: ReportRegionSuccoScreen,
		aldeia: ReportRegionAldeiaScreen,
	});

	const renderTabBar = (props) => {
		return (
			<View className="flex-row bg-white" style={{ borderBottomWidth: 2, borderColor: "#E5E7EB" }}>
				{props.navigationState.routes.map((route, i) => {
					const isActive = props.navigationState.index === i;
					const textColor = isActive ? colors.secondary : "rgba(39, 93, 173, 0.3)";

					return (
						<TouchableOpacity
							key={i}
							className="flex-1 justify-center items-center py-3"
							style={[
								i === 0 || i === 1 || i === 2 ? { borderRightWidth: 1, borderColor: "#E5E7EB" } : undefined,
							]}
							onPress={() => setIndexTab(i)}
						>
							<Animated.Text
								style={{
									color: textColor,
									fontFamily: "IBMPlexSans_Bold",
									textAlign: "center"
								}}
							>
								{route.title}
							</Animated.Text>
						</TouchableOpacity>
					);
				})}
			</View>
		);
	};

	const handleAction = {
		onBack: () => {
			router.push(APP_ROUTES.MAIN.REPORTS);
		}
	}

	return (
		<>
			<View className="flex-1 bg-gray-100">
				<CTopHeaderSubMenu title="Report by Region" handlePress={handleAction.onBack} />
				<TabView
					navigationState={{ index: indexTab, routes: routesTab }}
					renderScene={renderTabScene}
					renderTabBar={renderTabBar}
					onIndexChange={setIndexTab}
					className="bg-blue-950"
				/>
			</View>
		</>
	)
}

export default ReportByRegionScreen