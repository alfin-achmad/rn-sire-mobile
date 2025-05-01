import {Text, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import colors from "@/constants/colors";
import CAvatar from "@/components/CAvatar";
import CFinger from "@/components/CFinger";
import CSignature from "@/components/CSignature";

const CElectorDetail = ({dataElectorDetail}) => {
    const electorByID = dataElectorDetail;

    return (
        <View className="bg-white border border-gray-300 rounded-md p-2">
            {electorByID?.AR === "AR" && (
                <View className="absolute top-1 right-1 border-blue-950 px-2 py-0.5 rounded-full flex-row items-center">
                    <Ionicons name="checkmark-circle" size={12} color={colors.secondary} />
                    <Text className=" text-xs" style={{ fontFamily: "IBMPlexSans", color: colors.secondary }}>
                        Verified
                    </Text>
                </View>
            )}

            <View className="flex justify-between items-center">
                <View className="w-1/6 items-center justify-center">
                    <CAvatar width={90} height={124} no={electorByID?.KODE_ELEKTOR === "0" ? electorByID?.NO_PENDAFTARAN : electorByID?.KODE_ELEKTOR} name={electorByID?.NAMA} urlBy={electorByID?.KODE_ELEKTOR === "0" ? "byreg":(electorByID?.AR === "AR" ? "byelector" : "byelector2014")} />
                </View>
            </View>
            <View className="mt-5">
                <Text className="mb-0" style={{ fontFamily: "IBMPlexSans_Bold", lineHeight: 16, fontSize: 14, color: colors.secondary }}>
                    Basic Information
                </Text>
                <Text className="mb-5 text-gray-500 text-sm" style={{ fontFamily: "IBMPlexSans" }}>
                    Details about the elector’s registration and identity.
                </Text>
                <View className="border border-gray-300 rounded-md mb-3 px-1 py-2 w-full">
                    <Text className="text-sm text-gray-500 absolute -top-3 left-2 bg-white px-1">
                        Fullname
                    </Text>
                    <Text className="text-sm text-gray-500 ml-2">{electorByID?.NAMA}</Text>
                </View>

                <View className="flex flex-row mb-3 gap-x-3">
                    <View className="border border-gray-300 rounded-md px-1 py-2 w-[40%]">
                        <Text className="text-sm text-gray-500 absolute -top-3 left-2 bg-white px-1">
                            Code Elector
                        </Text>
                        <Text className="text-sm text-gray-500 ml-2">{electorByID?.KODE_ELEKTOR}</Text>
                    </View>

                    <View className="border border-gray-300 rounded-md px-1 py-2 w-[57%]">
                        <Text className="text-sm text-gray-500 absolute -top-3 left-2 bg-white px-1">
                            No. Registration
                        </Text>
                        <Text className="text-sm text-gray-500 ml-2">{electorByID?.NO_PENDAFTARAN}</Text>
                    </View>
                </View>

                <View className="flex flex-row mb-3 gap-x-3">
                    <View className="border border-gray-300 rounded-md px-1 py-2 w-[40%]">
                        <Text className="text-sm text-gray-500 absolute -top-3 left-2 bg-white px-1">
                            Gender
                        </Text>
                        <Text className="text-sm text-gray-500 ml-2">{electorByID?.KELAMIN}</Text>
                    </View>

                    <View className="border border-gray-300 rounded-md px-1 py-2 w-[57%]">
                        <Text className="text-sm text-gray-500 absolute -top-3 left-2 bg-white px-1">
                            Place, and Date of Birth
                        </Text>
                        <Text className="text-sm text-gray-500 ml-2">{electorByID?.TEMPAT_LAHIR || "Unknown"} - {electorByID?.TANGGAL_LAHIR}</Text>
                    </View>
                </View>

                <View className="border border-gray-300 rounded-md mb-3 px-1 py-2 w-full">
                    <Text className="text-sm text-gray-500 absolute -top-3 left-2 bg-white px-1">
                        Regions
                    </Text>
                    <Text className="text-sm text-gray-500 ml-2">{electorByID?.NAMA_DISTRIK} -> {electorByID?.NAMA_SUBDISTRIK} -> {electorByID?.NAMA_SUKO} -> {electorByID?.NAMA_ALDEIA}</Text>
                </View>

                <View className="border border-gray-300 rounded-md mb-3 px-1 py-2 w-full">
                    <Text className="text-sm text-gray-500 absolute -top-3 left-2 bg-white px-1">
                        Father's Name
                    </Text>
                    <Text className="text-sm text-gray-500 ml-2">{electorByID?.NAMA_AYAH}</Text>
                </View>

                <View className="border border-gray-300 rounded-md mb-3 px-1 py-2 w-full">
                    <Text className="text-sm text-gray-500 absolute -top-3 left-2 bg-white px-1">
                        Mother's Name
                    </Text>
                    <Text className="text-sm text-gray-500 ml-2">{electorByID?.NAMA_IBU}</Text>
                </View>

                <View className="flex flex-row mb-3 gap-x-3">
                    <View className="border border-gray-300 rounded-md px-1 py-2 w-[40%]">
                        <Text className="text-sm text-gray-500 absolute -top-3 left-2 bg-white px-1">
                            Phone Number
                        </Text>
                        <Text className="text-sm text-gray-500 ml-2">{electorByID?.HANDPHONE}</Text>
                    </View>

                    <View className="border border-gray-300 rounded-md px-1 py-2 w-[57%]">
                        <Text className="text-sm text-gray-500 absolute -top-3 left-2 bg-white px-1">
                            E-Mail
                        </Text>
                        <Text className="text-sm text-gray-500 ml-2">{electorByID?.EMAIL}</Text>
                    </View>
                </View>

                <Text className="mb-0" style={{ fontFamily: "IBMPlexSans_Bold", lineHeight: 16, fontSize: 14, color: colors.secondary }}>
                    Biometrics
                </Text>
                <Text className="mb-5 text-gray-500 text-sm" style={{ fontFamily: "IBMPlexSans" }}>
                    Biometric data includes left & right fingerprints and autograph for identity verification.
                </Text>

                <View className="flex flex-row mb-3 gap-2">
                    <CFinger isAR={electorByID?.AR} byNo={electorByID?.KODE_ELEKTOR} />
                    <CSignature isAR={electorByID?.AR !== null} byNo={electorByID?.KODE_ELEKTOR} />
                </View>

            </View>
        </View>
    )
}

export default CElectorDetail