import {Image, StyleSheet, Text, View} from "react-native";
import React from "react";
import colors from "@/constants/colors";

const CAuthFooter = () => {
	return (
		<>
			<View className="absolute bottom-5 w-full items-center">
				<Text style={{fontFamily: "IBMPlexSans_Bold", color: colors.secondary}}>© STAE 2024</Text>
			</View>
		</>
	)
}

export default CAuthFooter;