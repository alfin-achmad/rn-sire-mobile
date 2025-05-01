import {useEffect} from "react";
import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "@/storage/useAuthStore";
import { showToast } from "@/helpers/general";
import {authAPI} from "@/api/internal";

interface SignInParams {
	email: string;
	password: string;
}

export const useAuth = () => {
	const { isAuthenticated, isCheckingAuth, setAuth, signOut, checkAuth, user } = useAuthStore();

	useEffect(() => {
		checkAuth();
	}, []);

	const signInMutation = useMutation({
		mutationFn: async ({ email, password }: SignInParams) => {
			return authAPI.signIn(email, password);
		},
		onSuccess: async (data) => {
			if (data.success) {
				const { accessToken, refreshToken, user } = data;
				await setAuth(user, accessToken)
			} else {
				showToast(data.message || "Sign In failed", "danger");
			}
		},
		onError: (error: any) => {
			const errorMessage =
				error.response?.data?.message || "Sign In failed. Please try again.";
			showToast(errorMessage, "danger");
		},
	});

	return {
		isAuthenticated,
		isCheckingAuth,
		checkAuth,
		signIn: signInMutation.mutate,
		signOut: signOut,
		isLoading: signInMutation.isPending,
		user
	};
};
