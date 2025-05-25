import { Stack } from 'expo-router';

export default function Layout() {
	return (
		<Stack screenOptions={{ headerShown: false }}>
			<Stack.Screen name="region" />
			<Stack.Screen name="age-group" />
			<Stack.Screen name="gender" />
			<Stack.Screen name="elector-type" />
		</Stack>
	);
}
