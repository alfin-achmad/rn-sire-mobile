import {useState} from "react";
import {View, Text, TouchableOpacity} from "react-native";
import {Menu, Button} from "react-native-paper";
import {Ionicons} from "@expo/vector-icons";

const CSortBy = ({ selectedSort, setSelectedSort, startDate, endDate }) => {
	const [menuVisible, setMenuVisible] = useState(false);

	const sortOptions = [
		{ label: "Name A → Z", value: "asc" },
		{ label: "Name Z → A", value: "desc" },
	];

	const selectedLabel = sortOptions.find(option => option.value === selectedSort)?.label || "Select";

	return (
		<View className="flex justify-between flex-row">
			<View className="px-4 mt-4 flex-row items-center">
				<Text className="text-xs font-medium text-gray-600 mr-2" style={{fontFamily: "IBMPlexSans_Bold"}}>Sort by:</Text>
				<Menu
					visible={menuVisible}
					onDismiss={() => setMenuVisible(false)}
					anchor={
						<TouchableOpacity
							onPress={() => setMenuVisible(true)}
							className="flex-row items-center px-0 py-0"
						>
							<Text className="text-xs text-gray-600" style={{fontFamily: "IBMPlexSans"}}>{selectedLabel}</Text>
							<Ionicons name="chevron-down" size={16} color="gray" className="ml-1" />
						</TouchableOpacity>
					}
				>
					{sortOptions.map((option) => (
						<Menu.Item
							key={option.value}
							title={option.label}
							onPress={() => {
								setSelectedSort(option.value);
								setMenuVisible(false);
							}}
						/>
					))}
				</Menu>
			</View>
			<View className="px-4 mt-4 flex-row items-center">
				<Text className="text-xs font-medium text-gray-600 mr-2" style={{fontFamily: "IBMPlexSans_Bold"}}>Periode: {startDate} - {endDate}</Text>
			</View>
		</View>
	);
};

export default CSortBy;
