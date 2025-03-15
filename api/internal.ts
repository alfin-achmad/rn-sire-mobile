import api from "./axiosInstance"

export const signIn = async (kodeUser, password) => {
	const response = await api.post("/auth/login", {
		kodeUser, password
	});

	return response.data;
};