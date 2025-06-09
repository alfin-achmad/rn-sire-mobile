import {useBackRedirect} from "@/hooks/useBackRedirect";
import {APP_ROUTES} from "@/constants/urls";
import useReport from "@/queries/useReport";
import {router, useRouter} from "expo-router";
import React, {useState} from "react";
import CScrollView from "@/components/CScrollView";
import {TouchableOpacity, View} from "react-native";
import CTopHeaderSubMenu from "@/components/CTopHeaderSubMenu";
import {Menu, Modal, Portal, Text} from "react-native-paper";
import colors from "@/constants/colors";
import CIconFilter from "@/components/CIconFilter";
import {formatDate, parseFormattedDate, registrationStartDate} from "@/helpers/formatDate";
import CAndroidDatePicker from "@/components/CAndroidDatepicker";
import StatsRegionDisabilityRecap from "@/app/reports/disability/components/StatsRegionDisabilityRecap";

const ReportByDisabilityScreen = () => {
	useBackRedirect(() => {
		router.replace(APP_ROUTES.MAIN.REPORTS);
		return true;
	});

	const {setParams: setParamsReport, data: reportData, isLoadingRegionAgeRecap, paramRegionDisabilityRecap, fetchRegionDisabilityRecap } = useReport();

	const [menuVisible, setMenuVisible] = useState(false);
	const [showModalFilterPeriod, setShowModalFilterPeriod] = useState(false);

	const router = useRouter();
	const dataRecap = reportData?.reportRegionDisabilitySummaryRecap;
	const dataNational = dataRecap['NATIONAL'] || {}

	const handleAction = {
		onBack: () => {
			router.push(APP_ROUTES.MAIN.REPORTS);
		},
		onClickDetail: (typeRecap) => {
			router.replace({
				pathname: "/reports/disability/summary-electors-disability",
				params: {
					typeRecap: typeRecap
				}
			})
		},
		onClickExport: (typeRecap) => {

		},
		onSwipeRefresh: () => {

		},
		onClickOptionChart: (typeFilter: "filter-period") => {
			if (typeFilter === "filter-period") {
				setShowModalFilterPeriod(true);
			}
		},
		onApplyFilterPeriod: () => {
			setShowModalFilterPeriod(false);
			fetchRegionDisabilityRecap()
		}
	}

	return (
		<>
			<CScrollView onRefresh={() => handleAction.onSwipeRefresh()}>
				<View className="flex-1 bg-gray-100">
					<CTopHeaderSubMenu title="Report by Electors Disability" handlePress={handleAction.onBack} />

					<View className="px-4 py-2">
						<View className="bg-white border border-gray-300 rounded-md pt-2 pb-4">
							<View className="flex flex-row justify-between px-2">
								<View className="mb-1 flex flex-1">
									<Text style={{fontSize: 15, fontFamily: "IBMPlexSans_Bold", color: colors.secondary}}>Report by Electors Disability</Text>
									<Text
										className="text-[11px] mt-0 mb-1"
										style={{ fontFamily: 'IBMPlexSans', color: colors.secondary }}
									>
										Overview of elector disability by area.
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
												handleAction.onClickOptionChart('filter-period');
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
									</>
								</Menu>
							</View>

							<View className="px-2 pb-1 mt-1">
								<View className="flex-row items-center justify-between">
									<Text style={{ color: colors.secondary, fontFamily: "IBMPlexSans_Bold", fontSize: 11 }}>
										Periode : {paramRegionDisabilityRecap?.prtanggal1}
									</Text>
								</View>
							</View>

							<View className="px-2 mb-1">
								<StatsRegionDisabilityRecap title="Elector Summary by Disability (National)" data={dataNational} section="national" isLoading={isLoadingRegionAgeRecap} handleAction={handleAction} />
							</View>

							<View className="mt-1 px-2">
								<Text
									style={{
										fontSize: 10,
										fontFamily: "IBMPlexSans",
										color: colors.secondary,
										fontStyle: 'italic',
									}}
								>
									Tap any title of widget above to see detailed reports.
								</Text>
							</View>
						</View>
					</View>
				</View>
			</CScrollView>

			<Portal>
				<Modal dismissable={true} onDismiss={() => setShowModalFilterPeriod(false)} visible={showModalFilterPeriod} contentContainerStyle={{backgroundColor: "#FFF", paddingHorizontal: 16, paddingVertical: 10, borderRadius: 5, marginHorizontal: 14}}>
					<Text style={{fontFamily: "IBMPlexSans_Bold", color: colors.secondary}} className="mb-4">Select Period</Text>

					<CAndroidDatePicker
						startDate={parseFormattedDate(paramRegionDisabilityRecap?.prtanggal1)}
						onChangeStart={(e) => setParamsReport('paramRegionDisabilityRecap', {prtanggal1: (e === registrationStartDate() ? "ALL" : formatDate(e))})}
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

export default ReportByDisabilityScreen;