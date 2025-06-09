import React, { useState } from 'react';
import {View, Text, ScrollView, TouchableOpacity, ActivityIndicator} from 'react-native';
import { Menu, IconButton } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import colors from '@/constants/colors';
import {BarChart, LineChart} from "react-native-gifted-charts";
import {getMaxField} from "@/helpers/general";
import CIconFilter from "@/components/CIconFilter";
import ChartActions from "@/app/(tabs)/reports/components/ChartActions";
import {useBackRedirect} from "@/hooks/useBackRedirect";
import {router} from "expo-router";

export default function ChartDistrictLine({ handleAction, lineData, period, isLoading=false, isFromFullchart=false }) {
	useBackRedirect(() => {
		handleAction.onBackToOriginScreen();
		return true;
	});

	const [menuVisible, setMenuVisible] = useState(false);

	return (
		<View className="bg-white border border-gray-300 rounded-md pb-2 mt-2">
			<View className="px-2 py-1">

				<View className="flex-row justify-between items-center">
					<Text
						className="text-[15px]"
						style={{ fontFamily: 'IBMPlexSans_Bold', color: colors.secondary }}
					>
						Elector Totals by Date
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
						{!isFromFullchart ? (
							<>
								<Menu.Item
									onPress={() => {
										setMenuVisible(false);
										handleAction.onClickOptionChart('byDate');
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
								<Menu.Item
									onPress={() => {
										setMenuVisible(false);
										const bindParams = {
											chart: 'byDistrict',
										}
										handleAction.onClickFullscreenChart?.('byDate', bindParams);
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
							</>
						):(
							<>
								<Menu.Item
									onPress={() => {
										setMenuVisible(false);
										handleAction.onClickOptionChart('byDate');
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
								<Menu.Item
									onPress={() => {
										setMenuVisible(false);
										handleAction.onClickExportDataChart();
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
								<Menu.Item
									onPress={() => {
										setMenuVisible(false);
										handleAction.onBackToOriginScreen();
									}}
									title="Exit Fullscreen"
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
							</>
						)}
					</Menu>
				</View>

				<Text
					className="text-[12px] mt-0 mb-4"
					style={{ fontFamily: 'IBMPlexSans', color: colors.secondary }}
				>
					Elector actualization and registration totals by district.
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
								<LineChart
									initialSpacing={15}
									data={lineData}
									spacing={30}
									textFontSize={10}
									thickness={3}
									hideRules
									yAxisColor={colors.secondary}
									showVerticalLines
									xAxisColor={colors.secondary}
									color={colors.secondary}
									isAnimated
									dataPointsColor={colors.darker3}
									textColor={colors.secondary}
									textShiftY={-5}
									textShiftX={0}
									maxValue={getMaxField(lineData, 'value') + 100}
									height={200}
								/>
							</ScrollView>
						</View>
					</>
				)}

			</View>
		</View>
	);
}
