import CTopHeaderSubMenu from "@/components/CTopHeaderSubMenu";
import {useLocalSearchParams, useRouter} from "expo-router";
import { APP_ROUTES } from "@/constants/urls";
import {ActivityIndicator, Modal, Keyboard, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {Portal, TextInput} from "react-native-paper";
import {useEffect, useState} from "react";
import { Ionicons } from "@expo/vector-icons";
import CFilterVerificationType from "@/components/CFilterVerificationType";
import colors from "@/constants/colors";
import CSortBy from "@/components/CSortBy";
import CItemsElector from "@/components/CItemsElector";
import useElector from "@/queries/useElector";
import {useAuth} from "@/queries/useAuth";
import {detectInputType, formatNumber, reformatCodeElector} from "@/helpers/general";
import CAndroidDatepicker from "@/components/CAndroidDatepicker";
import {formatDate, parseFormattedDate} from "@/helpers/formatDate";
import CListPicker from "@/components/CListPicker";
import {
    LIST_ELECTOR_STATUS_PRINT_TYPE, LIST_ELECTOR_TYPE,
    LIST_VERIFICATION_STATUS,
    RECORDS_ORDER_BY_LIST,
    RECORDS_PER_PAGE_LIST
} from "@/constants/general";
import CFilterByStatusLists from "@/components/CFilterByStatusLists";
import CShowResult from "@/components/CShowResult";
import useRegion from "@/queries/useRegion";
import CRegionPicker from "@/components/CRegionPicker";

const VerifyElectorScreen = () => {
    const storeName = "verifyElectorScreen"
    const {user} = useAuth();
    const {params, updateParam, updateParams, fetchElectorVerifyList, isLoading, data, resetParams} = useElector();
    const {selectedRegions, resetRegions} = useRegion(storeName);
    const router = useRouter();
    const [isSearch, setIsSearch] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [selectedFilter, setSelectedFilter] = useState("ALL");
    const [isShowModalFilter, setIsShowModalFilter] = useState(false);

    const handleAction = {
        onBack: () => {
            resetRegions(storeName);
            resetParams();
            router.back();
        },
        onFilterVerificationType: (value) => {
            setSelectedFilter(value);
            updateParam("findElectorRegister", "p_page_number", 1);
            updateParam("findElectorRegister", "prsts_verif", value);

            fetchElectorVerifyList(true);
            Keyboard.dismiss();
        },
        onApplyFilter: () => {
            if (searchText === ""){
                updateParam("findElectorRegister", "prkdelektor", "ALL");
                updateParam("findElectorRegister", "prnama", "ALL");
            } else {
                const isNumeric = detectInputType(searchText) === "Numeric";

                updateParam("findElectorRegister", "prnopendaftaran", "ALL");
                if (isNumeric) {
                    updateParam("findElectorRegister", "prkdelektor", reformatCodeElector(searchText));
                    updateParam("findElectorRegister", "prnama", "ALL");
                } else {
                    updateParam("findElectorRegister", "prkdelektor", "ALL");
                    updateParam("findElectorRegister", "prnama", searchText.toUpperCase());
                }
            }

            updateParam("findElectorRegister", "prdistrik", selectedRegions.district);
            updateParam("findElectorRegister", "prsubdistrik", selectedRegions.subdistrict);
            updateParam("findElectorRegister", "prsuku", selectedRegions.succo);
            updateParam("findElectorRegister", "praldeia", selectedRegions.aldeia);

            fetchElectorVerifyList(true);
            setIsSearch(true);
            setIsShowModalFilter(false);
        },
        onShowModalFilter: () => {
            setIsShowModalFilter(true);
            Keyboard.dismiss();
        },
        onSearch: () => {
            const isNumeric = detectInputType(searchText) === "Numeric";
            const formattedText = isNumeric ? reformatCodeElector(searchText) : searchText.toUpperCase();

            setSearchText(formattedText);

            if (formattedText === ""){
                updateParam("findElectorRegister", "prnama", "ALL");
                updateParam("findElectorRegister", "prkdelektor", "ALL");
            } else {
                const isNumeric = detectInputType(searchText) === "Numeric";

                updateParam("findElectorRegister", "prnopendaftaran", "ALL");
                updateParam("findElectorRegister", "prkdelektor", isNumeric ? formattedText : "ALL");
                updateParam("findElectorRegister", "prnama", isNumeric ? "ALL" : formattedText);
                updateParam("findElectorRegister", "prdistrik", user?.kode_distrik);
            }

            fetchElectorVerifyList(true);
            setIsSearch(true);
            Keyboard.dismiss();
        },
        onLoadMore: () => {
            console.log(params.findElectorRegister);
            // updateParam("findElectorRegister", "p_page_number", params.findElectorRegister.p_page_number + 1);
            // fetchElectorVerifyList(false);
        },
        onChangeDate: (value, isEndDate=true) => {
            let paramName = "prtg01"
            if (isEndDate) {
                paramName = "prtg02"
            }

            updateParam("findElectorRegister", paramName, formatDate(value));
        },
        onResetFilter: () => {
            resetRegions(storeName);
            resetParams();
            setIsShowModalFilter(false);
            setSearchText("");
            setIsSearch(false);
        },
        onCloseModal: () => setIsShowModalFilter(false),
    };

    return (
        <>
            <View className="flex-1 bg-gray-100">
                <CTopHeaderSubMenu title="Verify Elector" handlePress={handleAction.onBack} />
                <View className="px-4 py-2 flex-row items-center space-x-2">
                    <View className="flex-1 mr-1">
                        <TextInput
                            mode="outlined"
                            value={searchText}
                            onChangeText={setSearchText}
                            placeholder="Enter name or elector number"
                            style={[{ height: 40, fontSize: 14, backgroundColor: "#FFF" }, isLoading && { opacity: 1 },]}
                            outlineStyle={{ borderRadius: 5, borderWidth: 1, borderColor: colors.secondary }}
                            contentStyle={{ color: colors.secondary }}
                            left={<TextInput.Icon icon={() => <Ionicons name="search" size={20} color="gray" />} />}
                            returnKeyType="search"
                            onSubmitEditing={() => handleAction.onSearch()}
                            className="uppercase"
                            editable={!isLoading}
                            theme={{
                                colors: {
                                    primary: colors.secondary,
                                    onSurfaceVariant: colors.secondary,
                                },
                            }}
                        />
                    </View>
                    <TouchableOpacity
                        onPress={() => handleAction.onShowModalFilter()}
                        className="border bg-white border-gray-300 rounded-md justify-center items-center"
                        style={{
                            borderColor: colors.secondary,
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
                        <CFilterByStatusLists isDisabled={isLoading} statusLists={LIST_VERIFICATION_STATUS} selectedVerificationType={params.findElectorRegister?.prsts_verif} setSelectedVerificationType={handleAction.onFilterVerificationType} />
                        {!isLoading && data?.findElectorRegister?.rows?.length > 0 && (
                            <>
                                <CShowResult showPerPage={data?.findElectorRegister?.rows?.length} showTotalRecords={formatNumber(data.findElectorRegister?.totalRecords) || 0} />
                            </>
                        )}

                        <ScrollView contentContainerClassName="px-4 pb-5 mt-1" showsVerticalScrollIndicator={false}>
                            {isLoading ? (
                                <View className="flex-1 items-center justify-center mt-5">
                                    <ActivityIndicator size="large" color={colors.secondary} />
                                    <Text className="text-gray-600 mt-2">Loading...</Text>
                                </View>
                            ) : data?.findElectorRegister?.rows?.length > 0 ? (
                                <>
                                    {data.findElectorRegister.rows.map((elector, index) => (
                                        <TouchableOpacity key={index} onPress={() => router.push({pathname: `/dashboard/verify-elector/${elector?.NO_PENDAFTARAN}`, params: {keyParam: "findElectorRegister", historySearchText: searchText, fromScreen: APP_ROUTES.DASHBOARD.VERIFY_ELECTOR}})}>
                                            <CItemsElector key={index} detailElector={elector} fromScreen={APP_ROUTES.DASHBOARD.VERIFY_ELECTOR} />
                                        </TouchableOpacity>
                                    ))}

                                    <View className="mt-2 items-center">
                                        {data.findElectorRegister?.rows?.length < data.findElectorRegister?.totalRecords ? (
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
                                <Text className="text-center mt-5 text-gray-600">No results found</Text>
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

                    <ScrollView className="p-4">
                        <View className="bg-white border border-gray-300 p-2 rounded-md mb-1">
                            <Text className="mb-3" style={{fontFamily: "IBMPlexSans_Bold", fontSize: 12, color: colors.secondary}}>
                                Registration Date
                            </Text>
                            <CAndroidDatepicker endDate={parseFormattedDate(params.findElectorRegister.prtg02)} startDate={parseFormattedDate(params.findElectorRegister.prtg01)} onChangeStart={(e) => handleAction.onChangeDate(e, false)} onChangeEnd={(e) => handleAction.onChangeDate(e, true)} />
                        </View>

                        <View className="bg-white border border-gray-300 p-2 rounded-md mb-1">
                            <Text className="mb-3" style={{fontFamily: "IBMPlexSans_Bold", fontSize: 12, color: colors.secondary}}>
                                Elector Type & Status Print
                            </Text>
                            <View className="flex flex-row gap-2">
                                <CListPicker isOutlinedMode={true} labelOutline="Elector Type" unique="filterElectorType" selectedValue={params.findElectorRegister?.prsts_ar} items={LIST_ELECTOR_TYPE} onSelect={(e) => updateParam("findElectorRegister", "prsts_ar", e)} />
                                <CListPicker isOutlinedMode={true} labelOutline="Status Print" unique="filterStatusPrint" selectedValue={params.findElectorRegister?.prcetak} items={LIST_ELECTOR_STATUS_PRINT_TYPE} onSelect={(e) => updateParam("findElectorRegister", "prcetak", e)} />
                            </View>
                        </View>

                        <View className="bg-white border border-gray-300 p-2 rounded-md mb-1">
                            <Text className="mb-3" style={{fontFamily: "IBMPlexSans_Bold", fontSize: 12, color: colors.secondary}}>
                                Regions
                            </Text>
                            <CRegionPicker getDistrictUser={true} keyName={storeName} />
                        </View>

                        <View className="bg-white border border-gray-300 p-2 rounded-md mb-1">
                            <Text className="mb-3" style={{fontFamily: "IBMPlexSans_Bold", fontSize: 12, color: colors.secondary}}>
                                Shown Records
                            </Text>

                            <View className="flex flex-row gap-2">
                                <CListPicker isOutlinedMode={true} labelOutline="Show per page" dropPosition="top" unique="filterShowPerPage" selectedValue={params.findElectorRegister?.p_rows_per_page} items={RECORDS_PER_PAGE_LIST} onSelect={(e) => updateParam("findElectorRegister", "p_rows_per_page", e)} />
                                <CListPicker isOutlinedMode={true} labelOutline="Order by" dropPosition="top" unique="filterSortOrderBy" selectedValue={params.findElectorRegister?.prorder} items={RECORDS_ORDER_BY_LIST} onSelect={(e) => updateParam("findElectorRegister", "prorder", e)} />
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

export default VerifyElectorScreen;
