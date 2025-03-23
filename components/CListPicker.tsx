import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

const DropdownComponent = ({
	                           unique,
	                           items,
	                           selectedValue,
	                           onSelect,
	                           dropPosition = "auto",
	                           isOutlinedMode = false,
	                           labelOutline = "Select Item", // Default label jika isOutlinedMode aktif
                           }) => {
	const [isFocus, setIsFocus] = useState(false);

	return (
		<View className="flex-1 w-full">
			{isOutlinedMode ? (
				<View className={`border border-gray-300 rounded-md py-2 relative ${isOutlinedMode?'px-2':'px4'}`}>
					<Text className="text-xs text-gray-500 absolute -top-2 left-2 bg-white px-1">
						{labelOutline}
					</Text>
					<Dropdown
						key={unique}
						style={[styles.dropdown, isOutlinedMode && { borderColor: "#FFF", height: 24 }]} // Kondisi borderColor
						placeholderStyle={styles.placeholderStyle}
						selectedTextStyle={styles.selectedTextStyle}
						inputSearchStyle={styles.inputSearchStyle}
						iconStyle={styles.iconStyle}
						data={items}
						search
						maxHeight={300}
						labelField="label"
						dropdownPosition={dropPosition}
						valueField="value"
						placeholder={!isFocus ? "Select item" : "..."}
						searchPlaceholder="Search..."
						value={selectedValue}
						onFocus={() => setIsFocus(true)}
						onBlur={() => setIsFocus(false)}
						onChange={(item) => {
							onSelect(item.value);
							setIsFocus(false);
						}}
					/>
				</View>
			) : (
				<Dropdown
					key={unique}
					style={[styles.dropdown, isFocus && { borderColor: "#E5E7EB" }]}
					placeholderStyle={styles.placeholderStyle}
					selectedTextStyle={styles.selectedTextStyle}
					inputSearchStyle={styles.inputSearchStyle}
					iconStyle={styles.iconStyle}
					data={items}
					search
					maxHeight={300}
					labelField="label"
					dropdownPosition={dropPosition}
					valueField="value"
					placeholder={!isFocus ? "Select item" : "..."}
					searchPlaceholder="Search..."
					value={selectedValue}
					onFocus={() => setIsFocus(true)}
					onBlur={() => setIsFocus(false)}
					onChange={(item) => {
						onSelect(item.value);
						setIsFocus(false);
					}}
				/>
			)}
		</View>
	);
};

export default DropdownComponent;

const styles = StyleSheet.create({
	dropdown: {
		height: 40,
		borderColor: "#E5E7EB", // Default borderColor
		borderWidth: 1,
		borderRadius: 5,
		paddingHorizontal: 5,
	},
	placeholderStyle: {
		fontSize: 14,
	},
	selectedTextStyle: {
		fontSize: 14,
	},
	iconStyle: {
		width: 20,
		height: 20,
	},
	inputSearchStyle: {
		height: 40,
		fontSize: 16,
	},
});
