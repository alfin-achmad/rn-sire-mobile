import { useRef, useEffect } from "react";
import { TextInput } from "react-native-paper";

const CTextInput = ({ textValue, setTextValue, ...rest }) => {
	const inputRef = useRef(null);

	useEffect(() => {
		if (inputRef.current) {
			const cursorPosition = inputRef.current.selection?.start || textValue?.length;
			inputRef.current.setNativeProps({ selection: { start: cursorPosition, end: cursorPosition } });
		}
	}, [textValue]);

	return (
		<TextInput
			ref={inputRef}
			value={textValue}
			onChangeText={setTextValue}
			{...rest} // Pass additional props
		/>
	);
};

export default CTextInput;
