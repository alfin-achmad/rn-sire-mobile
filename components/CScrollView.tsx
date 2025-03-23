import React, { useState } from "react";
import { ScrollView, RefreshControl, StyleSheet } from "react-native";
import colors from "@/constants/colors";

const CScrollView = ({ children, onRefresh }) => {
	const [refreshing, setRefreshing] = useState(false);

	const handleRefresh = async () => {
		setRefreshing(true);
		if (onRefresh) {
			await onRefresh();
		}
		setRefreshing(false);
	};

	return (
		<ScrollView
			style={styles.scrollContainer}
			refreshControl={
				<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} colors={[colors.secondary]} />
			}
		>
			{children}
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	scrollContainer: {
		flex: 1,
	},
});

export default CScrollView;
