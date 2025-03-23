import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AUTH_TOKEN_KEY, USER_KEY } from "@/constants/general";
import {router} from "expo-router";
import {APP_ROUTES} from "@/constants/urls";

type AuthState = {
	isAuthenticated: boolean;
	isCheckingAuth: boolean;
	user: any | null;
	setAuth: (user: any, token: string) => Promise<void>;
	signOut: () => Promise<void>;
	checkAuth: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
	isAuthenticated: false,
	isCheckingAuth: true,
	user: null,

	setAuth: async (user, token) => {
		await AsyncStorage.setItem(AUTH_TOKEN_KEY, token);
		await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
		set({ isAuthenticated: true, user });
	},

	signOut: async () => {
		await AsyncStorage.removeItem(AUTH_TOKEN_KEY);
		await AsyncStorage.removeItem(USER_KEY);
		await AsyncStorage.clear();
		set({ isAuthenticated: false, user: null });

		router.replace("/")
	},

	checkAuth: async () => {
		const token = await AsyncStorage.getItem(AUTH_TOKEN_KEY);
		const userData = await AsyncStorage.getItem(USER_KEY);

		if (token && userData) {
			set({ isAuthenticated: true, user: JSON.parse(userData) });
		} else {
			set({ isAuthenticated: false, user: null });
		}

		set({ isCheckingAuth: false });
	},
}));
