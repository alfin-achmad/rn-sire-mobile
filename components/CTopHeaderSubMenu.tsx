import colors from "@/constants/colors";
import { Appbar } from "react-native-paper";
import { router } from "expo-router";

const CTopHeaderSubMenu = ({ title, handlePress }: { title: string; handlePress?: () => void }) => {
	const onBackPress = handlePress || router.back;

	return (
		<Appbar.Header style={{ backgroundColor: "#FFF", height: 54, borderColor: "#E5E7EB", borderWidth: 1 }}>
			<Appbar.BackAction color={colors.secondary} onPress={onBackPress} />
			<Appbar.Content
				title={title}
				titleStyle={{
					color: colors.secondary,
					textAlign: "center",
					fontSize: 18,
					fontFamily: "IBMPlexSans_Bold",
				}}
			/>
			<Appbar.Action icon="home" color="#FFF" />
		</Appbar.Header>
	);
};

export default CTopHeaderSubMenu;
