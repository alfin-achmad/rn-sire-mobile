import {ActivityIndicator, Alert, SafeAreaView, ScrollView, Text, TouchableOpacity, View} from "react-native";
import React, {useEffect, useRef, useState} from "react";
import * as ScreenOrientation from 'expo-screen-orientation';
import {router, useLocalSearchParams} from "expo-router";
import colors from "@/constants/colors";
import useReport from "@/queries/useReport";
import {useAuth} from "@/queries/useAuth";
import ChartDistrictBar from "@/app/(tabs)/reports/components/ChartDistrictBar";
import {Modal, Portal} from "react-native-paper";
import CAndroidDatePicker from "@/components/CAndroidDatepicker";
import {formatDate, parseFormattedDate} from "@/helpers/formatDate";
import ViewShot from 'react-native-view-shot';
import * as MediaLibrary from "expo-media-library";
import ChartDistrictLine from "@/app/(tabs)/reports/components/ChartDistrictLine";

export default function FullChartDistrictByDateScreen() {
	const viewShotRef = useRef(null);

	const {user} = useAuth();
	const {fetchChartByDate, paramChartbyDate, isLoadingChartByDate, setParams: setParamsChart, data: dataChart} = useReport()
	const {screenOrigin} = useLocalSearchParams();
	const [showModalDate, setShowModalDate] = useState(false);

	const generateDataChartbyDate = dataChart?.reportChartByDate || []
	const dataChartByDate = generateDataChartbyDate

	useEffect(() => {
		lockToLandscape("landscape");
	}, []);

	const actionOnExportChartByDistrict = async () => {
		try {
			const permission = await MediaLibrary.requestPermissionsAsync();
			if (!permission.granted) {
				Alert.alert('Permission denied', 'Cannot save image without permission');
				return;
			}

			const uri = await viewShotRef.current.capture({
				result: 'tmpfile',
				format: 'png',
				quality: 1,
			});
			const asset = await MediaLibrary.createAssetAsync(uri);
			await MediaLibrary.createAlbumAsync('Charts', asset, false);

			Alert.alert('Success', 'Chart saved to your Photos/Gallery');
		} catch (err) {
			console.error(err);
			Alert.alert('Error', 'Failed to save chart');
		}
	}

	const lockToLandscape = (typeOrientation: "portrait"|"landscape") => {
		const switchOrientation = {
			"portrait": ScreenOrientation.OrientationLock.PORTRAIT,
			"landscape": ScreenOrientation.OrientationLock.LANDSCAPE,
		}
		ScreenOrientation.lockAsync(switchOrientation[typeOrientation]);
	};

	const handleAction = {
		onClickToPortrait: () => {
			lockToLandscape("portrait");
		},
		onBackToOriginScreen: () => {
			lockToLandscape("portrait");
			router.push(screenOrigin);
		},
		onClickOptionChart: () => {
			setShowModalDate(true);
		},
		onApplyModalDateChartByDate: () => {
			fetchChartByDate(user?.kode_distrik || "ALL");
			setShowModalDate(false);
		},
		onClickExportDataChart: async () => {
			await actionOnExportChartByDistrict();
		},
	}

	return (
		<>
			<SafeAreaView className="flex-1">
				<ScrollView>
					<View className="flex justify-center items-center w-full h-full py-10">
						{isLoadingChartByDate ? (
							<ActivityIndicator color={colors.secondary} />
						):(
							<ViewShot ref={viewShotRef} options={{ format: 'jpg', quality: 0.9 }}>
								<ChartDistrictLine handleAction={handleAction} lineData={dataChartByDate} period={formatDate(parseFormattedDate(paramChartbyDate?.date), "MMM yyyy")} isFromFullchart={true} />
							</ViewShot>
						)}
					</View>
				</ScrollView>
			</SafeAreaView>

			<Portal>
				<Modal dismissable={true} onDismiss={() => setShowModalDate(false)} visible={showModalDate} contentContainerStyle={{backgroundColor: "#FFF", paddingHorizontal: 16, paddingVertical: 10, borderRadius: 5, marginHorizontal: 14}}>
					<Text style={{fontFamily: "IBMPlexSans_Bold", color: colors.secondary}} className="mb-4">Select Period</Text>

					<CAndroidDatePicker
						startDate={parseFormattedDate(paramChartbyDate?.date)}
						onChangeStart={(e) => setParamsChart('paramChartbyDate', {date: formatDate(e)})}
					/>

					<TouchableOpacity
						onPress={() => handleAction.onApplyModalDateChartByDate()}
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
