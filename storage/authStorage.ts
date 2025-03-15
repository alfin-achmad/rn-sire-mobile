import AsyncStorage from "@react-native-async-storage/async-storage";
import { AUTH_TOKEN_KEY, REFRESH_TOKEN_KEY, USER_KEY } from "@/constants/general";

export const getAuthToken = async () => {
	return await AsyncStorage.getItem(AUTH_TOKEN_KEY);
};

export const setAuthToken = async (token: string) => {
	await AsyncStorage.setItem(AUTH_TOKEN_KEY, token);
};

export const removeAuthToken = async () => {
	await AsyncStorage.multiRemove([AUTH_TOKEN_KEY, REFRESH_TOKEN_KEY, USER_KEY]);
};
