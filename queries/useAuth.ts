import { useMutation, useQueryClient } from "@tanstack/react-query";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";
import api from "@/api/axiosInstance";
import { AUTH_TOKEN_KEY, REFRESH_TOKEN_KEY, USER_KEY } from "@/constants/general";
import {showToast} from "@/helpers/general";

export const useAuth = () => {
	const queryClient = useQueryClient();
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isCheckingAuth, setIsCheckingAuth] = useState(true); // Add this state

	useEffect(() => {
		const checkAuth = async () => {
			const token = await AsyncStorage.getItem(AUTH_TOKEN_KEY);
			setIsAuthenticated(!!token);
			setIsCheckingAuth(false);
		};

		checkAuth();
	}, []);

	const signInMutation = useMutation({
		mutationFn: async ({ email, password }) => {
			const response = await api.post("/auth/login", { email, password });
			return response.data;
		},
		onSuccess: async (data) => {
			if (data.success) {
				await AsyncStorage.setItem(AUTH_TOKEN_KEY, data.accessToken);
				await AsyncStorage.setItem(REFRESH_TOKEN_KEY, data.refreshToken);
				await AsyncStorage.setItem(USER_KEY, JSON.stringify(data.user));

				queryClient.setQueryData(["user"], data.user);
				setIsAuthenticated(true);
			}
		},
		onError: (error) => {
			showToast(`Login failed: ${error}`, "danger");
		},
	});

	const signOut = async () => {
		await AsyncStorage.multiRemove([AUTH_TOKEN_KEY, REFRESH_TOKEN_KEY, USER_KEY]);
		queryClient.removeQueries(["user"]);
		setIsAuthenticated(false);
	};

	return {
		signIn: signInMutation.mutate,
		signOut,
		isAuthenticated,
		isCheckingAuth,
		isLoading: signInMutation.isPending,
	};
};
