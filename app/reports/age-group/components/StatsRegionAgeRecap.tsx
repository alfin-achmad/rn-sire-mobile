import colors from "@/constants/colors";
import {TouchableOpacity, View} from "react-native";
import {Divider, Menu, Text} from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { formatNumber } from "@/helpers/general";
import ContentLoader, { Rect } from "react-content-loader/native";
import React, {useState} from "react";
import CIconFilter from "@/components/CIconFilter";
import {useBackRedirect} from "@/hooks/useBackRedirect";
import {router} from "expo-router";
import {APP_ROUTES} from "@/constants/urls";

const StatsRegionAgeRecap = ({
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

	return (
		<View className="border rounded-md py-1 px-2 border-blue-950" style={{ backgroundColor: "#275dad" }}>
			<TouchableOpacity onPress={() => handleAction.onClickDetail?.(section)}>
				<View className="flex flex-row justify-between mb-2 pb-1" style={{ borderBottomWidth: 1, borderBottomColor: "#FFF" }}>
					<Text style={{ color: "#FFF", fontFamily: "IBMPlexSans_Bold", fontSize: 13 }}>{title}</Text>
				</View>
			</TouchableOpacity>

			<View className="flex flex-row justify-between mb-1">
				{["Age Group", "Man", "Woman", "Total"].map((header, idx) => (
					<Text
						key={header}
						style={{ flex: 1, color: "#FFF", fontFamily: "IBMPlexSans_Bold", fontSize: 14, textAlign: idx === 0 ? "left" : "center" }}
					>
						{header}
					</Text>
				))}
			</View>

			{Object.entries(data).map(([ageGroup, { man, woman, total }]) => (
				<View key={ageGroup} className="flex flex-row justify-between py-0.5">
					<Text style={{ flex: 1, color: "#FFF", fontSize: 14, fontFamily: "IBMPlexSans", }}>{ageGroup}</Text>
					<Text style={{ flex: 1, color: "#FFF", fontSize: 14, fontFamily: "IBMPlexSans", textAlign: "right" }}>{formatNumber(man)}</Text>
					<Text style={{ flex: 1, color: "#FFF", fontSize: 14, fontFamily: "IBMPlexSans", textAlign: "right" }}>{formatNumber(woman)}</Text>
					<Text style={{ flex: 1, color: "#FFF", fontSize: 14, fontFamily: "IBMPlexSans", textAlign: "right" }}>{formatNumber(total)}</Text>
				</View>
			))}
		</View>
	);
};

export default StatsRegionAgeRecap;
