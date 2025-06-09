import {ActivityIndicator, Alert, Image, Platform, ScrollView, Text, TouchableOpacity, View} from "react-native";
import React, {useEffect, useState} from "react";
import colors from "@/constants/colors";
import useReport from "@/queries/useReport";
import CIconFilter from "@/components/CIconFilter";
import {DataTable, Menu, Modal, Portal} from "react-native-paper";
import {capitalizeWords, formatNumber} from "@/helpers/general";
import {router, useLocalSearchParams} from "expo-router";
import CTopHeaderSubMenu from "@/components/CTopHeaderSubMenu";
import CScrollView from "@/components/CScrollView";
import {Ionicons} from "@expo/vector-icons";
import {useBackRedirect} from "@/hooks/useBackRedirect";
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import {formatDate, parseFormattedDate, registrationStartDate} from "@/helpers/formatDate";
import CAndroidDatePicker from "@/components/CAndroidDatepicker";

const SummaryElectorsAgeGroupScreen = () => {
	useBackRedirect(() => {
		router.push("/reports/age-group")
		return true;
	});

	const {setParams: setParamsReport, fetchRegionAgeRecap, data: reportData, paramRegionAgeRecap, isLoadingRegionAgeRecap} = useReport();
	const {typeRecap} = useLocalSearchParams();

	const [menuVisible, setMenuVisible] = useState(false);
	const [showModalFilterPeriod, setShowModalFilterPeriod] = useState(false);

	const rawData = reportData?.reportRegionAgeRecap || []
	const data = rawData?.[typeRecap];
	// console.log("==============", reportData?.reportRegionAgeRecap, isLoadingRegionAgeRecap)
	const sumByKey = (data, key) => data?.reduce((sum, item) => sum + (item[key] || 0), 0);
	const totalU16UP_mane = sumByKey(data, 'U16UP_MANE');
	const totalU16UP_feto = sumByKey(data, 'U16UP_FETO');
	const totalU16UP_total = sumByKey(data, 'U16UP');

	const totalU1734UP_mane = sumByKey(data, 'U1734UP_MANE');
	const totalU1734UP_feto = sumByKey(data, 'U1734UP_FETO');
	const totalU1734UP_total = sumByKey(data, 'U1734UP');

	const totalU3559UP_mane = sumByKey(data, 'U3559UP_MANE');
	const totalU3559UP_feto = sumByKey(data, 'U3559UP_FETO');
	const totalU3559UP_total = sumByKey(data, 'U3559UP');

	const totalU60UP_mane = sumByKey(data, 'U60UP_MANE');
	const totalU60UP_feto = sumByKey(data, 'U60UP_FETO');
	const totalU60UP_total = sumByKey(data, 'U60UP');

	const ageGroups = [
		{ key: "U16UP", mane: totalU16UP_mane, feto: totalU16UP_feto, total: totalU16UP_total },
		{ key: "U1734UP", mane: totalU1734UP_mane, feto: totalU1734UP_feto, total: totalU1734UP_total },
		{ key: "U3559UP", mane: totalU3559UP_mane, feto: totalU3559UP_feto, total: totalU3559UP_total },
		{ key: "U60UP", mane: totalU60UP_mane, feto: totalU60UP_feto, total: totalU60UP_total },
	];

	const generateElectorTableHTML = (data: any[]): string => {
		const totalPria = data?.reduce((sum, item) => sum + item.TOTAL_PRIA, 0);
		const totalWanita = data?.reduce((sum, item) => sum + item.TOTAL_WANITA, 0);
		const totalAll = totalPria + totalWanita;

		const tableHeader = `
	    <thead>
		    <tr style="background-color: #275dad; color: white; font-weight: bold;">
		      <th rowspan="2" style="border: 1px solid #ccc;">No</th>
		      <th rowspan="2" style="border: 1px solid #ccc;">Munisípiu</th>
		      <th colspan="3" style="border: 1px solid #ccc;">16</th>
		      <th colspan="3" style="border: 1px solid #ccc;">17 - 34</th>
		      <th colspan="3" style="border: 1px solid #ccc;">35 - 59</th>
		      <th colspan="3" style="border: 1px solid #ccc;">&gt;= 60</th>
		    </tr>
		    <tr style="background-color: #275dad; color: white; font-weight: bold;">
		      <th style="border: 1px solid #ccc;">Man</th>
		      <th style="border: 1px solid #ccc;">Woman</th>
		      <th style="border: 1px solid #ccc;">Total</th>
		      <th style="border: 1px solid #ccc;">Man</th>
		      <th style="border: 1px solid #ccc;">Woman</th>
		      <th style="border: 1px solid #ccc;">Total</th>
		      <th style="border: 1px solid #ccc;">Man</th>
		      <th style="border: 1px solid #ccc;">Woman</th>
		      <th style="border: 1px solid #ccc;">Total</th>
		      <th style="border: 1px solid #ccc;">Man</th>
		      <th style="border: 1px solid #ccc;">Woman</th>
		      <th style="border: 1px solid #ccc;">Total</th>
		    </tr>
		  </thead>
  	`;

		const rows = data?.map((item, index) => `
    	<tr style="border: 1px solid ; font-size: 12px;">
	      <td style="border: 1px solid #ccc;  font-weight: bold; color: black;">${index+1}</td>
	      <td style="border: 1px solid #ccc; ">${item?.NAMA_DISTRIK}</td>
	      <td style="text-align: right; border: 1px solid #ccc; ">${formatNumber(item?.U16UP_MANE)}</td>
	      <td style="text-align: right; border: 1px solid #ccc; ">${formatNumber(item?.U16UP_FETO)}</td>
	      <td style="text-align: right; border: 1px solid #ccc; ">${formatNumber(item?.U16UP)}</td>
	      <td style="text-align: right; border: 1px solid #ccc; ">${formatNumber(item?.U1734UP_MANE)}</td>
	      <td style="text-align: right; border: 1px solid #ccc; ">${formatNumber(item?.U1734UP_FETO)}</td>
	      <td style="text-align: right; border: 1px solid #ccc; ">${formatNumber(item?.U1734UP)}</td>
	      <td style="text-align: right; border: 1px solid #ccc; ">${formatNumber(item?.U3559UP_MANE)}</td>
	      <td style="text-align: right; border: 1px solid #ccc; ">${formatNumber(item?.U3559UP_FETO)}</td>
	      <td style="text-align: right; border: 1px solid #ccc; ">${formatNumber(item?.U3559UP)}</td>
	      <td style="text-align: right; border: 1px solid #ccc; ">${formatNumber(item?.U60UP_MANE)}</td>
	      <td style="text-align: right; border: 1px solid #ccc; ">${formatNumber(item?.U60UP_FETO)}</td>
	      <td style="text-align: right; border: 1px solid #ccc; ">${formatNumber(item?.U60UP)}</td>
	    </tr>
	  `).join("");

		const tableFooter = `
		  <tfoot>
		    <tr style="font-weight: bold; background-color: #e6f2f0;">
		      <td colspan="2" style="text-align:center;">TOTAL</td>
		      <td style="text-align:right;">${formatNumber(totalU16UP_mane)}</td>
		      <td style="text-align:right;">${formatNumber(totalU16UP_feto)}</td>
		      <td style="text-align:right;">${formatNumber(totalU16UP_total)}</td>
		
		      <td style="text-align:right;">${formatNumber(totalU1734UP_mane)}</td>
		      <td style="text-align:right;">${formatNumber(totalU1734UP_feto)}</td>
		      <td style="text-align:right;">${formatNumber(totalU1734UP_total)}</td>
		
		      <td style="text-align:right;">${formatNumber(totalU3559UP_mane)}</td>
		      <td style="text-align:right;">${formatNumber(totalU3559UP_feto)}</td>
		      <td style="text-align:right;">${formatNumber(totalU3559UP_total)}</td>
		
		      <td style="text-align:right;">${formatNumber(totalU60UP_mane)}</td>
		      <td style="text-align:right;">${formatNumber(totalU60UP_feto)}</td>
		      <td style="text-align:right;">${formatNumber(totalU60UP_total)}</td>
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
	      @page {
			    size: A4 landscape;
			    margin: 0mm;
			  }
        body { font-family: Arial, sans-serif; font-size: 12px; padding: 16px; }
        table, th, td { border: 1px solid #175554; border-collapse: collapse; }
        th, td { padding: 4px; }
      </style>
    </head>
    <body>
      <h2>Detailed Report Electors by Age Group – ${capitalizeWords(typeRecap)} Region</h2>
      ${generateElectorTableHTML(data)}
    </body>
  </html>
`;

	const handleAction = {
		onBack: () => {
			router.push("/reports/age-group");
		},
		onClickFilterPeriod: () => {
			setShowModalFilterPeriod(true);
		},
		onClickExport: async (typeExport: "pdf"|"excel") => {
			if (typeExport === "pdf") {
				try {
					const { uri } = await Print.printToFileAsync({
						html: !isLoadingRegionAgeRecap && htmlContent,
						base64: false,
						fileName: Platform.OS === 'android' ? "detail-report-elector-by-group.pdf" : undefined,
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
			fetchRegionAgeRecap()
		}
	}

	return (
		<>
			<CTopHeaderSubMenu title="Detailed Report by Age Group" handlePress={handleAction.onBack} />
			<View className="flex">
				<View className="px-4 py-2">
					<View className="bg-white border border-gray-300 rounded-md pb-2">
						<View className="px-2 py-1">
							<View className="flex flex-row justify-between">
								<View className="mb-1 flex flex-1">
									<Text
										className="text-[13px]"
										style={{ fontFamily: 'IBMPlexSans_Bold', color: colors.secondary }}
									>
										Elector Summary by Age Group ({capitalizeWords(typeRecap)} Region)
									</Text>
									<Text
										className="text-[11px] mt-0 mb-1"
										style={{ fontFamily: 'IBMPlexSans', color: colors.secondary }}
									>
										Elector statistics by {typeRecap} region.
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

												if (isLoadingRegionAgeRecap){
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
												color: isLoadingRegionAgeRecap ? "#CCC" : colors.secondary,
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
										Reporting Period : {paramRegionAgeRecap?.prtanggal1 === "ALL" ? registrationStartDate() : formatDate(paramRegionAgeRecap?.prtanggal1)} - {formatDate(paramRegionAgeRecap?.prtanggal2, "dd/MM/yyyy")}
									</Text>
								</View>
							</View>

							{
								isLoadingRegionAgeRecap ? (
									<ActivityIndicator color={colors.secondary} className="mt-2" />
								):(
									<ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-1">
										<View className="border border-blue-950 rounded-tr-md rounded-tl-md">
											{/* First row: Main header */}
											<View className="flex-row">
												<View className=" border-r border-b border-blue-950 rounded-tl-sm" style={{  width: 130, height: 26, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.secondary }}>
													<Text style={{ fontFamily: "IBMPlexSans_Bold", color: "#FFF" }}>Age</Text>
												</View>
												{["16", "17 - 34", "35 - 59", ">= 60"].map((ageGroup, index, arr) => (
													<View key={ageGroup} className={`${index !== arr.length - 1 ? 'border-r' : 'rounded-tr-sm'} border-b border-blue-950`} style={{ backgroundColor: colors.secondary, flexDirection: 'row', flex: 3 }}>
														<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: 239 }}>
															<Text style={{ fontFamily: "IBMPlexSans_Bold", color: "#FFF" }}>{ageGroup}</Text>
														</View>
													</View>
												))}
											</View>

											{/* Second row: Sub-headers */}
											<View className="flex-row">
												<View className=" border-r border-blue-950" style={{ backgroundColor: "#F9FAFB", width: 130, height: 26, justifyContent: 'center', alignItems: 'center' }} />
												{Array(4).fill(null).map((_, idx, arr) => (
													["Man", "Woman", "Total"].map((label, labelIdx, labelArr) => {
														const isLastCell = idx === arr.length - 1 && labelIdx === labelArr.length - 1;
														return (
															<View
																key={`${idx}-${label}`}
																className={`bg-white ${!isLastCell ? 'border-r' : ''} border-blue-950`}
																style={{ width: 80, height: 26, justifyContent: 'center', alignItems: 'center', backgroundColor: "#F9FAFB" }}
															>
																<Text style={{ fontFamily: "IBMPlexSans_Bold", fontSize: 12, color: colors.secondary }}>{label}</Text>
															</View>
														);
													})
												))}
											</View>

											{data?.map((region, regionIdx) => {
												const columns = [
													{ key: 'U16UP_MANE', value: region?.U16UP_MANE },
													{ key: 'U16UP_FETO', value: region?.U16UP_FETO },
													{ key: 'U16UP', value: region?.U16UP },
													{ key: 'U1734UP_MANE', value: region?.U1734UP_MANE },
													{ key: 'U1734UP_FETO', value: region?.U1734UP_FETO },
													{ key: 'U1734UP', value: region?.U1734UP },
													{ key: 'U3559UP_MANE', value: region?.U3559UP_MANE },
													{ key: 'U3559UP_FETO', value: region?.U3559UP_FETO },
													{ key: 'U3559UP', value: region?.U3559UP },
													{ key: 'U60UP_MANE', value: region?.U60UP_MANE },
													{ key: 'U60UP_FETO', value: region?.U60UP_FETO },
													{ key: 'U60UP', value: region?.U60UP },
												];

												return (
													<View key={`${region?.NAMA_DISTRIK}_${regionIdx}`} style={{ flexDirection: 'row' }}>
														<View
															style={{
																backgroundColor: '#F9FAFB',
																borderTopWidth: 1,
																borderRightWidth: 1,
																borderBottomLeftRadius: 6,
																borderColor: colors.secondary,
																paddingHorizontal: 4,
																width: 130,
																justifyContent: 'center',
																height: 26,
															}}
														>
															<Text
																style={{
																	fontFamily: 'IBMPlexSans_Bold',
																	color: colors.secondary,
																	fontSize: 11,
																	textAlign: 'left',
																}}
															>
																{region?.NAMA_DISTRIK}
															</Text>
														</View>

														{columns.map((col, colIdx) => (
															<View
																key={col.key}
																style={{
																	backgroundColor: '#F9FAFB',
																	borderTopWidth: 1,
																	borderRightWidth: colIdx === columns.length - 1 ? 0 : 1,
																	borderColor: colors.secondary,
																	paddingHorizontal: 4,
																	width: 80,
																	height: 26,
																	justifyContent: 'center',
																	borderBottomRightRadius: colIdx === columns.length - 1 ? 6 : 0,
																}}
															>
																<Text
																	style={{
																		fontFamily: 'IBMPlexSans',
																		fontSize: 12,
																		color: colors.secondary,
																		textAlign: 'right',
																	}}
																>
																	{formatNumber(col.value)}
																</Text>
															</View>
														))}
													</View>
												);
											})}

											<View key="TOTAL_AGEGROUP" className="flex-row">
												<View
													className="border-t border-r border-blue-950 px-1"
													style={{
														width: 130,
														justifyContent: 'center',
														height: 26,
														backgroundColor: "#F9FAFB",
													}}
												>
													<Text style={{ fontFamily: "IBMPlexSans_Bold", color: colors.secondary, fontSize: 11, textAlign: "left" }}>
														TOTAL
													</Text>
												</View>

												{ageGroups.flatMap(({ key, mane, feto, total }, index) => {
													const isLastGroup = index === ageGroups.length - 1;
													const baseClass = "border-t border-blue-950 px-2";
													const baseStyle = {
														width: 80,
														height: 26,
														justifyContent: 'center',
														backgroundColor: "#F9FAFB",
													};

													const textStyle = {
														fontFamily: "IBMPlexSans_Bold",
														fontSize: 12,
														color: colors.secondary,
														textAlign: "right",
													};

													return [
														<View key={`${key}_mane`} className={`${baseClass} border-r`} style={baseStyle}>
															<Text style={textStyle}>{formatNumber(mane || 0)}</Text>
														</View>,
														<View key={`${key}_feto`} className={`${baseClass} border-r`} style={baseStyle}>
															<Text style={textStyle}>{formatNumber(feto || 0)}</Text>
														</View>,
														<View
															key={`${key}_total`}
															className={`${baseClass} ${isLastGroup ? '' : 'border-r'}`}
															style={baseStyle}
														>
															<Text style={textStyle}>{formatNumber(total|| 0)}</Text>
														</View>,
													];
												})}
											</View>
										</View>
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
						startDate={parseFormattedDate(paramRegionAgeRecap?.prtanggal1 === "ALL" ? registrationStartDate() : paramRegionAgeRecap?.prtanggal1)}
						endDate={parseFormattedDate(paramRegionAgeRecap?.prtanggal2)}
						onChangeStart={(e) => setParamsReport('paramRegionAgeRecap', {prtanggal1: (e === registrationStartDate() ? "ALL" : formatDate(e))})}
						onChangeEnd={(e) => setParamsReport('paramRegionAgeRecap', {prtanggal2: formatDate(e)})}
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

export default SummaryElectorsAgeGroupScreen