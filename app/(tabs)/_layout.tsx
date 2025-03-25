import {router, Tabs} from "expo-router";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import {TouchableOpacity, View} from "react-native";
import { useTheme } from "react-native-paper";
import colors from "@/constants/colors";
import {APP_ROUTES} from "@/constants/urls";

export default function TabsLayout() {
	const theme = useTheme();

	return (
		<Tabs
			screenOptions={{
				headerShown: false,
				tabBarActiveTintColor: colors.secondary,
				tabBarStyle: { backgroundColor: "#FFF", borderTopWidth: 1, borderTopColor: "#E5E7EB" },
			}}
		>
			<Tabs.Screen
				name="dashboard"
				options={{
					title: "Home",
					tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />,
				}}
			/>
			<Tabs.Screen
				name="activity"
				options={{
					title: "Activity",
					tabBarIcon: ({ color, size }) => <Ionicons name="list-outline" size={size} color={color} />,
				}}
			/>
			{/* QR Code Scan Icon - Bigger & Floating */}
			<Tabs.Screen
				name="search"
				options={{
					title: "Search by QR",
					tabBarIcon: ({ color }) => (
						<TouchableOpacity onPress={() => router.push(APP_ROUTES.MAIN.SEARCH_BY_QR)}>
							<View
								style={{
									width: 50,
									height: 50,
									backgroundColor: colors.quaternary,
									borderRadius: 10,
									justifyContent: "center",
									alignItems: "center",
									marginBottom: 30,
									shadowColor: "#000",
									shadowOpacity: 0.2,
									shadowRadius: 5,
									elevation: 5,
								}}
							>
								<MaterialCommunityIcons name="qrcode-scan" size={30} color="#fff" />
							</View>
						</TouchableOpacity>
					),
				}}
			/>
			<Tabs.Screen
				name="notification"
				options={{
					title: "Notifications",
					tabBarIcon: ({ color, size }) => <Ionicons name="notifications-outline" size={size} color={color} />,
				}}
			/>
			<Tabs.Screen
				name="account"
				options={{
					title: "Account",
					tabBarIcon: ({ color, size }) => <Ionicons name="person-outline" size={size} color={color} />,
				}}
			/>
		</Tabs>
	);
}
