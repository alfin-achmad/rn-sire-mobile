import {Avatar, Button, Divider, Modal, Portal, Text} from "react-native-paper";
import {useAuth} from "@/queries/useAuth";
import {ActivityIndicator, Dimensions, ScrollView, TouchableOpacity, View} from "react-native";
import { useRouter } from "expo-router";
import CTopHeader from "@/components/CTopHeader";
import CScrollView from "@/components/CScrollView";
import colors from "@/constants/colors";
import {formatNumber, generateAvatarUrl} from "@/helpers/general";
import {Ionicons} from "@expo/vector-icons";
import {APP_ROUTES} from "@/constants/urls";
import useDashboardStats from "@/queries/useDashboardStats";
import {useEffect, useState} from "react";
import CAndroidDatePicker from "@/components/CAndroidDatepicker";
import {formatDate, getFirstDateOfMonth, parseFormattedDate} from "@/helpers/formatDate";
import CDashboardStats from "@/components/CDashboardStats";

const DashboardScreen = () => {
	const screenWidth = Dimensions.get("window").width;
	const {signOut, user} = useAuth();
	const router = useRouter();
	const {codeDistrict, date02: paramDate02, date01: paramDate01, fetchInput, data, isLoading, setDate01, setDate02, resetDates} = useDashboardStats();
	const avatarURL = generateAvatarUrl(user?.nama);

	const [startDate, setStartDate] = useState(getFirstDateOfMonth());
	const [endDate, setEndDate] = useState(new Date());
	const [showModalDateFilter, setShowModalDateFilter] = useState(false);

	type ValidRoute = (typeof APP_ROUTES.DASHBOARD)[keyof typeof APP_ROUTES.DASHBOARD];
	type Feature = {
		name: string;
		icon: string;
		screen: ValidRoute;
	};

	const features: Feature[] = [
		{ name: "Electors", icon: "account-group", screen: APP_ROUTES.DASHBOARD.ELECTOR },
		{ name: "Verify Elector", icon: "account-check", screen: APP_ROUTES.DASHBOARD.VERIFY_ELECTOR },
		{ name: "Double Elector", icon: "account-switch", screen: APP_ROUTES.DASHBOARD.DOUBLE_ELECTOR },
		{ name: "Users", icon: "account", screen: APP_ROUTES.DASHBOARD.USERS },
		{ name: "Regions", icon: "city-variant", screen: APP_ROUTES.DASHBOARD.REGIONS },
		{ name: "Reports", icon: "newspaper-variant-multiple", screen: APP_ROUTES.DASHBOARD.REPORTS },
	];

	const handleAction = {
		onFirstScreenLoad: () => {
			fetchInput({ codeDistrict: user?.kode_distrik });
		},
		onSwipeRefresh: () => {
			handleAction.onFirstScreenLoad()
		},
		onDateFilterClose: () => {
			setDate01(formatDate(startDate))
			setDate02(formatDate(endDate))

			setShowModalDateFilter(false);
		}
	}

	useEffect(() => {
		if (paramDate01 !== formatDate(startDate)){
			setStartDate(parseFormattedDate(paramDate01));
		}

		if (paramDate02 !== formatDate(endDate)){
			setEndDate(parseFormattedDate(paramDate02));
		}
	}, []);

	useEffect(() => {
		handleAction.onFirstScreenLoad();
	}, [paramDate01, paramDate02, codeDistrict]);

	return (
		<>
			<CTopHeader />
			<CScrollView onRefresh={() => handleAction.onSwipeRefresh()}>
				<View className="pl-4 pr-4 pb-2 pt-2">
					<View className="flex-row align-items-center flex-1 justify-between mb-4">
						<View>
							<Text className="text-lg" style={{color: colors.secondary, fontFamily: "IBMPlexSans_Bold"}}>
								Hallo, {user?.nama}
							</Text>
							<Text className="text-sm" style={{color: colors.secondary, fontFamily: "IBMPlexSans"}}>
								{user?.kode_user}, {(user?.role)?.toUpperCase()} - {user?.nama_distrik}
							</Text>
						</View>

						<Avatar.Image size={40} source={{uri: avatarURL}} />
					</View>

					<View className="flex-row items-center justify-between">
						<Text style={{ color: colors.secondary, fontFamily: "IBMPlexSans_Bold", fontSize: 12 }}>
							Periode : {formatDate(startDate, "dd/MM/yyyy")} - {formatDate(endDate, "dd/MM/yyyy")}
						</Text>
						<TouchableOpacity onPress={setShowModalDateFilter}>
							<Ionicons name="options" size={16} color={colors.secondary} />
						</TouchableOpacity>
					</View>
				</View>

				<ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex flex-row" pagingEnabled>
					<View style={{ width: screenWidth }} className="px-4">
						<CDashboardStats title="Elector Overview" data={data} section="total" showPercentMan={true} showPercentWoman={true} showPercentTotal={false} />
					</View>
					<View style={{ width: screenWidth }} className="px-4">
						<CDashboardStats title="Total Registered Electors" data={data} section="existing" showPercentMan={false} showPercentWoman={false} showPercentTotal={false} />
					</View>
					<View style={{ width: screenWidth }} className="px-4">
						<CDashboardStats title="Elector Actualization Summary" data={data} section="actualization" showPercentMan={false} showPercentWoman={false} showPercentTotal={true} />
					</View>
					<View style={{ width: screenWidth }} className="px-4">
						<CDashboardStats title="Outstanding Electors" data={data} section="outstanding" showPercentMan={false} showPercentWoman={false} showPercentTotal={true} />
					</View>
					<View style={{ width: screenWidth }} className="px-4">
						<CDashboardStats title="Newly Registered Electors" data={data} section="registration" showPercentMan={false} showPercentWoman={false} showPercentTotal={false} />
					</View>
				</ScrollView>

				<View className="px-4 mt-2 mb-5">
					<View className="bg-white border border-gray-300 rounded-md">
						<View className="px-2 py-1">
							<Text style={{fontSize: 16, fontFamily: "IBMPlexSans_Bold", color: colors.secondary}}>Main Features</Text>
						</View>
						<View className="flex flex-row flex-wrap justify-start px-2 py-1">
							{features.map((item, index) => (
								<View key={index} className="w-1/4 items-center py-1">
									<TouchableOpacity className="flex items-center" onPress={() => router.replace(item.screen)}>
										<Avatar.Icon size={50} icon={item.icon}  color="white" className="border border-blue-950" />
										<Text className="text-center">{item.name}</Text>
									</TouchableOpacity>
								</View>
							))}
						</View>
					</View>
				</View>
			</CScrollView>

			<Portal>
				<Modal dismissable={true} onDismiss={() => setShowModalDateFilter(false)} visible={showModalDateFilter} contentContainerStyle={{backgroundColor: "#FFF", paddingHorizontal: 16, paddingVertical: 10, borderRadius: 5, marginHorizontal: 14}}>

					<Text style={{fontFamily: "IBMPlexSans_Bold", color: colors.secondary}} className="mb-4">Select Period</Text>
					<CAndroidDatePicker
						startDate={startDate}
						endDate={endDate}
						onChangeStart={setStartDate}
						onChangeEnd={setEndDate}
					/>

					<TouchableOpacity
						onPress={() => handleAction.onDateFilterClose()}
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

export default DashboardScreen