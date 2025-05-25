import { Text, View } from "react-native";
import CAvatar from "@/components/CAvatar";
import colors from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import {APP_ROUTES} from "@/constants/urls";
import {Divider} from "react-native-paper";

const CDoubleItemElector = ({ detailElector, fromScreen='' }) => {
	const avatarNumber = detailElector?.NO_PENDAFTARAN;
	const avatarNumber2 = detailElector?.NO_PENDAFTARAN2;

	const avatarUrlBy = () => {
		return "byreg";
	};

	return (
		<>
			<View className="bg-white border border-gray-300 rounded-md mb-1">
				<View className="relative h-26 rounded-md p-2 flex flex-row">
					{((fromScreen === APP_ROUTES.DASHBOARD.ELECTOR && detailElector?.AR === "AR") || (fromScreen === APP_ROUTES.DASHBOARD.VERIFY_ELECTOR && detailElector?.VERIFIKASI_STATUS === "DISETUJUI")) && (
						<View className="absolute top-1 right-1 border-blue-950 px-2 py-0.5 rounded-full flex-row items-center">
							<Ionicons name="checkmark-circle" size={12} color={colors.secondary} />
							<Text className=" text-xs" style={{ fontFamily: "IBMPlexSans", color: colors.secondary }}>
								Verified
							</Text>
						</View>
					)}

					<View className="w-1/6 items-center justify-start">
						<CAvatar width={49} height={71} no={avatarNumber} name={detailElector?.NAMA} urlBy={avatarUrlBy()} />
					</View>

					<View className="w-4/5 flex px-2">
						<Text style={{ fontFamily: "IBMPlexSans_Bold", lineHeight: 15, fontSize: 14, color: colors.secondary }}>
							{detailElector?.NAMA}
						</Text>
						<Text style={{ fontFamily: "IBMPlexSans", color: colors.secondary, fontSize: 12 }}>
							{detailElector?.NO_PENDAFTARAN || "-"} / {detailElector?.KODE_ELEKTOR}
						</Text>
						<Text style={{ fontFamily: "IBMPlexSans", color: colors.secondary, fontSize: 10 }}>
							{detailElector?.NMDISTRIK} → {detailElector?.NMSUBDISTRIK} → {detailElector?.NMSUKO} → {detailElector?.NMALDEIA}
						</Text>
					</View>
				</View>
				<Divider style={{ backgroundColor: '#D1D5DB' }} />
				<View className="relative mb-1 h-26 rounded-md p-2 flex flex-row">
					{((fromScreen === APP_ROUTES.DASHBOARD.ELECTOR && detailElector?.AR === "AR") || (fromScreen === APP_ROUTES.DASHBOARD.VERIFY_ELECTOR && detailElector?.VERIFIKASI_STATUS === "DISETUJUI")) && (
						<View className="absolute top-1 right-1 border-blue-950 px-2 py-0.5 rounded-full flex-row items-center">
							<Ionicons name="checkmark-circle" size={12} color={colors.secondary} />
							<Text className=" text-xs" style={{ fontFamily: "IBMPlexSans", color: colors.secondary }}>
								Verified
							</Text>
						</View>
					)}

					<View className="w-1/6 items-center justify-start">
						<CAvatar width={49} height={71} no={avatarNumber2} name={detailElector?.NAMA2} urlBy={avatarUrlBy()} />
					</View>

					<View className="w-4/5 flex px-2">
						<Text style={{ fontFamily: "IBMPlexSans_Bold", lineHeight: 15, fontSize: 14, color: colors.secondary }}>
							{detailElector?.NAMA2}
						</Text>
						<Text style={{ fontFamily: "IBMPlexSans", color: colors.secondary, fontSize: 12 }}>
							{detailElector?.NO_PENDAFTARAN2 || "-"} / {detailElector?.KODE_ELEKTOR2}
						</Text>
						<Text style={{ fontFamily: "IBMPlexSans", color: colors.secondary, fontSize: 10 }}>
							{detailElector?.NMDISTRIK2} → {detailElector?.NMSUBDISTRIK2} → {detailElector?.NMSUKO2} → {detailElector?.NMALDEIA2}
						</Text>
					</View>
				</View>
			</View>
		</>
	);
};

export default CDoubleItemElector;
