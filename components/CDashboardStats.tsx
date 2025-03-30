import colors from "@/constants/colors";
import { View } from "react-native";
import { Divider, Text } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { formatNumber } from "@/helpers/general";
import ContentLoader, { Rect } from "react-content-loader/native";

const CDashboardStats = ({
                             data,
                             title,
                             section,
                             showPercentMan = true,
                             showPercentWoman = true,
                             showPercentTotal = true,
                             isLoading = false, // Added isLoading prop
                         }) => {
    const { input } = data || {}; // Ensure data exists
    const selectedData = input?.[section];

    const man = selectedData?.man || 0;
    const woman = selectedData?.woman || 0;
    const total = selectedData?.total ?? man + woman;

    const percentMan = selectedData?.percentMan;
    const percentWoman = selectedData?.percentWoman;
    const percentTotal = selectedData?.percentTotal ?? (percentMan && percentWoman ? percentMan + percentWoman : undefined);

    return (
        <View key={section} className="border rounded-md py-1 px-2 border-blue-950" style={{ backgroundColor: "#275dad" }}>
            <View className="flex flex-row justify-between mb-1">
                <Text style={{ color: "#FFF", fontFamily: "IBMPlexSans_Bold", fontSize: 14, lineHeight: 18 }}>
                    {title}
                </Text>
                <Divider style={{ backgroundColor: "#FFF" }} />
            </View>
            <View className="flex-1 justify-between gap-1">
                {/* Function to Render Skeleton or Text */}
                {[
                    { label: "Men", icon: "man-outline", value: man, percent: percentMan, showPercent: showPercentMan },
                    { label: "Women", icon: "woman-outline", value: woman, percent: percentWoman, showPercent: showPercentWoman },
                    { label: "Total", icon: "people-outline", value: total, percent: percentTotal, showPercent: showPercentTotal }
                ].map(({ label, icon, value, percent, showPercent }) => (
                    <View key={label} className="flex-row items-center">
                        <Ionicons name={icon} size={20} className="p-1 bg-white rounded-md mr-2 border border-blue-950" color={"#275dad"} />
                        <View className="flex-1 flex-row justify-between">
                            <Text style={{ color: "#FFF", fontFamily: "IBMPlexSans_Bold", fontSize: 14 }}>{label}</Text>
                            {isLoading ? (
                                <ContentLoader
                                    speed={1}
                                    width={100}
                                    height={14}
                                    viewBox="0 0 100 14"
                                    backgroundColor="#1e4783"
                                    foregroundColor="#172554"
                                >
                                    <Rect x="0" y="0" rx="4" ry="4" width="100" height="14" />
                                </ContentLoader>
                            ) : (
                                <Text style={{ color: "#FFF", fontFamily: "IBMPlexSans_Bold", fontSize: 14 }}>
                                    {formatNumber(value)}
                                    {showPercent && percent !== undefined ? ` (${percent}%)` : ""}
                                </Text>
                            )}
                        </View>
                    </View>
                ))}
            </View>
        </View>
    );
};

export default CDashboardStats;
