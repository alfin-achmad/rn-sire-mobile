import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '@/constants/colors';

export default function ChartActions({ onBack, onExport }) {
	const [isProcessing, setIsProcessing] = useState(false);

	const handleExport = async () => {
		setIsProcessing(true);
		try {
			await onExport();
		} finally {
			setIsProcessing(false);
		}
	};

	if (isProcessing) {
		return (
			<View className="mt-4 px-4">
				<ActivityIndicator color={colors.secondary} />
			</View>
		);
	}

	return (
		<View className="flex-row justify-between items-center gap-2 mt-4 px-4">
			<TouchableOpacity
				className="flex-row items-center px-4 py-2 rounded-md"
				onPress={onBack}
				style={{ backgroundColor: colors.secondary }}
			>
				<Ionicons name="arrow-back" size={16} color="#fff" />
				<Text className="text-white font-medium ml-2">Back</Text>
			</TouchableOpacity>

			<TouchableOpacity
				className="flex-row items-center px-4 py-2 rounded-md"
				onPress={handleExport}
				style={{ backgroundColor: colors.red }}
			>
				<Ionicons name="download-outline" size={16} color="#fff" />
				<Text className="text-white font-medium ml-2">Export</Text>
			</TouchableOpacity>
		</View>
	);
}
