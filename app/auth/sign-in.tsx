import { useRouter } from "expo-router";
import * as Device from 'expo-device';
import {ActivityIndicator, Dimensions, Image, SafeAreaView, Text as BasicText} from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, View } from "react-native";
import { APP_ROUTES } from "@/constants/urls";
import CAuthHeader from "@/components/CAuthHeader";
import colors from "@/constants/colors";
import {useEffect, useState} from "react";
import CAuthFooter from "@/components/CAuthFooter";
import {showToast} from "@/helpers/general";
import {useAuth} from "@/queries/useAuth";
import useDashboardStats from "@/queries/useDashboardStats";

const { height, width } = Dimensions.get("window");
const isSmallScreen = width < 380;

const SignInScreen = () => {
	const router = useRouter();
	const {isLoading, isAuthenticated, signIn: processSignIn} = useAuth();
	const {resetDates} = useDashboardStats();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [secureTextEntry, setSecureTextEntry] = useState(true);

	const handleAction = {
		touchableNative: () => Keyboard.dismiss(),
		signIn: () => {
			if (!email) return showToast("Please enter a valid email", "danger");
			if (!password) return showToast("Please enter a valid password", "danger");
			processSignIn({ email, password });
		},
	};

	useEffect(() => {
		if (isAuthenticated) {
			router.replace(APP_ROUTES.MAIN.DASHBOARD);
		}
	}, [isAuthenticated]);

	return (
		<TouchableWithoutFeedback onPress={handleAction.touchableNative}>
			<SafeAreaView className="flex-1 bg-white">
				<KeyboardAvoidingView
					className="flex-1 p-6"
					keyboardVerticalOffset={100}
				>
					<CAuthHeader />

					<View className={`flex-1 items-center justify-center w-full ${isSmallScreen ? "mt-20" : ""}`}>
						<Image
							source={require("@/assets/image/bg-signin-2.jpg")}
							style={{ width: "100%", height: "100%", resizeMode: "contain" }}
						/>
					</View>

					<View className="pb-0">
						<TextInput
							textContentType="none"
							importantForAutofill="no"
							autoComplete="off"
							label="Email / No. Elector"
							mode="outlined"
							keyboardType="email-address"
							autoCapitalize="none"
							left={<TextInput.Icon icon="account-box-outline" />}
							style={[
								{ backgroundColor: "#FFF", color: "#000" },
								isLoading && { opacity: 1 },
							]}
							onChangeText={setEmail}
							editable={!isLoading}
						/>
						<TextInput
							textContentType="none"
							importantForAutofill="no"
							autoComplete="off"
							label="Password"
							mode="outlined"
							autoCapitalize="none"
							value={password}
							secureTextEntry={secureTextEntry}
							onChangeText={setPassword}
							left={<TextInput.Icon icon="key" />}
							right={
								<TextInput.Icon
									disabled={isLoading}
									icon={secureTextEntry ? "eye-off" : "eye"}
									onPress={() => setSecureTextEntry(!secureTextEntry)}
								/>
							}
							style={[
								{ backgroundColor: "#FFF", color: "#000" },
								isLoading && { opacity: 1 },
							]}
							editable={!isLoading}
						/>
						<Button
							labelStyle={{
								fontSize: 16,
								fontWeight: "bold",
								paddingVertical: 8,
								fontFamily: "IBMPlexSans_Bold",
								color: "#FFF"
							}}
							style={{
								marginTop: 10,
								borderRadius: 5,
								backgroundColor: colors.secondary,
							}}
							mode="contained"
							onPress={handleAction.signIn}
							disabled={isLoading}
						>
							{isLoading ? <ActivityIndicator size="small" color="#FFF" /> : "Sign In"}
						</Button>
						<BasicText
							className="mt-2.5 text-center"
							style={{
								fontSize: 15,
								fontFamily: "IBMPlexSans_Bold",
								color: colors.secondary,
							}}
						>
							Forgot Password ?
						</BasicText>
						<View className="flex-row justify-center mt-5">
							<Text style={{ fontSize: 14, fontFamily: "IBMPlexSans", color: colors.secondary }}>
								Don't have an account?{" "}
							</Text>
							<Text style={{ fontSize: 14, fontFamily: "IBMPlexSans_Bold", color: colors.secondary }}>
								Register
							</Text>
						</View>
					</View>
				</KeyboardAvoidingView>
				<CAuthFooter />
			</SafeAreaView>
		</TouchableWithoutFeedback>
	);
};

export default SignInScreen;
