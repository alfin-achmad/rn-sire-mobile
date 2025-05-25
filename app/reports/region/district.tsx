import {Image, ScrollView, Text, TouchableOpacity, View} from "react-native";
import React, {useEffect, useState} from "react";
import colors from "@/constants/colors";
import useReport from "@/queries/useReport";
import {formatNumber} from "@/helpers/general";
import CIconFilter from "@/components/CIconFilter";
import {Menu} from "react-native-paper";

const ReportRegionDistrictScreen = () => {
	const {setParams: setParamsReport, fetchRegionRecap, data: reportData, paramRegionRecap} = useReport();
	const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({"1.NATIONAL": true, "2.DIASPORA": false});
	const [menuVisible, setMenuVisible] = useState(false);

	const tableData = [
		{ id: '1', name: 'John Doe', age: 30 },
		{ id: '2', name: 'Jane Smith', age: 25 },
	];
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
	const groupKeys = Object.keys(groupedData);

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



						{/*<View className="py-1">*/}
						{/*	<Text style={{fontSize: 15, fontFamily: "IBMPlexSans_Bold", color: colors.secondary}}>Unprocessed Electors</Text>*/}
						{/*</View>*/}
						{/*<View className="border border-b-blue-950 rounded-md">*/}
						{/*	<View className="flex-row border-b border-gray-300 px-0 py-2" style={{ backgroundColor: colors.secondary, borderTopLeftRadius: 4, borderTopRightRadius: 4 }}>*/}
						{/*		<Text style={{ width: "8%", color: "#FFF", fontSize: 12, fontFamily: "IBMPlexSans_Bold", textAlign: "center" }}>NO</Text>*/}
						{/*		<Text style={{ width: "22%", color: "#FFF", fontSize: 12, fontFamily: "IBMPlexSans_Bold", textAlign: "center" }}>DISTRICT</Text>*/}
						{/*		<Text style={{ width: "16%", color: "#FFF", fontSize: 12, fontFamily: "IBMPlexSans_Bold", textAlign: "center" }}>MAN</Text>*/}
						{/*		<Text style={{ width: "12%", color: "#FFF", fontSize: 12, fontFamily: "IBMPlexSans_Bold", textAlign: "center" }}>%</Text>*/}
						{/*		<Text style={{ width: "16%", color: "#FFF", fontSize: 12, fontFamily: "IBMPlexSans_Bold", textAlign: "center" }}>WOMAN</Text>*/}
						{/*		<Text style={{ width: "12%", color: "#FFF", fontSize: 12, fontFamily: "IBMPlexSans_Bold", textAlign: "center" }}>%</Text>*/}
						{/*		<Text style={{ width: "14%", color: "#FFF", fontSize: 12, fontFamily: "IBMPlexSans_Bold", textAlign: "center" }}>ALL</Text>*/}
						{/*	</View>*/}

						{/*	/!* Table Rows *!/*/}
						{/*	{Object.entries(groupedData).map(([groupKey, groupItems]) => {*/}
						{/*		const isExpanded = expandedGroups[groupKey] ?? true; // default to expanded*/}

						{/*		return (*/}
						{/*			<View key={groupKey}>*/}
						{/*				/!* Section Separator with Toggle *!/*/}
						{/*				<TouchableOpacity onPress={() => toggleGroup(groupKey)}>*/}
						{/*					<View className="bg-gray-200 px-2 py-1 flex-row justify-between items-center">*/}
						{/*						<Text className="text-xs font-bold text-gray-700 uppercase">{groupKey}</Text>*/}
						{/*						<Text className="text-xs text-gray-500">{isExpanded ? "▲" : "▼"}</Text>*/}
						{/*					</View>*/}
						{/*				</TouchableOpacity>*/}

						{/*				/!* Table Rows (conditionally rendered) *!/*/}
						{/*				{isExpanded &&*/}
						{/*					groupItems.map((item, index) => (*/}
						{/*						<View*/}
						{/*							key={item.KODE_DISTRIK + index}*/}
						{/*							className="flex-row px-0 py-2"*/}
						{/*							style={{ backgroundColor: index % 2 === 0 ? "#ffffff" : "#f9fafb" }}*/}
						{/*						>*/}
						{/*							<Text style={{ width: "8%", fontSize: 11, textAlign: "center", fontFamily: "IBMPlexSans" }}>*/}
						{/*								{item?.KODE_DISTRIK}*/}
						{/*							</Text>*/}
						{/*							<Text style={{ width: "22%", fontSize: 11, fontFamily: "IBMPlexSans" }}>*/}
						{/*								{item?.NAMA_DISTRIK}*/}
						{/*							</Text>*/}
						{/*							<Text style={{ width: "16%", fontSize: 11, textAlign: "right", fontFamily: "IBMPlexSans" }}>*/}
						{/*								{formatNumber(item?.TOTAL_PRIA)}*/}
						{/*							</Text>*/}
						{/*							<Text style={{ width: "12%", fontSize: 11, textAlign: "right", fontFamily: "IBMPlexSans" }}>*/}
						{/*								{item?.PERSEN_PRIA}*/}
						{/*							</Text>*/}
						{/*							<Text style={{ width: "16%", fontSize: 11, textAlign: "right", fontFamily: "IBMPlexSans" }}>*/}
						{/*								{formatNumber(item?.TOTAL_WANITA)}*/}
						{/*							</Text>*/}
						{/*							<Text style={{ width: "12%", fontSize: 11, textAlign: "right", fontFamily: "IBMPlexSans" }}>*/}
						{/*								{item?.PERSEN_WANITA}*/}
						{/*							</Text>*/}
						{/*							<Text style={{ width: "13%", fontSize: 11, textAlign: "right", fontFamily: "IBMPlexSans" }}>*/}
						{/*								{formatNumber(item?.TOTAL_PRIA + item?.TOTAL_WANITA)}*/}
						{/*							</Text>*/}
						{/*						</View>*/}
						{/*					))}*/}
						{/*			</View>*/}
						{/*		);*/}
						{/*	})}*/}
						{/*</View>*/}
					</View>
				</View>
			</ScrollView>
		</>
	)
}

export default ReportRegionDistrictScreen