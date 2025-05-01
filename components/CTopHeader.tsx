import {useAuth} from "@/queries/useAuth";
import {Appbar} from "react-native-paper";
import colors from "@/constants/colors";
import {Image, Text, View} from "react-native";
import {router} from "expo-router";

const CTopHeader = ({useBorderBottom=true}) => {
	const { signOut } = useAuth()

	const handleAction = {
		processSignOut: async () => {
			await signOut()

			router.replace("/")
		}
	}

	return (
		<Appbar.Header style={{borderBottomWidth: useBorderBottom ? 2 : 1, borderColor: "#E5E7EB", backgroundColor: "#FFF"}}>
			<View className="pl-4 flex-row flex-1 items-center">
				<Image
					source={require("@/assets/image/stae-logo.png")}
					style={{ width: 40, height: 40, resizeMode: "contain", marginRight: 8, marginTop: 5 }}
				/>

				<View>
					<Text style={{fontFamily: "IBMPlexSans_Bold", fontSize: 18, color: colors.secondary, lineHeight: 25}}>
						SIRE MOBILE
					</Text>
					<Text style={{fontFamily: "IBMPlexSans", fontSize: 13, color: colors.secondary, lineHeight: 18}}>
						Informasaun Resenseamento Eleitoral
					</Text>
				</View>
			</View>
			<Appbar.Action icon="logout" color={colors.secondary} onPress={() => handleAction.processSignOut()} />
		</Appbar.Header>
	)
}

export default CTopHeader;