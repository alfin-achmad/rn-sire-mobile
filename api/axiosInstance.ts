import axios from "axios";
import { API_BASE_URL } from "@/constants/general";
import { getAuthToken, removeAuthToken } from "@/storage/authStorage";

const api = axios.create({
	baseURL: API_BASE_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

api.interceptors.request.use(async (config) => {
	const token = await getAuthToken();
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

api.interceptors.response.use(
	(response) => response,
	async (error) => {
		if (error.response?.status === 401) {
			await removeAuthToken();
		}
		return Promise.reject(error);
	}
);

export default api;
