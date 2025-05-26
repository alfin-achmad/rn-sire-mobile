import colors from "@/constants/colors";
import {TouchableOpacity, View} from "react-native";
import {Divider, Menu, Text} from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { formatNumber } from "@/helpers/general";
import ContentLoader, { Rect } from "react-content-loader/native";
import React, {useState} from "react";
import CIconFilter from "@/components/CIconFilter";
import {useBackRedirect} from "@/hooks/useBackRedirect";

const StatsRegionRecap = ({
	                         data,
	                         title,
	                         section,
	                         isLoading = false,
													 handleAction = {}
                         }) => {
	useBackRedirect(false);
	const [menuVisible, setMenuVisible] = useState(false);
	const { man, woman, total } = data || {};

	return (
		<View key={section} className="border rounded-md py-1 px-2 border-blue-950" style={{ backgroundColor: "#275dad", height: 130 }}>
			<TouchableOpacity onPress={() => handleAction.onClickDetail(section)}>
	      <View className="flex flex-row justify-between mb-1 pb-0.5" style={{borderBottomWidth: 1, borderBottomColor: "#FFF"}}>
					<Text style={{ color: "#FFF", fontFamily: "IBMPlexSans_Bold", fontSize: 14, lineHeight: 18 }}>
						{title}
					</Text>
				</View>
			</TouchableOpacity>
			<View className="flex-1 justify-between gap-1">
				{[
					{ label: "Men", icon: "man-outline", value: man },
					{ label: "Women", icon: "woman-outline", value: woman },
					{ label: "Total", icon: "people-outline", value: total }
				].map(({ label, icon, value, percent }) => (
					<View key={label} className="flex-row items-center h=">
						<Ionicons name={icon} size={20} className="p-1 bg-white rounded-md mr-2 border border-blue-950" color={"#275dad"} />
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
				))}
			</View>
		</View>
	);
};

export default StatsRegionRecap;
