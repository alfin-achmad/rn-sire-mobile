const API_BASE_URL = ""

export const API_ENDPOINTS = {
	SIGN_IN: '/auth/login',
}
export const APP_ROUTES = {
	AUTH: {
		SIGN_IN: "/auth/sign-in",
	},
	MAIN: {
		DASHBOARD: "/(tabs)/dashboard",
		ACCOUNT: "/(tabs)/account",
		ACTIVITY: "/(tabs)/activity",
		NOTIFICATION: "/(tabs)/notification",
		SEARCH_BY_QR: "/(modals)/qrcode-scanner",
	},
	DASHBOARD: {
		ELECTOR: "/dashboard/electors",
		ELECTOR_FILTER_MODAL: "/dashboard/electors/filter-modal",
		VERIFY_ELECTOR: "/dashboard/verify-elector",
		DOUBLE_ELECTOR: "/dashboard/double-elector",
		INACTIVE_ELECTOR: "/dashboard/inactive-elector",
		USERS: "/dashboard/users",
		REGIONS: "/dashboard/regions",
		COUNTRIES: "/dashboard/countries",
		CARD: "/dashboard/card",
	}
} as const;