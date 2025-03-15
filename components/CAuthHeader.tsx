import { Image, Text, View } from "react-native";
import staeLogo from "@/assets/image/stae-logo.png";
import { globalStyles } from "@/styles/globalStyle";
import colors from "@/constants/colors";

const CAuthHeader = () => {
	return (
		<View className="flex-row items-center">
			<Image source={staeLogo} className="w-14 h-14 mr-4" />
			<View>
				<Text style={{...globalStyles.textBold, color: colors.secondary}} className="text-3xl uppercase">
					SIRE Mobile
				</Text>
				<Text style={{...globalStyles.text, color: colors.secondary}} className="text-sm uppercase">
					Informasaun Resenseamento Eleitoral
				</Text>
			</View>
		</View>
	);
};

export default CAuthHeader;
