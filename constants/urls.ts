const API_BASE_URL = ""

export const API_ENDPOINTS = {}
export const APP_ROUTES = {
	AUTH: {
		SIGN_IN: "/auth/sign-in",
	},
	MAIN: {
		DASHBOARD: "/(tabs)/dashboard",
		ACCOUNT: "/(tabs)/account",
		ACTIVITY: "/(tabs)/activity",
		NOTIFICATION: "/(tabs)/notification",
		SEARCH: "/(tabs)/search",
	},
	DASHBOARD: {
		ELECTOR: "/dashboard/elector",
		VERIFY_ELECTOR: "/dashboard/verify-elector",
		DOUBLE_ELECTOR: "/dashboard/double-elector",
	}
} as const;