import {Avatar, Button, Card, Divider, List, Modal, Portal, Text} from "react-native-paper";
import {useAuth} from "@/queries/useAuth";
import {ActivityIndicator, Dimensions, ScrollView, TouchableOpacity, View} from "react-native";
import { useRouter } from "expo-router";
import CTopHeader from "@/components/CTopHeader";
import CScrollView from "@/components/CScrollView";
import colors from "@/constants/colors";
import {Ionicons, MaterialCommunityIcons} from "@expo/vector-icons";
import {APP_ROUTES} from "@/constants/urls";
import useDashboardStats from "@/queries/useDashboardStats";
import {useEffect, useState} from "react";
import CAndroidDatePicker from "@/components/CAndroidDatepicker";
import {formatDate, getFirstDateOfMonth, parseFormattedDate} from "@/helpers/formatDate";
import CDashboardStats from "@/components/CDashboardStats";
import CLocationAddress from "@/components/CLocationAddress";
import CIconFilter from "@/components/CIconFilter";
import {formatNumber} from "@/helpers/general";

const DashboardScreen = () => {
	const screenWidth = Dimensions.get("window").width;
	const {user} = useAuth();
	const router = useRouter();
	const {codeDistrict, fetchOutstandingElectors, date02: paramDate02, date01: paramDate01, fetchInput, data, isLoading, setDate01, setDate02, resetDates} = useDashboardStats();

	const [startDate, setStartDate] = useState(getFirstDateOfMonth());
	const [endDate, setEndDate] = useState(new Date());
	const [showModalDateFilter, setShowModalDateFilter] = useState(false);
	const [retry, setRetry] = useState(false);

	type ValidRoute = (typeof APP_ROUTES.DASHBOARD)[keyof typeof APP_ROUTES.DASHBOARD];
	type Feature = {
		name: string;
		icon: string;
		screen: ValidRoute;
		isHide?: boolean;
	};

	const features: Feature[] = [
		{ name: "Electors", icon: "account-group", screen: APP_ROUTES.DASHBOARD.ELECTOR },
		{ name: "Verify Elector", icon: "account-check", screen: APP_ROUTES.DASHBOARD.VERIFY_ELECTOR },
		{ name: "Double Elector", icon: "account-switch", screen: APP_ROUTES.DASHBOARD.DOUBLE_ELECTOR },
		{ name: "Inactive Elector", icon: "account-cancel", screen: APP_ROUTES.DASHBOARD.INACTIVE_ELECTOR },
		{ name: "Regions", icon: "city-variant", screen: APP_ROUTES.DASHBOARD.REGIONS },
		{ name: "Digital Card", icon: "card-account-details", screen: APP_ROUTES.DASHBOARD.CARD },
		{ name: "Digital Card1", icon: "card-account-details", screen: APP_ROUTES.DASHBOARD.CARD, isHide: true },
		{ name: "Digital Card2", icon: "card-account-details", screen: APP_ROUTES.DASHBOARD.CARD, isHide: true },
	];

	const regionStats = [
		{ name: 'Surabaya', total: 3152000 },
		{ name: 'Jakarta Selatan', total: 2200000 },
		{ name: 'Bandung', total: 1800000 },
		{ name: 'Medan', total: 1450000 },
		{ name: 'Denpasar', total: 980000 },
		{ name: 'Bekasi', total: 2100000 },
		{ name: 'Makassar', total: 1600000 },
		{ name: 'Semarang', total: 1550000 },
		{ name: 'Depok', total: 1100000 },
		{ name: 'Tangerang', total: 1900000 },
		{ name: 'Palembang', total: 1250000 },
		{ name: 'Pekanbaru', total: 880000 },
		{ name: 'Batam', total: 770000 },
		{ name: 'Yogyakarta', total: 1050000 },
		{ name: 'Malang', total: 890000 },
	];

	const dataOustandingElector = data?.outstandingElector || [];
	const autheticatedCodeDistrict = user?.kode_distrik || "ALL";

	const handleAction = {
		onFirstScreenLoad: () => {
			fetchOutstandingElectors({ codeDistrict: autheticatedCodeDistrict });
			fetchInput({ codeDistrict: autheticatedCodeDistrict });
		},
		onSwipeRefresh: () => {
			setRetry(true);
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
				<View className="px-4 pb-0 pt-2">
					<View className="flex-row align-items-center flex-1 justify-between mb-4">
						<View>
							<Text className="text-lg" style={{color: colors.secondary, fontFamily: "IBMPlexSans_Bold"}}>
								Hello, {user?.nama}
							</Text>
							<View className="flex flex-row">
								<Ionicons name="location" size={15} color={colors.secondary} />
								<CLocationAddress isRetryGetLocation={retry} onRetryComplete={() => setRetry(false)}  />
							</View>
						</View>
					</View>
				</View>

				<View className="pl-4 pr-4 pb-1 pt-0">
					<View className="flex-row items-center justify-between">
						<Text style={{ color: colors.secondary, fontFamily: "IBMPlexSans_Bold", fontSize: 12 }}>
							Periode : {formatDate(startDate, "dd/MM/yyyy")} - {formatDate(endDate, "dd/MM/yyyy")}
						</Text>
						<CIconFilter onPress={setShowModalDateFilter} />
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
							<Text style={{fontSize: 15, fontFamily: "IBMPlexSans_Bold", color: colors.secondary}}>Main Features</Text>
						</View>
						<View className="flex-row flex-wrap justify-between px-2 py-1" style={{ gap: 5 }}>
							{features.map((item, index) => (
								<TouchableOpacity activeOpacity={1} key={item.name} className="flex items-center border-blue-950" onPress={() => router.push(item.screen)}>
									<View
										style={{
											width: 75,
											height: 75,
											backgroundColor: item?.isHide ? "#FFF" : colors.secondary,
											borderRadius: 8,
											justifyContent: "center",
											alignItems: "center",
											shadowColor: item?.isHide ? "#FFF" : "#000",
											shadowOpacity: 0.2,
											shadowRadius: 5,
											elevation: 5,
										}}
										className={`${item?.isHide} ? '' : 'border border-blue-950'`}
									>
										<MaterialCommunityIcons name={item.icon} size={36} color="#fff" />
										<Text style={{fontSize: 9, fontFamily: "IBMPlexSans_Bold", textAlign: "center", color: "#FFF"}}>{item.name}</Text>
									</View>
								</TouchableOpacity>
							))}
						</View>
					</View>
				</View>

				<View className="px-4 mt-2 mb-10">
					<View className="bg-white border border-gray-300 rounded-md">
						<View className="px-2 py-1">
							<Text style={{fontSize: 15, fontFamily: "IBMPlexSans_Bold", color: colors.secondary}}>Unprocessed Electors</Text>
							<Text style={{ fontSize: 12, fontFamily: "IBMPlexSans", color: colors.secondary }}>
								List of districts with pending elector data
							</Text>
						</View>

						<View className="px-2 mt-1 pb-3">
							<View
								style={{
									maxHeight: 26 * 10,
								}}
							>
							{dataOustandingElector.length === 0 ? (
								<View
									className="py-6"
									style={{ justifyContent: "center", alignItems: "center" }}
								>
									<Text style={{ color: colors.secondary, fontStyle: "italic" }}>
										No data available
									</Text>
								</View>
							) : (
								<ScrollView horizontal={false}
								            contentContainerStyle={{
									            flexGrow: 1,
									            height: 230,
								            }}
								            nestedScrollEnabled>
									{dataOustandingElector.map((item, index) => (
										<TouchableOpacity
											key={index}
											onPress={() => console.log('unprocessed-elector')}
											className="py-1 rounded-md px-1 flex-row justify-between items-center mb-1.5 border border-blue-950"
											style={{
												backgroundColor: colors.secondary,
												elevation: 2,
												shadowColor: '#000',
												shadowOpacity: 0.08,
												shadowOffset: { width: 0, height: 1 },
												shadowRadius: 3,
											}}
										>
											<Ionicons
												name="person-add-outline"
												size={18}
												color="#fff"
												style={{ marginRight: 8 }}
											/>

											<View className="flex-1">
												<Text
													style={{
														fontFamily: 'IBMPlexSans_Bold',
														color: '#FFF',
														fontSize: 12,
													}}
												>
													{item?.NAMA}
												</Text>
												<Text
													style={{
														fontFamily: 'IBMPlexSans',
														color: '#FFF',
														fontSize: 10,
													}}
												>
													{formatNumber(item?.NSISA)}
												</Text>
											</View>
											<Ionicons name="chevron-forward" size={18} color="#FFF" />
										</TouchableOpacity>
									))}
								</ScrollView>


							)}
							</View>
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