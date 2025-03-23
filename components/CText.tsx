import { StyleSheet } from 'react-native';
import {Text} from "react-native-paper";

const CText = ({ style, weight = 'normal', children, ...props }) => {
	return (
		<Text style={[styles.text, style]} {...props}>
			{children}
		</Text>
	);
};

const styles = StyleSheet.create({
	text: {
		color: '#000',
	},
});

export default CText;