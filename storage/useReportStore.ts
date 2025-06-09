import { create } from "zustand/index";
import {formatDate, getFirstDateOfMonth, registrationStartDate} from "@/helpers/formatDate";

type ReportStore = {
	paramChartbyDistrict: { date01: string; date02: string };
	paramChartbyDate: { date: string };
	paramChartbyMonth: { date: string };
	paramRegionRecap: {
		prgroup: number;
		prindex: number;
		prbahasa: number;
		prkode_distrik: string;
		prkode_subdistrik: string;
		prkode_suko: string;
		prkode_aldeia: string;
		prtanggal1: string;
		prtanggal2: string;
		prparameter1: number;
		prusia1: number;
		praktualisasi: string;
		p_page_number: number;
		p_rows_per_page: number;
	};
	paramRegionAgeRecap: {
		prgroup: number;
		prindex: number;
		prbahasa: number;
		prkode_distrik: string;
		prkode_subdistrik: string;
		prkode_suko: string;
		prkode_aldeia: string;
		prtanggal1: string;
		prtanggal2: string;
		praktualisasi: string;
		p_page_number: number;
		p_rows_per_page: number;
	}
	paramRegionDisabilityRecap: {
		prgroup: number;
		prindex: number;
		prbahasa: number;
		prkode_distrik: string;
		prkode_subdistrik: string;
		prkode_suko: string;
		prkode_aldeia: string;
		prtanggal1: string;
		prparameter1: number;
		prusia1: number;
		p_page_number: number;
		p_rows_per_page: number;
	}

	setParams: <K extends keyof ReportStore>(
		chartKey: K,
		params: ReportStore[K]
	) => void;
	setDate01: (date: string) => void;
	setDate02: (date: string) => void;
	setData: (newData: object) => void;
	setDataByKey: (key: string, value: any) => void;

	// new individual resetters
	resetParamChartbyDistrict: () => void;
	resetParamChartbyDate: () => void;
	resetParamChartbyMonth: () => void;
	// reset everything
	resetAllParams: () => void;

	// state
	date01: string;
	date02: string;
	codeDistrict: string;
	data: object;
};

export const useReportStore = create<ReportStore>((set) => ({
	// initial state
	paramChartbyDistrict: {
		date01: formatDate(),
		date02: formatDate(),
	},
	paramChartbyDate: {
		date: formatDate(),
	},
	paramChartbyMonth: {
		date: formatDate(),
	},
	paramRegionRecap: {
		prgroup: 1,
		prindex: 0,
		prbahasa: 1,
		prkode_distrik: "ALL",
		prkode_subdistrik: "ALL",
		prkode_suko: "ALL",
		prkode_aldeia: "ALL",
		prtanggal1: "ALL",
		prtanggal2: formatDate(),
		prparameter1: 0,
		prusia1: 0,
		praktualisasi: "ALL",
		p_page_number: 1,
		p_rows_per_page: 99999
	},
	paramRegionAgeRecap: {
		prgroup: 1,
		prindex: 0,
		prbahasa: 1,
		prkode_distrik: "ALL",
		prkode_subdistrik: "ALL",
		prkode_suko: "ALL",
		prkode_aldeia: "ALL",
		prtanggal1: "ALL",
		prtanggal2: formatDate(),
		praktualisasi: "ALL",
		p_page_number: 1,
		p_rows_per_page: 99999
	},
	paramRegionDisabilityRecap: {
		prgroup: 1,
		prindex: 0,
		prbahasa: 1,
		prkode_distrik: "ALL",
		prkode_subdistrik: "ALL",
		prkode_suko: "ALL",
		prkode_aldeia: "ALL",
		prtanggal1: formatDate(),
		prparameter1: 0,
		prusia1: 0,
		p_page_number: 1,
		p_rows_per_page: 50
	},
	date01: formatDate(),
	date02: formatDate(),
	codeDistrict: "ALL",
	data: {},

	// setters
	setDate01: (date) => set({ date01: date }),
	setDate02: (date) => set({ date02: date }),
	setData: (newData) => set({ data: newData }),
	setDataByKey: (key, value) =>
		set((state) => ({ data: { ...state.data, [key]: value } })),
	setParams: (chartKey, params) =>
		set((state) => ({ [chartKey]: { ...(state as any)[chartKey], ...(params as any) } })),

	resetParamChartbyDistrict: () =>
		set({
			paramChartbyDistrict: {
				date01: formatDate(),
				date02: formatDate(),
			},
		}),

	resetParamChartbyDate: () =>
		set({
			paramChartbyDate: {
				date: formatDate(),
			},
		}),

	resetParamChartbyMonth: () =>
		set({
			paramChartbyMonth: {
				date: formatDate(),
			},
		}),

	resetAllParams: () =>
		set({
			paramChartbyDistrict: {
				date01: formatDate(),
				date02: formatDate(),
			},
			paramChartbyDate: {
				date: formatDate(),
			},
			paramChartbyMonth: {
				date: formatDate(),
			},
			paramRegionRecap: {
				prgroup: 1,
				prindex: 0,
				prbahasa: 1,
				prkode_distrik: "ALL",
				prkode_subdistrik: "ALL",
				prkode_suko: "ALL",
				prkode_aldeia: "ALL",
				prtanggal1: "ALL",
				prtanggal2: formatDate(),
				prparameter1: 0,
				prusia1: 0,
				praktualisasi: "ALL",
				p_page_number: 1,
				p_rows_per_page: 99999
			},
			paramRegionAgeRecap: {
				prgroup: 1,
				prindex: 0,
				prbahasa: 1,
				prkode_distrik: "ALL",
				prkode_subdistrik: "ALL",
				prkode_suko: "ALL",
				prkode_aldeia: "ALL",
				prtanggal1: formatDate(),
				prtanggal2: formatDate(),
				praktualisasi: "ALL",
				p_page_number: 1,
				p_rows_per_page: 99999
			},
			paramRegionDisabilityRecap: {
				prgroup: 1,
				prindex: 0,
				prbahasa: 1,
				prkode_distrik: "ALL",
				prkode_subdistrik: "ALL",
				prkode_suko: "ALL",
				prkode_aldeia: "ALL",
				prtanggal1: formatDate(),
				prparameter1: 0,
				prusia1: 0,
				p_page_number: 1,
				p_rows_per_page: 50
			}
		}),
}));
