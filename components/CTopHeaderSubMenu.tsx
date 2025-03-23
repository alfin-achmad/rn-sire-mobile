import colors from "@/constants/colors";
import {Appbar} from "react-native-paper";

const CTopHeaderSubMenu = ({title, handlePress}) => {
	return (
		<Appbar.Header style={{backgroundColor: "#FFF", height: 54, borderColor: "#E5E7EB", borderWidth: 1}}>
			<Appbar.BackAction color={colors.secondary} onPress={handlePress} />
			<Appbar.Content title={title} titleStyle={{color: colors.secondary, textAlign: "center", fontSize: 18, fontFamily: "IBMPlexSans_Bold"}} />
			<Appbar.BackAction color="#FFF" />
		</Appbar.Header>
	)
}

export default CTopHeaderSubMenu