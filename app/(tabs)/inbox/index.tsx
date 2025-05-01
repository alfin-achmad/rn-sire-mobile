import CTopHeader from "@/components/CTopHeader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CTabMenu from "@/components/CTabMenu";
import { TabView, SceneMap } from 'react-native-tab-view';
import InboxActivityScreen from "@/app/(tabs)/inbox/activity";
import InboxNotificationScreen from "@/app/(tabs)/inbox/notification";
import React, {useCallback, useEffect, useState} from "react";
import {TouchableOpacity, View, Animated} from "react-native";
import {Text} from "react-native-paper";
import colors from "@/constants/colors";
import {useFocusEffect} from "expo-router";

const InboxScreen = () => {
	const [indexTab, setIndexTab] = useState(0);
	const [routesTab] = useState([
		{ key: 'activity', title: 'Activities' },
		{ key: 'notification', title: 'Notifications' },
	]);

	const renderTabScene = SceneMap({
		activity: InboxActivityScreen,
		notification: InboxNotificationScreen,
	});

	const renderTabBar = (props) => {
		const inputRange = props.navigationState.routes.map((x, i) => i);

		return (
			<View className="flex-row bg-white" style={{ borderBottomWidth: 2, borderColor: "#E5E7EB" }}>
				{props.navigationState.routes.map((route, i) => {
					const opacity = props.position.interpolate({
						inputRange,
						outputRange: inputRange.map((inputIndex) =>
							inputIndex === i ? 1 : 0.5
						),
					});

					return (
						<TouchableOpacity
							key={i}
							className="flex-1 justify-center items-center p-3"
							style={[
								i === 0 ? { borderRightWidth: 1, borderColor: "#E5E7EB" } : undefined,
							]}
							onPress={() => setIndexTab(i)}
						>
							<Animated.Text style={{color: colors.secondary, fontFamily: "IBMPlexSans_Bold", opacity: opacity}}>{route.title}</Animated.Text>
						</TouchableOpacity>
					);
				})}
			</View>
		)
	}

	useFocusEffect(
		useCallback(() => {
			setIndexTab(0)
		}, [])
	)

	const handleAction = {
		onPress: async () => {
			try {
				await AsyncStorage.clear();
				console.log("Storage cleared!");
			} catch (error) {
				console.error("Error clearing storage:", error);
			}
		}
	}

	return (
		<>
			<CTopHeader useBorderBottom={false} />
			<TabView
				navigationState={{ index: indexTab, routes: routesTab }}
				renderScene={renderTabScene}
				renderTabBar={renderTabBar}
				onIndexChange={setIndexTab}
				initialLayout={{ width: 100 }}
				className="bg-blue-950"
			/>
		</>
	)
}

export default InboxScreen