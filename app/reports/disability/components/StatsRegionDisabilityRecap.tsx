import colors from "@/constants/colors";
import {TouchableOpacity, View} from "react-native";
import {Divider, Menu, Text} from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { formatNumber } from "@/helpers/general";
import React, {useState} from "react";
import CIconFilter from "@/components/CIconFilter";
import {useBackRedirect} from "@/hooks/useBackRedirect";
import {router} from "expo-router";
import {APP_ROUTES} from "@/constants/urls";
import ContentLoader, {Rect} from "react-content-loader/native";

const StatsRegionDisabilityRecap = ({
	                             data,
	                             title,
	                             section,
	                             isLoading = false,
	                             handleAction = {}
                             }) => {
	useBackRedirect(() => {
		router.push(APP_ROUTES.MAIN.REPORTS)
		return true;
	});
	const [menuVisible, setMenuVisible] = useState(false);
	const { matan, fisico, tilun, seluk, mental } = data || {};

	return (
		<View className="border rounded-md py-1 px-2 border-blue-950" style={{ backgroundColor: "#275dad" }}>
			<TouchableOpacity onPress={() => handleAction.onClickDetail?.(section)}>
				<View className="flex flex-row justify-between mb-2 pb-1" style={{ borderBottomWidth: 1, borderBottomColor: "#FFF" }}>
					<Text style={{ color: "#FFF", fontFamily: "IBMPlexSans_Bold", fontSize: 13 }}>{title}</Text>
				</View>
			</TouchableOpacity>

			<View className="flex-1 justify-between gap-1">
				{[
					{ label: "Matan", icon: "man-outline", value: matan },
					{ label: "Tilun", icon: "woman-outline", value: tilun },
					{ label: "Fisico", icon: "people-outline", value: fisico },
					{ label: "Mental", icon: "people-outline", value: mental },
					{ label: "Seluk", icon: "people-outline", value: seluk },
					{ label: "Total", icon: "people-outline", value: matan + tilun + fisico + mental + seluk },
				].map(({ label, icon, value, percent }) => (
					<React.Fragment key={label}>
						{label === "Total" && <View className="h-px bg-white/30 mb-1" />}
						<View className="flex-row items-center">
							<View className="flex-1 flex-row justify-between">
								<Text style={{ color: "#FFF", fontFamily: "IBMPlexSans_Bold", fontSize: 14 }}>{label}</Text>
								{isLoading ? (
									<ContentLoader
										speed={1}
										width={100}
										height={14}
										viewBox="0 0 100 14"
										backgroundColor="#1e4783"
										foregroundColor="#172554"
									>
										<Rect x="0" y="0" rx="4" ry="4" width="100" height="14" />
									</ContentLoader>
								) : (
									<Text style={{ color: "#FFF", fontFamily: "IBMPlexSans_Bold", fontSize: 14 }}>
										{formatNumber(value)}
										{percent !== undefined ? ` (${percent}%)` : ""}
									</Text>
								)}
							</View>
						</View>
					</React.Fragment>
				))}
			</View>
		</View>
	);
};

export default StatsRegionDisabilityRecap;
