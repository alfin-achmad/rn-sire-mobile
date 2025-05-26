import {router, useFocusEffect, useRouter} from "expo-router";
import {APP_ROUTES} from "@/constants/urls";
import CTopHeaderSubMenu from "@/components/CTopHeaderSubMenu";
import {Animated, BackHandler, ScrollView, TouchableOpacity, View} from "react-native";
import React, {useCallback, useEffect, useState} from "react";
import {useBackRedirect} from "@/hooks/useBackRedirect";
import CDashboardStats from "@/components/CDashboardStats";
import useReport from "@/queries/useReport";
import StatsRegionRecap from "@/app/reports/region/components/StatsRegionRecap";
import {Text} from "react-native-paper";
import colors from "@/constants/colors";
import CScrollView from "@/components/CScrollView";

const ReportByRegionScreen = () => {
	const {setParams: setParamsReport, data: reportData, isLoadingRegionRecap, } = useReport();
	useBackRedirect(() => {
		router.replace(APP_ROUTES.MAIN.REPORTS);
		return true;
	});

	const router = useRouter();
	const dataRecap = reportData?.reportRegionSummaryRecap;
	const dataNational = dataRecap['NATIONAL']
	const dataDiaspora = dataRecap['DIASPORA']
	const dataAll = dataRecap['ALL']

	const handleAction = {
		onBack: () => {
			router.push(APP_ROUTES.MAIN.REPORTS);
		},
		onClickDetail: (typeRecap) => {
			router.replace({
				pathname: "/reports/region/summary-electors-all",
				params: {
					typeRecap: typeRecap
				}
			})
		},
		onClickExport: (typeRecap) => {

		},
		onSwipeRefresh: () => {

		}
	}

	return (
		<CScrollView onRefresh={() => handleAction.onSwipeRefresh()}>
			<View className="flex-1 bg-gray-100">
				<CTopHeaderSubMenu title="Report by Region" handlePress={handleAction.onBack} />

				<View className="px-4 py-2">
					<View className="bg-white border border-gray-300 rounded-md pt-2 pb-4">
						<View className="px-2 mb-1">
							<Text style={{fontSize: 15, fontFamily: "IBMPlexSans_Bold", color: colors.secondary}}>Report Electors By Region</Text>
							<Text
								className="text-[11px] mt-0 mb-1"
								style={{ fontFamily: 'IBMPlexSans', color: colors.secondary }}
							>
								Overview of elector statistics by national, diaspora & all region.
							</Text>
						</View>
						<View className="px-2 mb-1">
							<StatsRegionRecap title="Summary Electors" data={dataAll} section="all" isLoading={isLoadingRegionRecap} handleAction={handleAction} />
						</View>
						<View className="px-2 mb-1">
							<StatsRegionRecap title="Summary Electors National" data={dataNational} section="national" isLoading={isLoadingRegionRecap} handleAction={handleAction} />
						</View>
						<View className="px-2">
							<StatsRegionRecap title="Summary Electors Diaspora" data={dataDiaspora} section="diaspora" isLoading={isLoadingRegionRecap} handleAction={handleAction} />
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
	)
}

export default ReportByRegionScreen