import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { Text, TouchableOpacity, View } from "react-native";
import { format } from "date-fns";
import { Ionicons } from "@expo/vector-icons";
import colors from "@/constants/colors";
import {formatDate} from "@/helpers/formatDate";

const CAndroidDateRangePicker = ({ startDate, endDate, onChangeStart, onChangeEnd }) => {
	const showStartDatePicker = () => {
		DateTimePickerAndroid.open({
			value: startDate,
			onChange: (_, selectedDate) => {
				if (selectedDate) {
					onChangeStart(selectedDate);
				}
			},
			mode: "date",
			is24Hour: true,
		});
	};

	const showEndDatePicker = () => {
		DateTimePickerAndroid.open({
			value: endDate,
			onChange: (_, selectedDate) => {
				if (selectedDate) {
					onChangeEnd(selectedDate);
				}
			},
			mode: "date",
			is24Hour: true,
		});
	};

	return (
		<View className="flex-row justify-between items-center gap-2">
			<View className="border border-gray-300 rounded-md px-4 py-2 flex-1 w-full">
				<Text className="text-xs text-gray-500 absolute -top-2 left-2 bg-white px-1">
					Start Date
				</Text>
				<TouchableOpacity
					onPress={showStartDatePicker}
					className="flex-row items-center"
				>
					<Ionicons name="calendar" size={20} color={colors.primary} />
					<Text className="text-lg ml-2">{formatDate(startDate, "dd/MM/yyyy")}</Text>
				</TouchableOpacity>
			</View>

			<View className="border border-gray-300 rounded-md px-4 py-2 flex-1 w-full">
				<Text className="text-xs text-gray-500 absolute -top-2 left-2 bg-white px-1">
					End Date
				</Text>
				<TouchableOpacity
					onPress={showEndDatePicker}
					className="flex-row items-center"
				>
					<Ionicons name="calendar" size={20} color={colors.primary} />
					<Text className="text-lg ml-2">{formatDate(endDate, "dd/MM/yyyy")}</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default CAndroidDateRangePicker;
