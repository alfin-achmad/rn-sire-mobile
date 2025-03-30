import { Text, View } from "react-native";
import React from "react";
import colors from "@/constants/colors";

const CAuthFooter = () => {
	return (
		<View className="items-center mb-1">
			<Text style={{ fontFamily: "IBMPlexSans_Bold", color: colors.secondary, fontSize: 12 }}>
				© STAE 2024
			</Text>
		</View>
	);
};

export default CAuthFooter;
