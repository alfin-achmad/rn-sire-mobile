import {Image, ScrollView, Text, View} from "react-native";
import React, {useState} from "react";
import colors from "@/constants/colors";
import {Menu} from "react-native-paper";
import CIconFilter from "@/components/CIconFilter";

const ReportRegionSubdistrictScreen = () => {
	const [menuVisible, setMenuVisible] = useState(false);

	return (
		<>
			<ScrollView className="p-4">
				<View className="bg-white border border-gray-300 rounded-md pb-2">
					<View className="px-2 py-1">
						<View className="flex-row justify-between items-center">
							<Text
								className="text-[14px]"
								style={{ fontFamily: 'IBMPlexSans_Bold', color: colors.secondary }}
							>
								Electors Region by Sub District
							</Text>

							<Menu
								visible={menuVisible}
								onDismiss={() => setMenuVisible(false)}
								anchor={
									<CIconFilter onPress={() => setMenuVisible(true)} backgroundColor="#FFF" iconColor={colors.secondary} borderColor="transparent" size={16} />
								}
								contentStyle={{
									backgroundColor: 'white',
									borderRadius: 8,
									borderColor: colors.secondary,
									borderWidth: 1,
									paddingVertical: 0,
									paddingHorizontal: 0,
								}}
								style={{
									marginTop: 20,
									marginLeft: -15,
								}}
							>
								<Menu.Item
									onPress={() => {
										setMenuVisible(false);
									}}
									title="Filter"
									titleStyle={{
										color: colors.secondary,
										fontSize: 12,
										fontFamily: 'IBMPlexSans',
										lineHeight: 16,
									}}
									style={{
										height: 32,
										justifyContent: 'center',
										paddingHorizontal: 4,
									}}
								/>
								<Menu.Item
									onPress={() => {
										setMenuVisible(false);
									}}
									title="Export"
									titleStyle={{
										color: colors.secondary,
										fontSize: 12,
										fontFamily: 'IBMPlexSans',
										lineHeight: 16,
									}}
									style={{
										height: 32,
										justifyContent: 'center',
										paddingHorizontal: 4,
									}}
								/>
							</Menu>
						</View>
					</View>
				</View>
			</ScrollView>
		</>
	)
}

export default ReportRegionSubdistrictScreen