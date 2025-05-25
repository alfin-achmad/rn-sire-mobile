import {router} from "expo-router";
import {APP_ROUTES} from "@/constants/urls";
import CTopHeader from "@/components/CTopHeader";
import {useEffect, useRef, useState} from "react";
import {Alert, BackHandler, ScrollView, TouchableOpacity, View, Dimensions} from "react-native";
import {Portal, Text, Modal} from "react-native-paper";
import colors from "@/constants/colors";
import {Ionicons, MaterialCommunityIcons} from "@expo/vector-icons";
import ViewShot from 'react-native-view-shot';
import * as MediaLibrary from 'expo-media-library';
import * as ScreenOrientation from 'expo-screen-orientation';
import {useBackRedirect} from "@/hooks/useBackRedirect";
import CScrollView from "@/components/CScrollView";
import CAndroidDatePicker from "@/components/CAndroidDatepicker";
import ChartDistrictBar from "@/app/(tabs)/reports/components/ChartDistrictBar";
import useReport from "@/queries/useReport";
import {useAuth} from "@/queries/useAuth";
import {formatDate, parseFormattedDate} from "@/helpers/formatDate";
import ChartDistrictLine from "@/app/(tabs)/reports/components/ChartDistrictLine";
import ChartDistrictBarByMonth from "@/app/(tabs)/reports/components/ChartDistrictBarByMonth";

const ReportsScreen = () => {
	useBackRedirect();

	type ValidRoute = (typeof APP_ROUTES.REPORTS)[keyof typeof APP_ROUTES.REPORTS];
	type DefaultItem = {
		name: string;
		icon: string;
		screen: ValidRoute;
	};

	const viewShotRef = useRef(null);
	const {signOut, user} = useAuth();
	const {
		setParams: setParamsChart,
		codeDistrict,
		fetchChartByDistrict,
		fetchChartByDate,
		fetchChartByMonth,
		refetch,
		data,
		isLoadingChartByDistrict,
		isLoadingChartByMonth,
		isLoadingChartByDate,
		isLoading,
		paramChartbyDate,
		paramChartbyDistrict,
		paramChartbyMonth,
		resetAllParams,
		resetParamChartbyDistrict,
		resetParamChartbyDate,
		resetParamChartbyMonth
	} = useReport();
	const [showModalDateChartbyDistrict, setShowModalDateChartbyDistrict] = useState(false);
	const [showModalDateChartbyDate, setShowModalDateChartbyDate] = useState(false);
	const [showModalDateChartbyMonth, setShowModalDateChartbyMonth] = useState(false);
	const [fullscreenChartType, setFullscreenChartType] = useState<string | null>(null);
	const { width, height } = Dimensions.get('window');

	const typeReports: DefaultItem[] = [
		{
			name: "Report by Region",
			icon: "map-marker-radius",
			screen: APP_ROUTES.REPORTS.REGION,
		},
		{
			name: "Report by Elector Type",
			icon: "account-multiple-check",
			screen: APP_ROUTES.REPORTS.ELECTOR_TYPE,
		},
		{
			name: "Report by Gender",
			icon: "gender-male-female",
			screen: APP_ROUTES.REPORTS.GENDER,
		},
		{
			name: "Report by Age Group",
			icon: "calendar-account",
			screen: APP_ROUTES.REPORTS.AGE_GROUP,
		},
	];

	const generateDataChartbyDistrict = data?.reportChartByDistrict || []
	const generateDataChartDate = data?.reportChartByDate || []
	const generateDataChartbyMonth = data?.reportChartByMonth || []
	const dataChartByDistrict = generateDataChartbyDistrict?.map(item => ({
		...item,
		topLabelComponent: () => (
			<Text
				style={{
					color: item.frontColor,
					fontSize: 10,
					marginBottom: 0,
					textAlign: 'center',
				}}
			>
				{item.value}
			</Text>
		),
	}));
	const dataChartByDate = generateDataChartDate;
	const dataChartByMonth = generateDataChartbyMonth?.map(item => ({
		...item,
		topLabelComponent: () => (
			<Text
				style={{
					color: item.frontColor,
					fontSize: 10,
					marginBottom: 0,
					textAlign: 'center',
				}}
			>
				{item.value}
			</Text>
		),
	}));

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

	const handleAction = {
		onBack: () => {
			router.replace(APP_ROUTES.MAIN.DASHBOARD);
		},
		onFirstScreenLoad: () => {
			refetch(user?.kode_distrik || "ALL");
		},
		onSwipeRefresh: () => {
			handleAction.onFirstScreenLoad()
		},
		onClickOptionChart: (typeChart: any) => {
			if (typeChart === 'byDistrict'){
				setShowModalDateChartbyDistrict(true);
			} else if(typeChart === 'byDate'){
				setShowModalDateChartbyDate(true)
			} else if(typeChart === 'byMonth'){
				setShowModalDateChartbyMonth(true)
			}
		},
		onClickFullscreenChart: (typeChart, paramsFromChart={}) => {
			const listScreen = {
				"byDistrict": APP_ROUTES.MAIN.FULLCHARTDISTRICT
			}
			router.push({pathname: listScreen[typeChart], params: {screenOrigin: APP_ROUTES.MAIN.REPORTS, ...paramsFromChart}})
		},
		onClickExportDataChart: (typeChart) => {
			if (typeChart === 'byDistrict'){
				actionOnExportChartByDistrict();
			}
		},
		onApplyModalDateChartByDistrict: () => {
			fetchChartByDistrict(user?.kode_distrik || "ALL");
			setShowModalDateChartbyDistrict(false);
		},
		onApplyModalDateChartByDate: () => {
			fetchChartByDate(user?.kode_distrik || "ALL");
			setShowModalDateChartbyDate(false);
		},
		onApplyModalDateChartByMonth: () => {
			fetchChartByMonth(user?.kode_distrik || "ALL");
			setShowModalDateChartbyMonth(false);
		},
	}

	return (
		<>
			<CTopHeader />
			<CScrollView onRefresh={() => handleAction.onSwipeRefresh()}>
				<View className="pb-4">
					<View className="px-4 mt-2">
						<View className="bg-white border border-gray-300 rounded-md pb-2 pt-2">
							<View className="flex flex-row flex-wrap justify-between gap-1.5 px-2 py-1">
								{typeReports.map((item, index) => (
									<TouchableOpacity activeOpacity={1} key={item.name} className="flex items-center border-blue-950" onPress={() => router.push(item.screen)}>
										<View
											style={{
												width: 75,
												height: 75,
												backgroundColor: colors.secondary,
												borderRadius: 8,
												justifyContent: "center",
												alignItems: "center",
												shadowColor: "#000",
												shadowOpacity: 0.2,
												shadowRadius: 5,
												elevation: 5,
												padding: 10
											}}
										>
											<MaterialCommunityIcons name={item.icon} size={36} color="#fff" />
											<Text style={{fontSize: 9, fontFamily: "IBMPlexSans_Bold", textAlign: "center", color: "#FFF"}}>{item.name}</Text>
										</View>
									</TouchableOpacity>
								))}
							</View>
						</View>

						<ChartDistrictBar handleAction={handleAction} barData={dataChartByDistrict} period={paramChartbyDistrict?.date01} isLoading={isLoadingChartByDistrict} />
						<ChartDistrictLine handleAction={handleAction} lineData={dataChartByDate} period={formatDate(parseFormattedDate(paramChartbyDate?.date), "MMM yyyy")} isLoading={isLoadingChartByDate} />
						<ChartDistrictBarByMonth handleAction={handleAction} barData={dataChartByMonth} period={formatDate(parseFormattedDate(paramChartbyMonth?.date), "yyyy")} isLoading={isLoadingChartByMonth} />
					</View>
				</View>
			</CScrollView>

			<Portal>
				<Modal dismissable={true} onDismiss={() => setShowModalDateChartbyDistrict(false)} visible={showModalDateChartbyDistrict} contentContainerStyle={{backgroundColor: "#FFF", paddingHorizontal: 16, paddingVertical: 10, borderRadius: 5, marginHorizontal: 14}}>
					<Text style={{fontFamily: "IBMPlexSans_Bold", color: colors.secondary}} className="mb-4">Select Period</Text>

					<CAndroidDatePicker
						startDate={parseFormattedDate(paramChartbyDistrict?.date01)}
						onChangeStart={(e) => setParamsChart('paramChartbyDistrict', {date01: formatDate(e)})}
					/>

					<TouchableOpacity
						onPress={() => handleAction.onApplyModalDateChartByDistrict()}
						className="mt-4 p-2 rounded-md items-center"
						style={{backgroundColor: colors.secondary}}
					>
						<Text className="text-lg" style={{color: "#FFF"}}>Apply</Text>
					</TouchableOpacity>
				</Modal>

				<Modal dismissable={true} onDismiss={() => setShowModalDateChartbyDate(false)} visible={showModalDateChartbyDate} contentContainerStyle={{backgroundColor: "#FFF", paddingHorizontal: 16, paddingVertical: 10, borderRadius: 5, marginHorizontal: 14}}>
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

				<Modal dismissable={true} onDismiss={() => setShowModalDateChartbyMonth(false)} visible={showModalDateChartbyMonth} contentContainerStyle={{backgroundColor: "#FFF", paddingHorizontal: 16, paddingVertical: 10, borderRadius: 5, marginHorizontal: 14}}>
					<Text style={{fontFamily: "IBMPlexSans_Bold", color: colors.secondary}} className="mb-4">Select Period</Text>

					<CAndroidDatePicker
						startDate={parseFormattedDate(paramChartbyMonth?.date)}
						onChangeStart={(e) => setParamsChart('paramChartbyMonth', {date: formatDate(e)})}
						labelStart="Select Year"
					/>

					<TouchableOpacity
						onPress={() => handleAction.onApplyModalDateChartByMonth()}
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

export default ReportsScreen