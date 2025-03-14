import {Image, Text} from "react-native";
import staeLogo from "@/assets/image/stae-logo.png"
import {globalStyles} from "@/styles/globalStyle";

const CAuthHeader = () => {
	return (
		<>
			<Image source={staeLogo} className="w-28 h-28 self-center mb-5"/>
			<Text style={globalStyles.text} className="text-3xl text-center mt-2.5 mb-2.5 uppercase">Sistema Informasaun Resenseamento Eleitoral</Text>
		</>
	)
}

export default CAuthHeader;
