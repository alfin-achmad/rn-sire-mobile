import {Image, Text, View} from "react-native";
import React from "react";

const InboxNotificationScreen = () => {
	return (
		<>
			<View className="flex-1 px-2 justify-center items-center">
				<Image
					source={require('@/assets/image/empty-notification.png')}
					className="w-1/2 h-1/3 mb-0"
					resizeMode="contain"
				/>
				<Text className="uppercase text-sm text-gray-400 w-1/2 text-center" style={{fontFamily: "IBMPlexSans"}}>We'll notify you when there's something new.</Text>
			</View>
		</>
	)
}

export default InboxNotificationScreen