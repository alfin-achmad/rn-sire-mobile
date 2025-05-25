import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, TouchableOpacity, ActivityIndicator} from 'react-native';
import {Menu, IconButton, Button} from 'react-native-paper';
import colors from '@/constants/colors';
import {BarChart} from "react-native-gifted-charts";
import CIconFilter from "@/components/CIconFilter";
import {Ionicons} from "@expo/vector-icons";

export default function ChartDistrictBar({ handleAction, barData, period, isLoading=false, isFromFullchart=false }) {
	const [menuVisible, setMenuVisible] = useState(false);

	return (
		<View className="bg-white border border-gray-300 rounded-md pb-2 mt-2">
			<View className="px-2 py-1">

				<View className="flex-row justify-between items-center">
					<Text
						className="text-[15px]"
						style={{ fontFamily: 'IBMPlexSans_Bold', color: colors.secondary }}
					>
						Elector Totals by District
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
								handleAction.onClickOptionChart('byDistrict');
							}}
							title="Filter Period"
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
						{!isFromFullchart && (
							<Menu.Item
								onPress={() => {
									setMenuVisible(false);
									const bindParams = {
										chart: 'byDistrict',
									}
									handleAction.onClickFullscreenChart?.('byDistrict', bindParams);
								}}
								title="View Fullscreen"
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
						)}
					</Menu>
				</View>

				<Text
					className="text-[12px] mt-0 mb-4"
					style={{ fontFamily: 'IBMPlexSans', color: colors.secondary }}
				>
					Daily elector actualization and registration totals for the month
				</Text>

				{isLoading ? (
					<ActivityIndicator color={colors.secondary} />
				):(
					<>
						<View className="flex justify-between items-center">
							{period && (
								<Text
									className="text-[10px] mt-0 mb-2"
									style={{ fontFamily: 'IBMPlexSans', color: colors.secondary }}
								>
									Period: {period}
								</Text>
							)}
							<ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 5 }}>
								<BarChart
									barWidth={35}
									noOfSections={5}
									barBorderRadius={4}
									data={barData}
									yAxisThickness={0}
									xAxisThickness={0}
									height={200}
									spacing={5}
									endSpacing={20}
								/>
							</ScrollView>
							{isFromFullchart && (
								<View className="flex-row justify-between items-center gap-2 mt-4 px-4">
									<TouchableOpacity
										className="flex-row items-center px-4 py-2 rounded-md"
										onPress={handleAction.onBackToOriginScreen}
										style={{ backgroundColor: colors.secondary }}
									>
										<Ionicons name="arrow-back" size={16} color="#fff" />
										<Text className="text-white font-medium ml-2">Back</Text>
									</TouchableOpacity>

									<TouchableOpacity
										className="flex-row items-center px-4 py-2 rounded-md"
										onPress={handleAction.onClickExportDataChart}
										style={{backgroundColor: colors.red}}
									>
										<Ionicons name="download-outline" size={16} color="#fff" />
										<Text className="text-white font-medium ml-2">Export</Text>
									</TouchableOpacity>
								</View>
							)}
						</View>
					</>
				)}
			</View>
		</View>
	);
}
