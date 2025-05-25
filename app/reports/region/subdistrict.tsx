import {Image, Text, View} from "react-native";
import React from "react";

const ReportRegionSubdistrictScreen = () => {
	return (
		<>
			<View className="flex-1 px-2 justify-center items-center">
				<Image
					source={require('@/assets/image/empty-notification.png')}
					className="w-1/2 h-1/3 mb-0"
					resizeMode="contain"
				/>
				<Text className="uppercase text-sm text-gray-400" style={{fontFamily: "IBMPlexSans"}}>Nothing to show here... yet.</Text>
			</View>
		</>
	)
}

export default ReportRegionSubdistrictScreen