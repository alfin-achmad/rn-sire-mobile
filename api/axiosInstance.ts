import axios from "axios";
import {API_BASE_URL, AUTH_TOKEN_KEY} from "@/constants/general";
import {useAuthStore} from "@/storage/useAuthStore";
import {showToast} from "@/helpers/general";
import AsyncStorage from "@react-native-async-storage/async-storage";

const api = axios.create({
	baseURL: API_BASE_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

api.interceptors.request.use(
	async (config) => {
		const token = await AsyncStorage.getItem(AUTH_TOKEN_KEY);
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

api.interceptors.response.use(
	(response) => response,
	async (error) => {
		if (error.response?.status === 401) {
			const { signOut } = useAuthStore.getState();
			await signOut();

			showToast("Session expired. Please sign in again.", "danger");
		}
		return Promise.reject(error);
	}
);

export default api;
