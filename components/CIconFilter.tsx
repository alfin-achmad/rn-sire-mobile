import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '@/constants/colors';

export default function CIconFilter({
	                                    onPress,
																			icon = 'options',
	                                    size = 14,
	                                    backgroundColor = colors.secondary,
																			borderColor = '#172554',
																			borderRadius = 3,
	                                    iconColor = '#FFF',
	                                    style,
                                    }) {
	return (
		<TouchableOpacity
			onPress={onPress}
			className="p-0.5 border"
			style={[
				{
					backgroundColor,
					borderRadius,
					borderColor,
				},
				style,
			]}
		>
			<Ionicons name={icon} size={size} color={iconColor} />
		</TouchableOpacity>
	);
}
