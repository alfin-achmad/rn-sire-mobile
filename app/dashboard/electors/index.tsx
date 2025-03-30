import CTopHeaderSubMenu from "@/components/CTopHeaderSubMenu";
import {useLocalSearchParams, useRouter} from "expo-router";
import { APP_ROUTES } from "@/constants/urls";
import {
    ActivityIndicator,
    TextInput as BaseTextInput,
    Keyboard,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
    SafeAreaView,
    Modal
} from "react-native";
import {Portal, TextInput} from "react-native-paper";
import {useEffect, useRef, useState} from "react";
import { Ionicons } from "@expo/vector-icons";
import colors from "@/constants/colors";
import CItemsElector from "@/components/CItemsElector";
import useElector from "@/queries/useElector";
import {useAuth} from "@/queries/useAuth";
import {detectInputType, formatNumber, reformatCodeElector} from "@/helpers/general";
import CShowResult from "@/components/CShowResult";
import CFilterByStatusLists from "@/components/CFilterByStatusLists";
import {
    LIST_ELECTOR_REGISTER_TYPE,
    LIST_ELECTOR_STATUS,
    RECORDS_ORDER_BY_LIST,
    RECORDS_PER_PAGE_LIST
} from "@/constants/general";
import CListPicker from "@/components/CListPicker";
import CRegionPicker from "@/components/CRegionPicker";
import useRegion from "@/queries/useRegion";
import {SafeAreaProvider} from "react-native-safe-area-context";

const ElectorScreen = () => {
	const storeName = "electorScreen"
	const scrollViewRef = useRef(null);
	const {user} = useAuth();
	const {params, updateParam, updateParams, fetchFindElector, isLoading, data, resetParams} = useElector();
	const {selectedRegions, resetRegions} = useRegion(storeName);
	const router = useRouter();
	const [isSearch, setIsSearch] = useState(false);
	const [searchText, setSearchText] = useState("");
	const [isShowModalFilter, setIsShowModalFilter] = useState(false);
	const [lastScrollPosition, setLastScrollPosition] = useState(0);

	const handleAction = {
		onBack: () => {
			resetRegions(storeName);
			resetParams();
			router.replace(APP_ROUTES.DASHBOARD);
		},
		onFilterElectorStatus: (value) => {
			updateParam("findElector", "prstatus", value === "ALL" ?"":value);

			fetchFindElector(true);
			Keyboard.dismiss();
		},
		onShowModalFilter: () => {
            setIsShowModalFilter(true);
            Keyboard.dismiss();
		},
		onSearch: () => {
			const isNumeric = detectInputType(searchText) === "Numeric";
			const formattedText = isNumeric ? reformatCodeElector(searchText) : searchText.toUpperCase();

			setSearchText(formattedText);

			updateParam("findElector", "prkdelektor", isNumeric ? formattedText : "");
			updateParam("findElector", "prnama", isNumeric ? "" : formattedText);
			updateParam("findElector", "prstatus", (params.findElector?.prstatus !== ""? params.findElector?.prstatus:""));

			fetchFindElector(true);
			setIsSearch(true);
			Keyboard.dismiss();
		},
		onLoadMore: async () => {
			updateParam("findElector", "p_page_number", params.findElector.p_page_number + 1);
			fetchFindElector(false);
		},
		onResetFilter: () => {
			resetRegions(storeName);
			resetParams();
			setSearchText("");
			setIsSearch(false);
		},
		onChangeSizeScrollView: (width, height) => {
			const getTotalResults = data?.findElector?.rows?.length || 0
			const scrollTo = getTotalResults === params.findElector?.p_rows_per_page ? 0 : height

			if (scrollViewRef.current && lastScrollPosition === 0) {
				scrollViewRef.current.scrollTo({ y: scrollTo, animated: true });
			}
		},
		onApplyFilter: () => {
			if (searchText === ""){
				updateParam("findElector", "prkdelektor", "");
				updateParam("findElector", "prnama", "");
			} else {
				const isNumeric = detectInputType(searchText) === "Numeric";

                if (isNumeric) {
                    updateParam("findElector", "prkdelektor", reformatCodeElector(searchText));
                    updateParam("findElector", "prnama", "");
                } else {
                    updateParam("findElector", "prkdelektor", "");
                    updateParam("findElector", "prnama", searchText.toUpperCase());
                }
			}

			updateParam("findElector", "prdistrik", selectedRegions.district);
			updateParam("findElector", "prsubdistrik", selectedRegions.subdistrict);
			updateParam("findElector", "prsuku", selectedRegions.succo);
			updateParam("findElector", "praldeia", selectedRegions.aldeia);

            setIsShowModalFilter(false);
			fetchFindElector(true);
			setIsSearch(true);
		},
		onCloseModal: () => {
            setIsShowModalFilter(false)
		},
	};

	return (
		<>
			<View className="flex-1 bg-gray-100">
				<CTopHeaderSubMenu title="Elector" handlePress={handleAction.onBack} />
				<View className="px-4 py-2 flex-row items-center space-x-2">
					<View className="flex-1 mr-1">
						<TextInput
							key="searchText"
							mode="outlined"
							disabled={isLoading}
							value={searchText}
							onChangeText={setSearchText}
							placeholder="Enter name or elector number"
							style={{ height: 40, fontSize: 14, backgroundColor: "#FFF" }}
							outlineStyle={{ borderRadius: 5, borderWidth: 1, borderColor: "#D1D5DB" }}
							left={<TextInput.Icon icon={() => <Ionicons name="search" size={20} color="gray" />} />}
							returnKeyType="search"
							onSubmitEditing={() => handleAction.onSearch()}
							className="uppercase"
						/>
					</View>
					<TouchableOpacity
						disabled={isLoading}
						onPress={() => handleAction.onShowModalFilter()}
						className="border bg-white border-gray-300 rounded-md justify-center items-center"
						style={{
							width: 40,
							height: 40,
							opacity: isLoading ? 0.5 : 1,
							pointerEvents: isLoading ? "none" : "auto",
						}}
					>
						<Ionicons disabled={isLoading} name="options" size={24} color={colors.secondary} />
					</TouchableOpacity>
				</View>

				{isSearch && (
					<>
						<CFilterByStatusLists isDisabled={isLoading} statusLists={LIST_ELECTOR_STATUS} selectedVerificationType={params.findElector?.prstatus === ""?"ALL":params.findElector?.prstatus} setSelectedVerificationType={handleAction.onFilterElectorStatus} />
						{!isLoading && data?.findElector?.rows?.length > 0 && (
							<>
								<CShowResult showPerPage={data?.findElector?.rows?.length} showTotalRecords={formatNumber(data.findElector?.totalRecords) || 0} />
							</>
						)}

						<ScrollView ref={scrollViewRef} contentContainerClassName="px-4 pb-5 mt-1" showsVerticalScrollIndicator={false} onMomentumScrollEnd={(e) => setLastScrollPosition(e.nativeEvent.contentOffset.y)} onContentSizeChange={handleAction.onChangeSizeScrollView}>
							{isLoading ? (
								<View className="flex-1 items-center justify-center mt-5">
									<ActivityIndicator size="large" color={colors.secondary} />
									<Text className="text-gray-600 mt-2">Loading...</Text>
								</View>
							) : data?.findElector?.rows?.length > 0 ? (
								<>
									{data.findElector.rows.map((elector, index) => (
										<TouchableOpacity key={index} onPress={() => router.push({pathname: `/dashboard/electors/${elector?.KODE_ELEKTOR}`, params: {keyParam: "findElector", historySearchText: searchText, fromScreen: APP_ROUTES.DASHBOARD.ELECTOR}})}>
											<CItemsElector key={index} detailElector={elector} fromScreen={APP_ROUTES.DASHBOARD.ELECTOR} />
										</TouchableOpacity>
									))}

									<View className="mt-2 items-center">
										{data.findElector?.rows?.length < data.findElector?.totalRecords ? (
											<TouchableOpacity
												className="border-blue-950 px-4 py-2 rounded-md border"
												style={{ backgroundColor: colors.secondary }}
												onPress={handleAction.onLoadMore}
												disabled={isLoading}
											>
												<Text className="text-white" style={{ fontFamily: "IBMPlexSans" }}>
													{isLoading ? "Loading..." : "Load more"}
												</Text>
											</TouchableOpacity>
										) : (
											<Text className="text-gray-500" style={{ fontFamily: "IBMPlexSans" }}>
												End of records
											</Text>
										)}
									</View>

								</>
							) : (
								<Text className="text-center mt-5 text-gray-600">No records found</Text>
							)}
						</ScrollView>
					</>
				)}
			</View>

            <Modal visible={isShowModalFilter} onRequestClose={() => setIsShowModalFilter(false)} animationType="slide">
                <View className="flex-1 bg-gray-100">
                    <View className="p-4 flex-row items-center justify-between bg-white border-b border-gray-200">
                        <Text className="text-lg" style={{fontFamily: "IBMPlexSans_Bold", color: colors.secondary}}>Filter Options</Text>
                        <TouchableOpacity onPress={handleAction.onCloseModal}>
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
                                <TextInput contentStyle={{ paddingLeft: 0 }} className="bg-white uppercase" mode="outlined" style={{height: 30, fontSize: 12, padding: 0}} onChangeText={(e) => updateParam("findElector", "prnmibu", (e).toUpperCase())} inputMode="text" value={params.findElector?.prnmibu} />
                            </View>

                            <View className="bg-white border border-gray-300 p-2 rounded-md mb-1">
                                <Text className="mb-1" style={{fontFamily: "IBMPlexSans_Bold", fontSize: 12, color: colors.secondary}}>
                                    Actualization / Registration
                                </Text>
                                <CListPicker isOutlinedMode={false} labelOutline="Order by" unique="filterSortOrderBy" ableToSearch={false} selectedValue={params.findElector?.prsts_ar} items={LIST_ELECTOR_REGISTER_TYPE} onSelect={(e) => updateParam("findElector", "prsts_ar", e)} />
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
            </Modal>
		</>
	);
};

export default ElectorScreen;
