import { router, Tabs } from "expo-router";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity, View, Text } from "react-native";
import { useTheme } from "react-native-paper";
import colors from "@/constants/colors";
import { APP_ROUTES } from "@/constants/urls";

export default function TabsLayout() {
	const theme = useTheme();
	const unreadCount = 0; // Example count, you can dynamically update this based on your data

	return (
		<Tabs
			screenOptions={{
				headerShown: false,
				tabBarActiveTintColor: colors.secondary,
				tabBarStyle: { backgroundColor: "#FFF", borderTopWidth: 1, borderTopColor: "#E5E7EB", height: 55, paddingTop: 2 },
			}}
		>
			<Tabs.Screen
				name="dashboard"
				options={{
					title: "Dashboard",
					tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />,
				}}
			/>
			<Tabs.Screen
				name="reports"
				options={{
					title: "Reports",
					tabBarIcon: ({ color, size }) => <Ionicons name="card" size={size} color={color} />,
				}}
			/>
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
									borderRadius: 8,
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
				name="inbox"
				options={{
					title: "Inbox",
					tabBarIcon: ({ color, size }) => (
						<View style={{ position: "relative" }}>
							<Ionicons name="mail-unread" size={size} color={color} />
							{unreadCount > 0 && (
								<View
									style={{
										position: "absolute",
										top: -5,
										right: -5,
										width: 18,
										height: 18,
										backgroundColor: "red",
										borderRadius: 9,
										justifyContent: "center",
										alignItems: "center",
									}}
								>
									<Text style={{ color: "#fff", fontSize: 12, fontWeight: "bold" }}>
										{unreadCount}
									</Text>
								</View>
							)}
						</View>
					),
				}}
			/>
			<Tabs.Screen
				name="account"
				options={{
					title: "Account",
					tabBarIcon: ({ color, size }) => <Ionicons name="person" size={size} color={color} />,
				}}
			/>
		</Tabs>
	);
}
