import {useRouter} from "expo-router";
import {Text as BasicText} from "react-native";
import {Button, Text, TextInput} from "react-native-paper";
import {Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, View} from "react-native";
import {APP_ROUTES} from "@/constants/urls";
import CAuthHeader from "@/components/CAuthHeader";
import colors from "@/constants/colors";
import {useState} from "react";
import CAuthFooter from "@/components/CAuthFooter";

const SignInScreen = () => {
	const router = useRouter()
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [secureTextEntry, setSecureTextEntry] = useState(true);

	const handleAction = {
		touchableNative: () => Keyboard.dismiss(),
		signIn: () => {
			return router.replace(APP_ROUTES.MAIN.DASHBOARD)
		},
	}

	return (
		<TouchableWithoutFeedback onPress={() => handleAction.touchableNative()}>
			<KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{backgroundColor: "#FCF7F8"}} className="p-6 flex-1 justify-center">
				<CAuthHeader />
				<TextInput
					textContentType="none"
					importantForAutofill="no"
					autoComplete="off"
					label="Email / No. Elector"
					mode="outlined"
					keyboardType="email-address"
					autoCapitalize="none"
					left={
						<TextInput.Icon icon="account-box-outline" />
					}
					className="mb-1"
				/>
				<TextInput
					textContentType="none"
					importantForAutofill="no"
					autoComplete="off"
					label="Password"
					mode="outlined"
					keyboardType="password"
					autoCapitalize="none"
					value={password}
					secureTextEntry={secureTextEntry}
					onChangeText={setPassword}
					left={
						<TextInput.Icon icon="key" />
					}
					right={
						<TextInput.Icon
							icon={secureTextEntry ? "eye-off": "eye"}
							onPress={() => setSecureTextEntry(!secureTextEntry)}
						/>
					}
				/>
				<Button
					labelStyle={{fontSize: 16, fontWeight: "bold", paddingVertical: 8, fontFamily: "IBMPlexSans_Bold"}}
					style={{marginTop: 10, borderRadius: 5, backgroundColor: colors.secondary}}
					mode="contained"
				>
					Sign in
				</Button>
				<BasicText className="text-sm mt-2.5 text-center" style={{fontFamily: "IBMPlexSans_Bold", color: colors.secondary}}>
					Forgot Password
				</BasicText>
				<View className="flex-row justify-center mt-5">
					<Text style={{fontSize: 14, fontFamily: "IBMPlexSans", color: colors.secondary}}>Don't have an account? </Text>
					<Text style={{fontSize: 14, fontFamily: "IBMPlexSans_Bold", color: colors.secondary}}>Register</Text>
				</View>

				<CAuthFooter />
			</KeyboardAvoidingView>
		</TouchableWithoutFeedback>
	)
}
export default SignInScreen