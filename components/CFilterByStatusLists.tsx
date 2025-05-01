import { ScrollView, View } from "react-native";
import { Chip } from "react-native-paper";
import colors from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";

const CFilterByStatusLists = ({ statusLists, selectedVerificationType, setSelectedVerificationType, isDisabled = false }) => {
	const handleAction = {
		onSelectedFilter: (value) => {
			if (!isDisabled) {
				setSelectedVerificationType(value);
			}
		}
	};

	return (
		<View
			className="px-4 bg-blue"
			style={{
				opacity: isDisabled ? 0.5 : 1,
				pointerEvents: isDisabled ? "none" : "auto",
			}}
		>
			<ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 5 }}>
				{statusLists.map((item, index) => {
					const isSelected = selectedVerificationType === item.value;

					return (
						<Chip
							key={index}
							mode="outlined"
							selected={isSelected}
							onPress={() => handleAction.onSelectedFilter(item.value)}
							style={{
								borderRadius: 5,
								backgroundColor: isSelected ? "#1E3A8A" : colors.secondary,
								borderColor: "#1E3A8A",
								height: 30
							}}
							textStyle={{ color: "#FFF", fontFamily: "IBMPlexSans", lineHeight: 16 }}
							icon={isSelected ? () => <Ionicons name="checkmark" size={16} color="white" /> : undefined}
						>
							{item.label}
						</Chip>
					);
				})}
			</ScrollView>
		</View>
	);
};

export default CFilterByStatusLists;
