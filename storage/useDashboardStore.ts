import {create} from "zustand/index";
import {formatDate, getFirstDateOfMonth} from "@/helpers/formatDate";

type DashboardStoreState = {
	date01: string,
	date02: string,
	codeDistrict: string,
	data: object,
	setData: (newData: object) => void;
	setDataByKey: (key: string, value: any) => void;
	resetDates: () => void;
	setDate01: (date: string) => void;
	setDate02: (date: string) => void;
};

export const useDashboardStore = create<DashboardStoreState>((set) => ({
	date01: formatDate(getFirstDateOfMonth()),
	date02: formatDate(),
	codeDistrict: "",
	data: {},

	setDate01: (date) => set({ date01: date }),
	setDate02: (date) => set({ date02: date }),
	setData: (newData) => set({ data: newData }),
	resetDates: () => set({ date01: formatDate(getFirstDateOfMonth()), date02: formatDate() }),
	setDataByKey: (key, value) =>
		set((state) => ({
			data: {
				...state.data,
				[key]: value,
			},
		})),
}));