import {router, useFocusEffect, useRouter} from "expo-router";
import {APP_ROUTES} from "@/constants/urls";
import CTopHeaderSubMenu from "@/components/CTopHeaderSubMenu";
import {Animated, BackHandler, ScrollView, TouchableOpacity, View} from "react-native";
import React, {useCallback, useEffect, useState} from "react";
import {useBackRedirect} from "@/hooks/useBackRedirect";
import CDashboardStats from "@/components/CDashboardStats";
import useReport from "@/queries/useReport";
import {Menu, Modal, Portal, Text} from "react-native-paper";
import colors from "@/constants/colors";
import CScrollView from "@/components/CScrollView";
import StatsRegionAgeRecap from "@/app/reports/age-group/components/StatsRegionAgeRecap";
import CAndroidDatePicker from "@/components/CAndroidDatepicker";
import {formatDate, parseFormattedDate, registrationStartDate} from "@/helpers/formatDate";
import CIconFilter from "@/components/CIconFilter";

const ReportByAgeGroupScreen = () => {
	useBackRedirect(() => {
		router.replace(APP_ROUTES.MAIN.REPORTS);
		return true;
	});

	const {setParams: setParamsReport, data: reportData, isLoadingRegionAgeRecap, paramRegionAgeRecap, fetchRegionAgeRecap } = useReport();

	const [menuVisible, setMenuVisible] = useState(false);
	const [showModalFilterPeriod, setShowModalFilterPeriod] = useState(false);

	const router = useRouter();
	const dataRecap = reportData?.reportRegionAgeSummaryRecap;
	const dataNational = dataRecap['NATIONAL']
	const dataDiaspora = dataRecap['DIASPORA']
	const dataAll = dataRecap['ALL']

	const handleAction = {
		onBack: () => {
			router.push(APP_ROUTES.MAIN.REPORTS);
		},
		onClickDetail: (typeRecap) => {
			router.replace({
				pathname: "/reports/age-group/summary-electors-age-group",
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
			fetchRegionAgeRecap()
		}
	}

	return (
		<>
			<CScrollView onRefresh={() => handleAction.onSwipeRefresh()}>
				<View className="flex-1 bg-gray-100">
					<CTopHeaderSubMenu title="Report by Age Group" handlePress={handleAction.onBack} />

					<View className="px-4 py-2">
						<View className="bg-white border border-gray-300 rounded-md pt-2 pb-4">
							<View className="flex flex-row justify-between px-2">
								<View className="mb-1 flex flex-1">
									<Text style={{fontSize: 15, fontFamily: "IBMPlexSans_Bold", color: colors.secondary}}>Report Electors By Age</Text>
									<Text
										className="text-[11px] mt-0 mb-1"
										style={{ fontFamily: 'IBMPlexSans', color: colors.secondary }}
									>
										Overview of elector age groups by area.
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
										Periode : {paramRegionAgeRecap?.prtanggal1 === "ALL" ? registrationStartDate() : formatDate(paramRegionAgeRecap?.prtanggal1)} - {formatDate(paramRegionAgeRecap?.prtanggal2, "dd/MM/yyyy")}
									</Text>
								</View>
							</View>

							<View className="px-2 mb-1">
								<StatsRegionAgeRecap title="Elector Summary by Age Group (All Regions)" data={dataAll} section="all" isLoading={isLoadingRegionAgeRecap} handleAction={handleAction} />
							</View>
							<View className="px-2 mb-1">
								<StatsRegionAgeRecap title="Elector Summary by Age Group (National)" data={dataNational} section="national" isLoading={isLoadingRegionAgeRecap} handleAction={handleAction} />
							</View>
							<View className="px-2">
								<StatsRegionAgeRecap title="Elector Summary by Age Group (Diaspora)" data={dataDiaspora} section="diaspora" isLoading={isLoadingRegionAgeRecap} handleAction={handleAction} />
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

export default ReportByAgeGroupScreen