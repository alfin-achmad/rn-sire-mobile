import {useBackRedirect} from "@/hooks/useBackRedirect";
import {router, useLocalSearchParams} from "expo-router";
import useReport from "@/queries/useReport";
import React, {useState} from "react";
import {capitalizeWords, formatNumber} from "@/helpers/general";
import {formatDate, parseFormattedDate, registrationStartDate} from "@/helpers/formatDate";
import * as Print from "expo-print";
import {ActivityIndicator, Alert, Platform, ScrollView, Text, TouchableOpacity, View} from "react-native";
import * as Sharing from "expo-sharing";
import CTopHeaderSubMenu from "@/components/CTopHeaderSubMenu";
import colors from "@/constants/colors";
import {DataTable, Menu, Modal, Portal} from "react-native-paper";
import CIconFilter from "@/components/CIconFilter";
import CAndroidDatePicker from "@/components/CAndroidDatepicker";

const SummaryElectorsDisabilityScreen = () => {
	useBackRedirect(() => {
		router.push("/reports/disability")
		return true;
	});

	const {setParams: setParamsReport, fetchRegionDisabilityRecap, data: reportData, paramRegionDisabilityRecap, isLoadingRegionDisabilityRecap} = useReport();
	const {typeRecap} = useLocalSearchParams();

	const [menuVisible, setMenuVisible] = useState(false);
	const [showModalFilterPeriod, setShowModalFilterPeriod] = useState(false);

	const rawData = reportData?.reportRegionDisabilityRecap || []
	const data = rawData.filter(item => {
		if (typeRecap === 'national') return item?.KELOMPOK === 'NATIONAL';
		if (typeRecap === 'diaspora') return item?.KELOMPOK === 'DIASPORA';
		return true;
	});

	const totalMatan = data.reduce((sum, item) => sum + item?.TOTAL_MATAN, 0);
	const totalTilun = data.reduce((sum, item) => sum + item?.TOTAL_TILUN, 0);
	const totalFisico = data.reduce((sum, item) => sum + item?.TOTAL_FISICO, 0);
	const totalMental = data.reduce((sum, item) => sum + item?.TOTAL_MENTAL, 0);
	const totalSeluk = data.reduce((sum, item) => sum + item?.TOTAL_SELUK, 0);
	const totalAll = totalMatan + totalTilun + totalFisico + totalMental + totalSeluk;

	const generateElectorTableHTML = (data: any[]): string => {
		const tableHeader = `
    <thead>
      <tr style="background-color: #275dad; color: white; font-weight: bold;">
        <th style="width:40px;">#</th>
        <th style="width:120px;">District Name</th>
        <th style="width:70px;">Matan</th>
        <th style="width:70px;">Tilun</th>
        <th style="width:70px;">Fisico</th>
        <th style="width:70px;">Mental</th>
        <th style="width:70px;">Seluk</th>
        <th style="width:70px;">Total</th>
      </tr>
    </thead>
  `;

		const rows = data.map((item, index) => `
    <tr style="border: 1px solid ; font-size: 12px;">
      <td style="text-align:center;">${index + 1}</td>
      <td style="text-align:left;">${item.NAMA_DISTRIK}</td>
      <td style="text-align:right;">${formatNumber(item.TOTAL_MATAN)}</td>
      <td style="text-align:right;">${formatNumber(item.TOTAL_TILUN)}</td>
      <td style="text-align:right;">${formatNumber(item.TOTAL_FISICO)}</td>
      <td style="text-align:right;">${formatNumber(item.TOTAL_MENTAL)}</td>
      <td style="text-align:right;">${formatNumber(item.TOTAL_SELUK)}</td>
      <td style="text-align:right;">${formatNumber(item.TOTAL_MATAN + item.TOTAL_TILUN + item.TOTAL_FISICO + item.TOTAL_MENTAL + item.TOTAL_SELUK)}</td>
    </tr>
  `).join("");

		const tableFooter = `
    <tfoot>
      <tr style="font-weight: bold; background-color: #e6f2f0;">
        <td colspan="2" style="text-align:center;">TOTAL</td>
        <td style="text-align:right;">${formatNumber(totalMatan)}</td>
        <td style="text-align:right;">${formatNumber(totalTilun)}</td>
        <td style="text-align:right;">${formatNumber(totalFisico)}</td>
        <td style="text-align:right;">${formatNumber(totalMental)}</td>
        <td style="text-align:right;">${formatNumber(totalSeluk)}</td>
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
      <h3>Reporting Period : ${paramRegionDisabilityRecap?.prtanggal1}</h3>
      ${generateElectorTableHTML(data)}
    </body>
  </html>
`;

	const handleAction = {
		onBack: () => {
			router.push("/reports/disability");
		},
		onClickFilterPeriod: () => {
			setShowModalFilterPeriod(true);
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
		},
		onApplyFilterPeriod: () => {
			setShowModalFilterPeriod(false);
			fetchRegionDisabilityRecap()
		}
	}

	return (
		<>
			<CTopHeaderSubMenu title="Detailed Report by All Region" handlePress={handleAction.onBack} />
			<View className="flex">
				<View className="px-4 py-2">
					<View className="bg-white border border-gray-300 rounded-md pb-2">
						<View className="px-2 py-1">
							<View className="flex flex-row justify-between">
								<View className="mb-1 flex flex-1">
									<Text
										className="text-[14px]"
										style={{ fontFamily: 'IBMPlexSans_Bold', color: colors.secondary }}
									>
										Detailed Report – {capitalizeWords(typeRecap)} Disability Electors
									</Text>
									<Text
										className="text-[11px] mt-0 mb-1"
										style={{ fontFamily: 'IBMPlexSans', color: colors.secondary }}
									>
										Elector statistics by {typeRecap} disability.
									</Text>
								</View>
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
									<>
										<Menu.Item
											onPress={() => {
												setMenuVisible(false);
												handleAction.onClickFilterPeriod();
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

												if (isLoadingRegionDisabilityRecap){
													Alert.alert(
														"Export failed",
														"Data is being fetched, please wait...",
														[{ text: "OK" }]
													);
												} else {
													handleAction.onClickExport('pdf');
												}
											}}
											title="Export to PDF"
											titleStyle={{
												color: isLoadingRegionDisabilityRecap ? "#CCC" : colors.secondary,
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
								</Menu>
							</View>

							<View className="pb-0 mt-1">
								<View className="flex-row items-center justify-between">
									<Text style={{ color: colors.secondary, fontFamily: "IBMPlexSans_Bold", fontSize: 11 }}>
										Reporting Period : {paramRegionDisabilityRecap?.prtanggal1}
									</Text>
								</View>
							</View>

							{
								isLoadingRegionDisabilityRecap ? (
									<ActivityIndicator color={colors.secondary} className="mt-2" />
								):(
									<ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-1">
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
													{ label: 'Matan', width: 70 },
													{ label: 'Tilun', width: 70 },
													{ label: 'Fisico', width: 70 },
													{ label: 'Mental', width: 70 },
													{ label: 'Seluk', width: 70 },
													{ label: 'All', width: 70 },
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
														{ value: formatNumber(item?.TOTAL_MATAN), width: 70, textAlign: 'right' },
														{ value: formatNumber(item?.TOTAL_TILUN), width: 70, textAlign: 'right' },
														{ value: formatNumber(item?.TOTAL_FISICO), width: 70, textAlign: 'right' },
														{ value: formatNumber(item?.TOTAL_MENTAL), width: 70, textAlign: 'right' },
														{ value: formatNumber(item?.TOTAL_SELUK), width: 70, textAlign: 'right' },
														{ value: formatNumber((item?.TOTAL_MATAN + item?.TOTAL_TILUN + item?.TOTAL_FISICO + item?.TOTAL_MENTAL + item?.TOTAL_SELUK)), width: 70, textAlign: 'right' },
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
														{formatNumber(totalMatan)}
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
														{formatNumber(totalTilun)}
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
														{formatNumber(totalFisico)}
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
														{formatNumber(totalMental)}
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
														{formatNumber(totalSeluk)}
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
														{formatNumber(totalAll)}
													</Text>
												</View>
											</View>
										</DataTable>
									</ScrollView>
								)
							}
						</View>
					</View>
				</View>
			</View>

			<Portal>
				<Modal dismissable={true} onDismiss={() => setShowModalFilterPeriod(false)} visible={showModalFilterPeriod} contentContainerStyle={{backgroundColor: "#FFF", paddingHorizontal: 16, paddingVertical: 10, borderRadius: 5, marginHorizontal: 14}}>
					<Text style={{fontFamily: "IBMPlexSans_Bold", color: colors.secondary}} className="mb-4">Select Period</Text>

					<CAndroidDatePicker
						startDate={parseFormattedDate(paramRegionDisabilityRecap?.prtanggal1)}
						onChangeStart={(e) => setParamsReport('paramRegionDisabilityRecap', {prtanggal1: formatDate(e)})}
					/>

					<TouchableOpacity
						onPress={() => handleAction.onApplyFilterPeriod()}
						className="mt-4 p-2 rounded-md items-center"
						style={{backgroundColor: colors.secondary}}
					>
						<Text className="text-lg" style={{color: "#FFF"}}>Apply</Text>
					</TouchableOpacity>
				</Modal>
			</Portal>
		</>
	)
}

export default SummaryElectorsDisabilityScreen;