import CTopHeaderSubMenu from "@/components/CTopHeaderSubMenu";
import {useLocalSearchParams, useRouter} from "expo-router";
import { APP_ROUTES } from "@/constants/urls";
import {ActivityIndicator, Modal, TextInput as BaseTextInput, Keyboard, ScrollView, Text, TouchableOpacity, View} from "react-native";
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
    LIST_ELECTOR_STATUS, LIST_ELECTOR_STATUS_PRINT_TYPE,
    LIST_ELECTOR_TYPE, RECORDS_DOUBLE_ORDER_BY_LIST,
    RECORDS_ORDER_BY_LIST,
    RECORDS_PER_PAGE_LIST
} from "@/constants/general";
import CListPicker from "@/components/CListPicker";
import CRegionPicker from "@/components/CRegionPicker";
import useRegion from "@/queries/useRegion";
import CAndroidDatepicker from "@/components/CAndroidDatepicker";
import {formatDate, parseFormattedDate} from "@/helpers/formatDate";

const DoubleElectorScreen = () => {
    const storeName = "electorScreen"
    const scrollViewRef = useRef(null);
    const {user} = useAuth();
    const {params, updateParam, updateParams, fetchFindDoubleElector, isLoading, data, resetParams} = useElector();
    const {selectedRegions, resetRegions} = useRegion(storeName);
    const router = useRouter();
    const {historySearchText, historyFromDetail} = useLocalSearchParams();
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
            updateParam("findDoubleElectorRegister", "prstatus", value === "ALL" ?"":value);

            fetchFindDoubleElector(true);
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

            updateParam("findDoubleElectorRegister", "prkdelektor", isNumeric ? formattedText : "");
            updateParam("findDoubleElectorRegister", "prnama", isNumeric ? "" : formattedText);
            updateParam("findDoubleElectorRegister", "prstatus", (params.findDoubleElectorRegister?.prstatus !== ""? params.findDoubleElectorRegister?.prstatus:""));

            fetchFindDoubleElector(true);
            setIsSearch(true);
            Keyboard.dismiss();
        },
        onLoadMore: async () => {
            updateParam("findDoubleElectorRegister", "p_page_number", params.findDoubleElectorRegister.p_page_number + 1);
            fetchFindDoubleElector(false);
        },
        onChangeDate: (value, isEndDate=true) => {
            let paramName = "prtg01"
            if (isEndDate) {
                paramName = "prtg02"
            }

            updateParam("findDoubleElectorRegister", paramName, formatDate(value));
        },
        onResetFilter: () => {
            resetRegions(storeName);
            resetParams();
            setIsShowModalFilter(false);
            setSearchText("");
            setIsSearch(false);
        },
        onChangeSizeScrollView: (width, height) => {
            const getTotalResults = data?.findDoubleElectorRegister?.rows?.length || 0
            const scrollTo = getTotalResults === params.findDoubleElectorRegister?.p_rows_per_page ? 0 : height

            if (scrollViewRef.current && lastScrollPosition === 0) {
                scrollViewRef.current.scrollTo({ y: scrollTo, animated: true });
            }
        },
        onApplyFilter: () => {
            if (searchText === ""){
                updateParam("findDoubleElectorRegister", "prkdelektor", "ALL");
                updateParam("findDoubleElectorRegister", "prnama", "ALL");
            } else {
                const isNumeric = detectInputType(searchText) === "Numeric";

                updateParam("findDoubleElectorRegister", "prnopendaftaran", "ALL");
                if (isNumeric) {
                    updateParam("findDoubleElectorRegister", "prkdelektor", reformatCodeElector(searchText));
                    updateParam("findDoubleElectorRegister", "prnama", "ALL");
                } else {
                    updateParam("findDoubleElectorRegister", "prkdelektor", "ALL");
                    updateParam("findDoubleElectorRegister", "prnama", searchText.toUpperCase());
                }

            }

            updateParam("findDoubleElectorRegister", "prdistrik", (selectedRegions.district === "" ? "ALL":selectedRegions.district));
            updateParam("findDoubleElectorRegister", "prsubdistrik", (selectedRegions.subdistrict === "" ? "ALL":selectedRegions.subdistrict));
            updateParam("findDoubleElectorRegister", "prsuku", (selectedRegions.succo === "" ? "ALL":selectedRegions.succo));
            updateParam("findDoubleElectorRegister", "praldeia", (selectedRegions.aldeia === "" ? "ALL":selectedRegions.aldeia));

            fetchFindDoubleElector(true);
            setIsSearch(true);
            setIsShowModalFilter(false);
        },
        onCloseModal: () => setIsShowModalFilter(false),
    };

    return (
        <>
            <View className="flex-1 bg-gray-100">
                <CTopHeaderSubMenu title="Double Elector" handlePress={handleAction.onBack} />
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
                        {!isLoading && data?.findDoubleElectorRegister?.rows?.length > 0 && (
                            <>
                                <CShowResult showPerPage={data?.findDoubleElectorRegister?.rows?.length} showTotalRecords={formatNumber(data.findDoubleElectorRegister?.totalRecords) || 0} />
                            </>
                        )}

                        <ScrollView ref={scrollViewRef} contentContainerClassName="px-4 pb-5 mt-1" showsVerticalScrollIndicator={false} onMomentumScrollEnd={(e) => setLastScrollPosition(e.nativeEvent.contentOffset.y)} onContentSizeChange={handleAction.onChangeSizeScrollView}>
                            {isLoading ? (
                                <View className="flex-1 items-center justify-center mt-5">
                                    <ActivityIndicator size="large" color={colors.secondary} />
                                    <Text className="text-gray-600 mt-2">Loading...</Text>
                                </View>
                            ) : data?.findDoubleElectorRegister?.rows?.length > 0 ? (
                                <>
                                    {data.findDoubleElectorRegister.rows.map((elector, index) => (
                                        <TouchableOpacity key={index} onPress={() => router.push({pathname: `/dashboard/double-elector/${elector?.KODE_ELEKTOR}`, params: {keyParam: "findDoubleElectorRegister", historySearchText: searchText, fromScreen: APP_ROUTES.DASHBOARD.DOUBLE_ELECTOR}})}>
                                            <CItemsElector key={index} detailElector={elector} fromScreen={APP_ROUTES.DASHBOARD.DOUBLE_ELECTOR} />
                                        </TouchableOpacity>
                                    ))}

                                    <View className="mt-2 items-center">
                                        {data.findDoubleElectorRegister?.rows?.length < data.findDoubleElectorRegister?.totalRecords ? (
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

                    <ScrollView className="p-4 bg">
                        <View className="bg-white border border-gray-300 p-2 rounded-md mb-1">
                            <Text className="mb-3" style={{fontFamily: "IBMPlexSans_Bold", fontSize: 12, color: colors.secondary}}>
                                Registration Date
                            </Text>
                            <CAndroidDatepicker endDate={parseFormattedDate(params.findDoubleElectorRegister.prtg02)} startDate={parseFormattedDate(params.findDoubleElectorRegister.prtg01)} onChangeStart={(e) => handleAction.onChangeDate(e, false)} onChangeEnd={(e) => handleAction.onChangeDate(e, true)} />
                        </View>

                        <View className="bg-white border border-gray-300 p-2 rounded-md mb-1">
                            <Text className="mb-3" style={{fontFamily: "IBMPlexSans_Bold", fontSize: 12, color: colors.secondary}}>
                                Elector Type
                            </Text>
                            <CListPicker unique="filterElectorType" selectedValue={params.findDoubleElectorRegister?.prsts_ar} items={LIST_ELECTOR_TYPE} onSelect={(e) => updateParam("findDoubleElectorRegister", "prsts_ar", e)} />
                        </View>

                        <View className="bg-white border border-gray-300 p-2 rounded-md mb-1">
                            <Text className="mb-3" style={{fontFamily: "IBMPlexSans_Bold", fontSize: 12, color: colors.secondary}}>
                                Regions
                            </Text>
                            <CRegionPicker getDistrictUser={true} getSubdistrictUser={false} keyName={storeName} />
                        </View>

                        <View className="bg-white border border-gray-300 p-2 rounded-md mb-1">
                            <Text className="mb-3" style={{fontFamily: "IBMPlexSans_Bold", fontSize: 12, color: colors.secondary}}>
                                Shown Records
                            </Text>
                            <View className="flex flex-row gap-2">
                                <CListPicker isOutlinedMode={true} labelOutline="Show per page" unique="filterShowPerPage" selectedValue={params.findDoubleElectorRegister?.p_rows_per_page} items={RECORDS_PER_PAGE_LIST} onSelect={(e) => updateParam("findDoubleElectorRegister", "p_rows_per_page", e)} />
                                <CListPicker isOutlinedMode={true} labelOutline="Order by" unique="filterSortOrderBy" selectedValue={params.findDoubleElectorRegister?.prorder} items={RECORDS_DOUBLE_ORDER_BY_LIST} onSelect={(e) => updateParam("findDoubleElectorRegister", "prorder", e)} />
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
            </Modal>
        </>
    );
};

export default DoubleElectorScreen;
