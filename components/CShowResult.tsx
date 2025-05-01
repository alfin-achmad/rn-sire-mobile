import {useState} from "react";
import {View, Text, TouchableOpacity} from "react-native";
import {Menu, Button} from "react-native-paper";
import {Ionicons} from "@expo/vector-icons";

const CShowResult = ({ showTotalRecords, showPerPage }) => {
	return (
		<View className="flex justify-between flex-row">
			<View className="px-4 mt-4 flex-row">
				<Text className="text-xs font-medium text-gray-600 mr-2" style={{fontFamily: "IBMPlexSans"}}>Showing results :</Text>
				<Text className="text-xs font-medium text-gray-600 mr-2" style={{fontFamily: "IBMPlexSans_Bold"}}>{showPerPage}</Text>
			</View>
			<View className="px-4 mt-4 flex-row">
				<Text className="text-xs font-medium text-gray-600 mr-2" style={{fontFamily: "IBMPlexSans"}}>Total records :</Text>
				<Text className="text-xs font-medium text-gray-600 mr-2" style={{fontFamily: "IBMPlexSans_Bold"}}>{showTotalRecords}</Text>
			</View>
		</View>
	);
};

export default CShowResult;
