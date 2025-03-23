import {ScrollView, Text, TouchableOpacity, View} from "react-native";
import {router, useLocalSearchParams} from "expo-router";
import CTopHeaderSubMenu from "@/components/CTopHeaderSubMenu";
import CAvatar from "@/components/CAvatar";
import colors from "@/constants/colors";
import {useAuth} from "@/queries/useAuth";
import {useEffect, useState} from "react";
import {Dialog, Portal} from "react-native-paper";
import useElector from "@/queries/useElector";
import {Ionicons} from "@expo/vector-icons";
import {APP_ROUTES} from "@/constants/urls";

const ElectorDetail = () => {
	const {user} = useAuth();
	const {processVerifyElector, updateParam, fetchFindElector, data, params, resetParams} = useElector();
	const [verifyDialog, setVerifyDialog] = useState(false);
	const {id, fromScreen, historySearchText, keyParam} = useLocalSearchParams();
	const electorByID = data?.findElector?.rows[0]

	useEffect(() => {
		if (id){
			if (fromScreen === APP_ROUTES.MAIN.SEARCH_BY_QR){
				resetParams();
			}
			updateParam("findElector", "prkdelektor", id)
			fetchFindElector(true)
		}
	}, [id]);

	const handleAction = {
		onBack: () => {
			const backTo = fromScreen === APP_ROUTES.MAIN.SEARCH_BY_QR ? APP_ROUTES.MAIN.DASHBOARD : fromScreen;
			router.replace({
				pathname: backTo,
				params: { historySearchText: historySearchText, historyFromDetail: JSON.stringify(params?.[keyParam]) }
			})
		},
		onPressVerify: () => {
			updateParam("verifyElectorRegister", "noPendaftaran", electorByID?.NO_PENDAFTARAN);
			updateParam("verifyElectorRegister", "urut", electorByID?.URUT);
			updateParam("verifyElectorRegister", "prioritas", user?.tingkatan);
			updateParam("verifyElectorRegister", "prkodeUser", user?.kode_user);

			processVerifyElector();
		},
		onPressCancel: () => {
			setVerifyDialog(true);
		}
	}

	return (
		<>
			<View className="flex-1 bg-gray-100">
				<CTopHeaderSubMenu title={`Detail Elector #${id}`} handlePress={handleAction.onBack} />

				<ScrollView showsVerticalScrollIndicator={false}>
				<View className="px-4 py-2">
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

							{user?.tingkatan > 5 && electorByID?.VERIFIKASI_STATUS === "VERIFY" && (
								<>
									<TouchableOpacity
										onPress={() => setVerifyDialog(true)}
										className="mb-2 mt-3 p-2 rounded-md items-center border-blue-950 border"
										style={{backgroundColor: colors.secondary}}
									>
										<Text className="text-lg" style={{color: "#FFF"}}>Verify</Text>
									</TouchableOpacity>
								</>
							)}
						</View>
					</View>
				</View>
				</ScrollView>
			</View>

			<Portal>
				<Dialog style={{borderRadius: 5, backgroundColor: "#FFF"}} visible={verifyDialog} onDismiss={() => setVerifyDialog(!verifyDialog)}>
					<Dialog.Title>Verification Confirmation</Dialog.Title>
					<Dialog.Content>
						<Text>Are you sure you want to continue the verification process?</Text>
					</Dialog.Content>
					<Dialog.Actions>
						<TouchableOpacity
							onPress={() => handleAction.onPressVerify()}
							className="mb-2 mt-3 p-2 w-20 rounded-md items-center border-blue-950 border"
							style={{backgroundColor: colors.secondary}}
						>
							<Text className="text-lg" style={{color: "#FFF"}}>Yes</Text>
						</TouchableOpacity>

						<TouchableOpacity
							onPress={() => handleAction.onPressCancel()}
							className="mb-2 mt-3 p-2 w-20 rounded-md items-center border-gray-300 border"
							style={{backgroundColor: colors.tertiary}}
						>
							<Text className="text-lg" style={{color: colors.secondary}}>No</Text>
						</TouchableOpacity>
					</Dialog.Actions>
				</Dialog>
			</Portal>
		</>
	)
}

export default ElectorDetail;