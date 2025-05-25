// components/CAndroidDateRangePicker.js
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";
import colors from "@/constants/colors";
import { formatDate } from "@/helpers/formatDate";

const CAndroidDateRangePicker = ({
	                                 startDate,
	                                 endDate,
	                                 onChangeStart,
	                                 onChangeEnd,
	                                 labelStart = "Start Date",
	                                 labelEnd   = "End Date",
                                 }) => {
	const showPicker = (value, onChange) => {
		DateTimePickerAndroid.open({
			value,
			onChange: (_, selectedDate) => {
				if (selectedDate) onChange(selectedDate);
			},
			mode: "date",
			is24Hour: true,
		});
	};

	return (
		<View className="flex-row justify-between items-center gap-2">
			{/* Start Date */}
			<View
				className={`border border-gray-300 rounded-md px-4 py-2 ${
					endDate ? "w-1/2" : "w-full"
				} relative`}
			>
				<Text className="text-xs text-gray-500 absolute -top-2 left-2 bg-white px-1">
					{labelStart}
				</Text>
				<TouchableOpacity
					onPress={() => showPicker(startDate, onChangeStart)}
					className="flex-row items-center"
				>
					<Ionicons name="calendar" size={20} color={colors.primary} />
					<Text className="text-lg ml-2">
						{formatDate(startDate, "dd/MM/yyyy")}
					</Text>
				</TouchableOpacity>
			</View>

			{/* End Date (only if passed) */}
			{endDate && (
				<View className="border border-gray-300 rounded-md px-4 py-2 w-1/2 relative">
					<Text className="text-xs text-gray-500 absolute -top-2 left-2 bg-white px-1">
						{labelEnd}
					</Text>
					<TouchableOpacity
						onPress={() => showPicker(endDate, onChangeEnd)}
						className="flex-row items-center"
					>
						<Ionicons name="calendar" size={20} color={colors.primary} />
						<Text className="text-lg ml-2">
							{formatDate(endDate, "dd/MM/yyyy")}
						</Text>
					</TouchableOpacity>
				</View>
			)}
		</View>
	);
};

export default CAndroidDateRangePicker;
