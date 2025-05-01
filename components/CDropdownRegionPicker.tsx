import React from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

const CDropdownRegionPicker = ({
	                               unique,
	                               items,
	                               selectedValue,
	                               onSelect,
	                               placeholder = "Select item",
	                               disabled,
	                               isLoading,
                               }) => {
	return (
		<View className="flex-1 w-full relative">
			<Dropdown
				key={unique}
				style={[styles.dropdown, (disabled || isLoading) && styles.disabled]}
				placeholderStyle={styles.placeholderStyle}
				selectedTextStyle={styles.selectedTextStyle}
				inputSearchStyle={styles.inputSearchStyle}
				iconStyle={styles.iconStyle}
				data={isLoading ? [] : items}
				search
				maxHeight={300}
				labelField="label"
				valueField="value"
				placeholder={isLoading ? "Loading..." : placeholder}
				searchPlaceholder="Search..."
				value={selectedValue}
				onChange={(item) => onSelect(item.value)}
				disable={disabled || isLoading}
			/>
			{isLoading && (
				<View style={styles.loadingOverlay}>
					<ActivityIndicator size="small" color="#999" />
				</View>
			)}
		</View>
	);
};

export default CDropdownRegionPicker;

const styles = StyleSheet.create({
	dropdown: {
		height: 40,
		borderColor: "#E5E7EB",
		borderWidth: 1,
		borderRadius: 5,
		paddingHorizontal: 5,
		backgroundColor: "#FFF",
	},
	disabled: {
		backgroundColor: "#F3F4F6",
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
	loadingOverlay: {
		position: "absolute",
		top: 10,
		right: 10,
	},
});
