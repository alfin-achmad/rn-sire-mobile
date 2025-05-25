import { useEffect } from "react";
import { BackHandler } from "react-native";

export function useBackRedirect(onBackPress?: () => boolean) {
	useEffect(() => {
		const subscription = BackHandler.addEventListener("hardwareBackPress", () => {
			if (onBackPress) {
				return onBackPress();
			}
			return true; // block default back action by default
		});

		return () => subscription.remove();
	}, [onBackPress]);
}
