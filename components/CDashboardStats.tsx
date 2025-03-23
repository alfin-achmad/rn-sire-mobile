import colors from "@/constants/colors";
import { View } from "react-native";
import { Divider, Text } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { formatNumber } from "@/helpers/general";

const CDashboardStats = ({
	                         data,
	                         title,
	                         section,
	                         showPercentMan = true,
	                         showPercentWoman = true,
	                         showPercentTotal = true,
                         }) => {
	const { input } = data;
	const selectedData = input?.[section];

	const man = selectedData?.man || 0;
	const woman = selectedData?.woman || 0;
	const total = selectedData?.total ?? man + woman;

	const percentMan = selectedData?.percentMan;
	const percentWoman = selectedData?.percentWoman;
	const percentTotal = selectedData?.percentTotal ?? (percentMan && percentWoman ? percentMan + percentWoman : undefined);

	return (
		<View key={section} className="border rounded-md py-1 px-2 border-blue-950" style={{ backgroundColor: colors.secondary }}>
			<View className="flex flex-row justify-between mb-1">
				<Text style={{ color: "#FFF", fontFamily: "IBMPlexSans_Bold", fontSize: 14, lineHeight: 18 }}>{title}</Text>
				<Divider style={{ backgroundColor: "#FFF" }} />
			</View>
			<View className="flex-1 justify-between gap-1">
				<View className="flex-row items-center">
					<Ionicons name="man-outline" size={20} className="p-1 bg-white rounded-md mr-2 border border-blue-950" color={colors.secondary} />
					<View className="flex-1 flex-row justify-between">
						<Text style={{ color: "#FFF", fontFamily: "IBMPlexSans_Bold", fontSize: 14 }}>Men</Text>
						<Text style={{ color: "#FFF", fontFamily: "IBMPlexSans_Bold", fontSize: 14 }}>
							{formatNumber(man)}
							{showPercentMan && percentMan !== undefined ? ` (${percentMan}%)` : ""}
						</Text>
					</View>
				</View>
				<View className="flex-row items-center">
					<Ionicons name="woman-outline" size={20} className="p-1 bg-white rounded-md mr-2 border border-blue-950" color={colors.secondary} />
					<View className="flex-1 flex-row justify-between">
						<Text style={{ color: "#FFF", fontFamily: "IBMPlexSans_Bold", fontSize: 14 }}>Women</Text>
						<Text style={{ color: "#FFF", fontFamily: "IBMPlexSans_Bold", fontSize: 14 }}>
							{formatNumber(woman)}
							{showPercentWoman && percentWoman !== undefined ? ` (${percentWoman}%)` : ""}
						</Text>
					</View>
				</View>
				<View className="flex-row items-center">
					<Ionicons name="people-outline" size={20} className="p-1 bg-white rounded-md mr-2 border border-blue-950" color={colors.secondary} />
					<View className="flex-1 flex-row justify-between">
						<Text style={{ color: "#FFF", fontFamily: "IBMPlexSans_Bold", fontSize: 14 }}>Total</Text>
						<Text style={{ color: "#FFF", fontFamily: "IBMPlexSans_Bold", fontSize: 14 }}>
							{formatNumber(total)}
							{showPercentTotal && percentTotal !== undefined ? ` (${percentTotal}%)` : ""}
						</Text>
					</View>
				</View>
			</View>
		</View>
	);
};

export default CDashboardStats;
