import {router, useLocalSearchParams} from "expo-router";
import {ScrollView, Text, TouchableOpacity, View} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "@/constants/colors";
import {TextInput} from "react-native-paper";
import CRegionPicker from "@/components/CRegionPicker";
import CListPicker from "@/components/CListPicker";
import {RECORDS_ORDER_BY_LIST, RECORDS_PER_PAGE_LIST} from "@/constants/general";
import useElector from "@/queries/useElector";
import {APP_ROUTES} from "@/constants/urls";

const FilterModal = () => {
	const {fromMainScreen} = useLocalSearchParams();
	const {storeName, searchText} = JSON.parse(fromMainScreen);
	const {params, updateParam} = useElector();

	const handleAction = {
		onApplyFilter: () => {
			const bindToMainScreen = {
				action: "apply",
				history: {
					searchText: searchText,
				}
			}

			router.replace({
				pathname: APP_ROUTES.DASHBOARD.ELECTOR,
				params: {
					fromFilterModalScreen: JSON.stringify(bindToMainScreen)
				}
			})
		},
		onResetFilter: () => {
			const bindToMainScreen = {
				action: "reset"
			}

			router.replace({
				pathname: APP_ROUTES.DASHBOARD.ELECTOR,
				params: {
					fromFilterModalScreen: JSON.stringify(bindToMainScreen)
				}
			})
		},
		onCloseModal: () => {
			const bindToMainScreen = {
				action: "closeModal"
			}

			router.replace({
				pathname: APP_ROUTES.DASHBOARD.ELECTOR,
				params: { historySearchText: searchText, historyFromDetail: JSON.stringify(params?.findElector) }
			})
		}
	}

	return (
		<View className="flex-1 bg-gray-100 rounded-t-2xl overflow-hidden">
			<View className="flex-row items-center justify-between h-[54px] bg-white border border-gray-300 px-4">
				<Text className="flex-1 text-lg" style={{fontFamily: "IBMPlexSans_Bold", color: colors.secondary}}>Filter Options</Text>
				<TouchableOpacity onPress={() => handleAction.onCloseModal()} className="p-2">
					<Ionicons name="close" size={24} color={colors.secondary} />
				</TouchableOpacity>
			</View>

			<View className="flex-1">
				<ScrollView className="p-4 bg">
					<View className="bg-white border border-gray-300 p-2 rounded-md mb-1">
						<Text className="mb-1" style={{fontFamily: "IBMPlexSans_Bold", fontSize: 12, color: colors.secondary}}>
							Father's Name
						</Text>
						<TextInput contentStyle={{ paddingLeft: 0 }} className="bg-white uppercase" mode="outlined" style={{height: 30, fontSize: 12, padding: 0}} onChangeText={(e) => updateParam("findElector", "prnmayah", (e).toUpperCase())} inputMode="text" value={params.findElector?.prnmayah} />
					</View>

					<View className="bg-white border border-gray-300 p-2 rounded-md mb-1">
						<Text className="mb-1" style={{fontFamily: "IBMPlexSans_Bold", fontSize: 12, color: colors.secondary}}>
							Mother's Name
						</Text>
						<TextInput contentStyle={{ paddingLeft: 0 }} className="bg-white uppercase" mode="outlined" style={{height: 30, fontSize: 12, padding: 0}} onChangeText={(e) => updateParam("findElector", "prnmibu", (e).toUpperCase())} inputMode="text" placeholder={params.findElector?.prnmibu} />
					</View>

					<View className="bg-white border border-gray-300 p-2 rounded-md mb-1">
						<Text className="mb-3" style={{fontFamily: "IBMPlexSans_Bold", fontSize: 12, color: colors.secondary}}>
							Regions
						</Text>
						<CRegionPicker keyName={storeName} />
					</View>

					<View className="bg-white border border-gray-300 p-2 rounded-md mb-1">
						<Text className="mb-3" style={{fontFamily: "IBMPlexSans_Bold", fontSize: 12, color: colors.secondary}}>
							Shown Records
						</Text>
						<View className="flex flex-row gap-2">
							<CListPicker isOutlinedMode={true} labelOutline="Show per page" unique="filterShowPerPage" selectedValue={params.findElector?.p_rows_per_page} items={RECORDS_PER_PAGE_LIST} onSelect={(e) => updateParam("findElector", "p_rows_per_page", e)} />
							<CListPicker isOutlinedMode={true} labelOutline="Order by" unique="filterSortOrderBy" selectedValue={params.findElector?.prorder} items={RECORDS_ORDER_BY_LIST} onSelect={(e) => updateParam("findElector", "prorder", e)} />
						</View>
					</View>

					<TouchableOpacity
						onPress={() => handleAction.onApplyFilter()}
						className="mb-2 mt-3 p-2 rounded-md items-center bg-blue-950 border"
						style={{backgroundColor: colors.secondary}}
					>
						<Text className="text-lg" style={{color: "#FFF"}}>Apply</Text>
					</TouchableOpacity>

					<TouchableOpacity
						onPress={() => handleAction.onResetFilter()}
						className="p-2 rounded-md items-center border border-gray-200 bg-white"
					>
						<Text className="text-lg" style={{color: colors.secondary}}>Reset</Text>
					</TouchableOpacity>
				</ScrollView>
			</View>
		</View>
	);
};

export default FilterModal;
