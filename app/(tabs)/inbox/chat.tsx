import {Image, Text, View} from "react-native";
import React from "react";

const InboxChatScreen = () => {
	return (
		<>
			<View className="flex-1 px-2 justify-center items-center">
				<Image
					source={require('@/assets/image/empty-chat.png')}
					className="w-1/2 h-1/3 mb-0"
					resizeMode="contain"
				/>
				<Text className="uppercase text-sm text-gray-400" style={{fontFamily: "IBMPlexSans"}}>You haven't received any messages</Text>
			</View>
		</>
	)
}

export default InboxChatScreen