export const ELECTOR_REGISTRATION_START_DATE = 1718668800;
export const API_BASE_URL = "https://www.stae-tl.com/api";
export const AUTH_TOKEN_KEY = "authToken";
export const REFRESH_TOKEN_KEY = "refreshToken";
export const USER_KEY = "userData";
export const CACHE_EXPIRY_TIME = 30 * 60 * 1000;
export const LIST_VERIFICATION_STATUS = [
	{label: "All", value: "ALL"},
	{label: "Verify", value: "VERIFY"},
	{label: "Process", value: "PROSES"},
	{label: "Approve", value: "DISETUJUI"},
	{label: "Disabilities", value: "DISABILITIES"},
	{label: "Double", value: "DOUBLE"},
	{label: "Pending", value: "PENDING"},
]

export const LIST_ELECTOR_STATUS = [
	{ label: "All", value: "ALL" },
	{ label: "Active", value: "AKTIF" },
	{ label: "Deceased", value: "MATI" },
	{ label: "Removed", value: "HAPUS" },
	{ label: "Duplicate", value: "DOUBLE" },
	{ label: "Non-Citizen", value: "ASING" },
	{ label: "Other", value: "LAIN" },
];

export const RECORDS_PER_PAGE_LIST = [
	{ label: "5", value: 5 },
	{ label: "10", value: 10 },
	{ label: "15", value: 15 },
	{ label: "20", value: 20 },
	{ label: "25", value: 25 },
	{ label: "50", value: 50 },
	{ label: "100", value: 100 },
];

export const RECORDS_ORDER_BY_LIST = [
	{ label: "Date", value: 0 },
	{ label: "Name", value: 1 },
	{ label: "Region", value: 2 },
	{ label: "Age", value: 3 },
];

export const RECORDS_DOUBLE_ORDER_BY_LIST = [
	{ label: "Date", value: 0 },
	{ label: "Name", value: 1 },
	{ label: "Code Elector", value: 2 },
	{ label: "Region", value: 3 },
];

export const LIST_ELECTOR_TYPE = [
	{ label: "AR", value: "AR" },
	{ label: "Old", value: "OLD" },
];

export const LIST_ELECTOR_STATUS_PRINT_TYPE = [
	{ label: "Yes", value: "YA" },
	{ label: "No", value: "TIDAK" },
];

export const LIST_ELECTOR_REGISTER_TYPE = [
    { label: "Actualization", value: "AR" },
    { label: "Old", value: "OLD" },
];