import {Avatar, Button, Divider, Modal, Portal, Text} from "react-native-paper";
import {useAuth} from "@/queries/useAuth";
import {ActivityIndicator, Dimensions, ScrollView, TouchableOpacity, View} from "react-native";
import { useRouter } from "expo-router";
import CTopHeader from "@/components/CTopHeader";
import CScrollView from "@/components/CScrollView";
import colors from "@/constants/colors";
import {formatNumber, generateAvatarUrl} from "@/helpers/general";
import {Ionicons, MaterialCommunityIcons} from "@expo/vector-icons";
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
		{ name: "Inactive Elector", icon: "account-cancel", screen: APP_ROUTES.DASHBOARD.INACTIVE_ELECTOR },
		{ name: "Users", icon: "account", screen: APP_ROUTES.DASHBOARD.USERS },
		{ name: "Regions", icon: "city-variant", screen: APP_ROUTES.DASHBOARD.REGIONS },
		{ name: "Countries", icon: "earth", screen: APP_ROUTES.DASHBOARD.COUNTRIES },
		{ name: "Digital Card", icon: "card-account-details", screen: APP_ROUTES.DASHBOARD.CARD },
	];

	const districts = [
		{
			name: "District A",
			updatedElectors: 450,
			totalElectors: 5000,
		},
		{
			name: "District B",
			updatedElectors: 380,
			totalElectors: 4000,
		},
		{
			name: "District C",
			updatedElectors: 420,
			totalElectors: 4600,
		},
		{
			name: "District D",
			updatedElectors: 300,
			totalElectors: 3500,
		},
		{
			name: "District E",
			updatedElectors: 500,
			totalElectors: 5300,
		},
		{
			name: "District F",
			updatedElectors: 210,
			totalElectors: 3000,
		},
		{
			name: "District G",
			updatedElectors: 150,
			totalElectors: 2700,
		},
		{
			name: "District H",
			updatedElectors: 380,
			totalElectors: 4500,
		},
		{
			name: "District I",
			updatedElectors: 220,
			totalElectors: 3200,
		},
		{
			name: "District J",
			updatedElectors: 490,
			totalElectors: 5200,
		},
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
						<CDashboardStats title="Elector Overview" data={data} section="total" showPercentMan={true} showPercentWoman={true} showPercentTotal={false} isLoading={isLoading} />
					</View>
					<View style={{ width: screenWidth }} className="px-4">
						<CDashboardStats title="Total Registered Electors" data={data} section="existing" showPercentMan={false} showPercentWoman={false} showPercentTotal={false} isLoading={isLoading} />
					</View>
					<View style={{ width: screenWidth }} className="px-4">
						<CDashboardStats title="Elector Actualization Summary" data={data} section="actualization" showPercentMan={false} showPercentWoman={false} showPercentTotal={true} isLoading={isLoading} />
					</View>
					<View style={{ width: screenWidth }} className="px-4">
						<CDashboardStats title="Outstanding Electors" data={data} section="outstanding" showPercentMan={false} showPercentWoman={false} showPercentTotal={true} isLoading={isLoading} />
					</View>
					<View style={{ width: screenWidth }} className="px-4">
						<CDashboardStats title="Newly Registered Electors" data={data} section="registration" showPercentMan={false} showPercentWoman={false} showPercentTotal={false} isLoading={isLoading} />
					</View>
				</ScrollView>

				<View className="px-4 mt-2">
					<View className="bg-white border border-gray-300 rounded-md pb-2">
						<View className="px-2 py-1">
							<Text style={{fontSize: 16, fontFamily: "IBMPlexSans_Bold", color: colors.secondary}}>Main Features</Text>
						</View>
						<View className="flex flex-row flex-wrap justify-between gap-1 px-2 py-1">
							{features.map((item, index) => (
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
										}}
									>
										<MaterialCommunityIcons name={item.icon} size={36} color="#fff" />
										<Text style={{fontSize: 9, fontFamily: "IBMPlexSans_Bold", textAlign: "center", color: "#FFF"}}>{item.name}</Text>
									</View>
								</TouchableOpacity>
							))}
						</View>
					</View>
				</View>

				<View className="px-4 mt-2">
					<View className="bg-white border border-gray-300 rounded-md">
						<View className="px-2 py-1">
							<Text style={{fontSize: 16, fontFamily: "IBMPlexSans_Bold", color: colors.secondary}}>Top 5 Districts</Text>
						</View>
						<View className="flex flex-row flex-wrap justify-start px-2 py-1">

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