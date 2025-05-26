import {Image, ScrollView, Text, TouchableOpacity, View} from "react-native";
import React, {useEffect, useState} from "react";
import colors from "@/constants/colors";
import useReport from "@/queries/useReport";
import CIconFilter from "@/components/CIconFilter";
import {DataTable, Menu} from "react-native-paper";
import {formatNumber} from "@/helpers/general";

const ReportRegionDistrictScreen = () => {
	const {setParams: setParamsReport, fetchRegionRecap, data: reportData, paramRegionRecap} = useReport();
	const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({"1.NATIONAL": true, "2.DIASPORA": false});
	const [menuVisible, setMenuVisible] = useState(false);

	const data = reportData?.reportRegionRecap?.data || []
	const totalData = data?.totalRecords || 0
	const groupedData = data.reduce((acc, item) => {
		const group = item.KELOMPOK || "Unknown";
		if (!acc[group]) acc[group] = [];
		acc[group].push(item);
		return acc;
	}, {} as Record<string, typeof data>);
	const toggleGroup = (groupKey: string) => {
		setExpandedGroups((prev) => ({
			...prev,
			[groupKey]: !prev[groupKey],
		}));
	};

	const handleAction = {

	}

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
								Electors Region by District
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

						<ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-2">
							<DataTable>
								{/* Header */}
								<DataTable.Header
									style={{
										backgroundColor: colors.secondary,
										borderTopLeftRadius: 5,
										borderTopRightRadius: 5,
										borderWidth: 1,
										borderColor: "#175554",
										height: 30,
										paddingHorizontal: 0,
									}}
								>
									{[
										{ label: '#', width: 40 },
										{ label: 'District Name', width: 120 },
										{ label: 'Man', width: 70 },
										{ label: '%', width: 70 },
										{ label: 'Woman', width: 70 },
										{ label: '%', width: 70 },
										{ label: 'Total', width: 70 },
									].map((col, idx) => (
										<View
											key={idx}
											style={{
												width: col.width,
												justifyContent: 'center',
												alignItems: 'center',
												paddingHorizontal: 4,
											}}
										>
											<Text
												style={{
													color: '#FFF',
													fontFamily: 'IBMPlexSans_Bold',
													fontSize: 12,
													textAlign: 'center',
												}}
											>
												{col.label}
											</Text>
										</View>
									))}
								</DataTable.Header>

								{/* Body (compacted rows) */}
								{data.map((item, index) => (
									<View
										key={index}
										style={{
											flexDirection: 'row',
											borderBottomWidth: 1,
											borderColor: '#ddd',
											height: 26, // Compact height
											alignItems: 'center',
											paddingHorizontal: 0
										}}
									>
										{[
											{ value: index + 1, width: 40, textAlign: 'center' },
											{ value: item.NAMA_DISTRIK, width: 120, textAlign: 'left' },
											{ value: formatNumber(item.TOTAL_PRIA), width: 70, textAlign: 'right' },
											{ value: `${item.PERSEN_PRIA} %`, width: 70, textAlign: 'center' },
											{ value: formatNumber(item.TOTAL_WANITA), width: 70, textAlign: 'right' },
											{ value: `${item.PERSEN_WANITA} %`, width: 70, textAlign: 'center' },
											{ value: formatNumber((item.TOTAL_PRIA + item.TOTAL_WANITA)), width: 70, textAlign: 'right' },
										].map((col, idx) => (
											<View
												key={idx}
												style={{
													width: col.width,
													justifyContent: 'center',
													paddingHorizontal: 4,
												}}
											>
												<Text
													style={{
														color: colors.secondary,
														fontSize: 11,
														fontFamily: 'IBMPlexSans',
														textAlign: col.textAlign
													}}
													numberOfLines={1}
												>
													{col.value}
												</Text>
											</View>
										))}
									</View>
								))}
							</DataTable>
						</ScrollView>
					</View>
				</View>
			</ScrollView>
		</>
	)
}

export default ReportRegionDistrictScreen