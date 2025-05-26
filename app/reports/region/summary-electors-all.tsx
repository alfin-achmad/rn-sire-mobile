import {Alert, Image, Platform, ScrollView, Text, TouchableOpacity, View} from "react-native";
import React, {useEffect, useState} from "react";
import colors from "@/constants/colors";
import useReport from "@/queries/useReport";
import CIconFilter from "@/components/CIconFilter";
import {DataTable, Menu} from "react-native-paper";
import {capitalizeWords, formatNumber} from "@/helpers/general";
import {router, useLocalSearchParams} from "expo-router";
import CTopHeaderSubMenu from "@/components/CTopHeaderSubMenu";
import CScrollView from "@/components/CScrollView";
import {Ionicons} from "@expo/vector-icons";
import {useBackRedirect} from "@/hooks/useBackRedirect";
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';

const SummaryElectorsAllScreen = () => {
	useBackRedirect(() => {
		router.push("/reports/region")
		return true;
	});

	const {setParams: setParamsReport, fetchRegionRecap, data: reportData, paramRegionRecap} = useReport();
	const {typeRecap} = useLocalSearchParams();

	const rawData = reportData?.reportRegionRecap || []
	const data = rawData.filter(item => {
		if (typeRecap === 'national') return item.KELOMPOK === '1.NATIONAL';
		if (typeRecap === 'diaspora') return item.KELOMPOK === '2.DIASPORA';
		return true;
	});

	const totalMan = data.reduce((sum, item) => sum + item.TOTAL_PRIA, 0);
	const totalWoman = data.reduce((sum, item) => sum + item.TOTAL_WANITA, 0);
	const totalAll = totalMan + totalWoman;

	const generateElectorTableHTML = (data: any[]): string => {
		const totalPria = data.reduce((sum, item) => sum + item.TOTAL_PRIA, 0);
		const totalWanita = data.reduce((sum, item) => sum + item.TOTAL_WANITA, 0);
		const totalAll = totalPria + totalWanita;

		const tableHeader = `
    <thead>
      <tr style="background-color: #275dad; color: white; font-weight: bold;">
        <th style="width:40px;">#</th>
        <th style="width:120px;">District Name</th>
        <th style="width:70px;">Man</th>
        <th style="width:70px;">%</th>
        <th style="width:70px;">Woman</th>
        <th style="width:70px;">%</th>
        <th style="width:70px;">Total</th>
      </tr>
    </thead>
  `;

		const rows = data.map((item, index) => `
    <tr style="border: 1px solid ; font-size: 12px;">
      <td style="text-align:center;">${index + 1}</td>
      <td style="text-align:left;">${item.NAMA_DISTRIK}</td>
      <td style="text-align:right;">${formatNumber(item.TOTAL_PRIA)}</td>
      <td style="text-align:center;">${item.PERSEN_PRIA} %</td>
      <td style="text-align:right;">${formatNumber(item.TOTAL_WANITA)}</td>
      <td style="text-align:center;">${item.PERSEN_WANITA} %</td>
      <td style="text-align:right;">${formatNumber(item.TOTAL_PRIA + item.TOTAL_WANITA)}</td>
    </tr>
  `).join("");

		const tableFooter = `
    <tfoot>
      <tr style="font-weight: bold; background-color: #e6f2f0;">
        <td colspan="2" style="text-align:center;">TOTAL</td>
        <td style="text-align:right;">${formatNumber(totalPria)}</td>
        <td></td>
        <td style="text-align:right;">${formatNumber(totalWanita)}</td>
        <td></td>
        <td style="text-align:right;">${formatNumber(totalAll)}</td>
      </tr>
    </tfoot>
  `;

		return `
    <table style="width:100%; border-collapse: collapse;">
      ${tableHeader}
      <tbody>
        ${rows}
      </tbody>
      ${tableFooter}
    </table>
  `;
	};


	const htmlContent = `
  <html>
    <head>
      <meta charset="UTF-8" />
      <style>
        body { font-family: Arial, sans-serif; font-size: 12px; padding: 16px; }
        table, th, td { border: 1px solid #175554; border-collapse: collapse; }
        th, td { padding: 4px; }
      </style>
    </head>
    <body>
      <h2>Detailed Report – ${capitalizeWords(typeRecap)} Region Electors</h2>
      ${generateElectorTableHTML(data)}
    </body>
  </html>
`;

	const handleAction = {
		onBack: () => {
			router.push("/reports/region");
		},
		onSwipeRefresh: () => {

		},
		onClickExport: async (typeExport: "pdf"|"excel") => {
			if (typeExport === "pdf") {
				try {
					const { uri } = await Print.printToFileAsync({
						html: htmlContent,
						base64: false,
						fileName: Platform.OS === 'android' ? "testpdf" : undefined,
					});

					if (await Sharing.isAvailableAsync()) {
						await Sharing.shareAsync(uri, {
							mimeType: 'application/pdf',
							dialogTitle: 'Share PDF Report',
						});
					} else {
						alert('Sharing is not available on this device');
					}
				} catch (err) {
					console.error('Failed to export PDF:', err);
				}
			}
		}
	}

	return (
		<CScrollView onRefresh={() => handleAction.onSwipeRefresh()}>
			<>
				<View className="flex-1 bg-gray-100">
					<CTopHeaderSubMenu title="Detailed Report by All Region" handlePress={handleAction.onBack} />
				</View>

				<View className="px-4 py-2">
					<View className="bg-white border border-gray-300 rounded-md pb-2">
						<View className="px-2 py-1">
							<View className="flex">
								<Text
									className="text-[14px]"
									style={{ fontFamily: 'IBMPlexSans_Bold', color: colors.secondary }}
								>
									Detailed Report – {capitalizeWords(typeRecap)} Region Electors
								</Text>
								<Text
									className="text-[11px] mt-0 mb-1"
									style={{ fontFamily: 'IBMPlexSans', color: colors.secondary }}
								>
									Elector statistics by {typeRecap} region.
								</Text>
							</View>

							<ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-2">
								<DataTable>
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
												borderLeftWidth: 1,
												borderRightWidth: 1,
												borderColor: colors.secondary,
												height: 26,
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
									<View
										style={{
											flexDirection: 'row',
											borderBottomWidth: 1,
											borderLeftWidth: 1,
											borderRightWidth: 1,
											borderColor: colors.secondary,
											height: 30,
											backgroundColor: '#e6f2f0',
											alignItems: 'center',
											paddingHorizontal: 0
										}}
									>
										<View style={{ width: 160, paddingHorizontal: 4 }}>
											<Text
												style={{
													fontFamily: 'IBMPlexSans_Bold',
													fontSize: 12,
													color: colors.secondary,
													textAlign: "center"
												}}
											>
												TOTAL
											</Text>
										</View>
										<View style={{ width: 70, paddingHorizontal: 4 }}>
											<Text
												style={{
													fontFamily: 'IBMPlexSans_Bold',
													fontSize: 12,
													color: colors.secondary,
													textAlign: 'right',
												}}
											>
												{formatNumber(totalMan)}
											</Text>
										</View>
										<View style={{ width: 70 }} />
										<View style={{ width: 70, paddingHorizontal: 4 }}>
											<Text
												style={{
													fontFamily: 'IBMPlexSans_Bold',
													fontSize: 12,
													color: colors.secondary,
													textAlign: 'right',
												}}
											>
												{formatNumber(totalWoman)}
											</Text>
										</View>
										<View style={{ width: 70 }} />
										<View style={{ width: 70, paddingHorizontal: 4 }}>
											<Text
												style={{
													fontFamily: 'IBMPlexSans_Bold',
													fontSize: 12,
													color: colors.secondary,
													textAlign: 'right',
												}}
											>
												{formatNumber(totalAll)}
											</Text>
										</View>
									</View>
								</DataTable>
							</ScrollView>
							<View className="flex-row justify-between items-center mt-2 space-x-2 gap-1">
								<TouchableOpacity
									disabled={true}
									className="flex-1 disabled flex-row py-2 justify-center bg-gray-400 gap-1 rounded-md items-center"
									onPress={() => console.log("excel")}
								>
									<Ionicons name="document-text-outline" size={18} color="#fff" />
									<Text className="text-white font-semibold">Export to Excel</Text>
								</TouchableOpacity>

								<TouchableOpacity
									className="flex-1 flex-row py-2 justify-center gap-1 rounded-md items-center"
									onPress={() => handleAction.onClickExport("pdf")}
									style={{backgroundColor: colors.secondary}}
								>
									<Ionicons name="document-attach-outline" size={18} color="#fff" />
									<Text className="text-white font-semibold">Export to PDF</Text>
								</TouchableOpacity>
							</View>
						</View>
					</View>
				</View>
			</>
		</CScrollView>
	)
}

export default SummaryElectorsAllScreen