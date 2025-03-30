import { create } from "zustand/index";
import {formatDate, getFirstDateOfMonth} from "@/helpers/formatDate";

type ElectorStoreState = {
	params: {
		findElectorRegister: Record<string, any>;
		findDoubleElectorRegister: Record<string, any>;
		verifyElectorRegister: Record<string, any>;
		findElector: Record<string, any>;
	};
	data: {
		findElectorRegister: any;
		findDoubleElectorRegister: any;
		verifyElectorRegister: any;
		findElector: any;
		findElectorByID: any;
        findElectorRegisterByNoReg: any;
        findElectorDoubleID: any;
	};
	updateParam: (paramKey: keyof ElectorStoreState["params"], key: string, value: any) => void;
	updateParams: (paramKey: keyof ElectorStoreState["params"], newParams: Partial<ElectorStoreState["params"][keyof ElectorStoreState["params"]]>) => void;
	setDataByParamKey: (paramKey: keyof ElectorStoreState["data"], value: any, reset: boolean) => void;
	resetParams: () => void;
    resetFindElectorByID: () => void;
    resetFindElectorByNoReg: () => void;
    resetFindElectorDoubleID: () => void;
};

const initialParams = {
	findElectorRegister: {
		prtg01: formatDate(getFirstDateOfMonth()),
		prtg02: formatDate(),
		prnopendaftaran: "ALL",
		prurut: 1,
		prkdelektor: "ALL",
		prnama: "ALL",
		prtglahir: "ALL",
		prnmayah: "ALL",
		prnmibu: "ALL",
		prdistrik: "ALL",
		prsubdistrik: "ALL",
		prsuku: "ALL",
		praldeia: "ALL",
		prstatus: "ALL",
		prsts_ar: "",
		prsts_verif: "ALL",
		prcetak: "TIDAK",
		pruser_input: "ALL",
		prorder: 1,
		p_page_number: 1,
		p_rows_per_page: 10,
	},
	findDoubleElectorRegister: {
		prtg01: formatDate(getFirstDateOfMonth()),
		prtg02: formatDate(),
		prkdelektor: "ALL",
		prnama: "ALL",
		prdistrik: "ALL",
		prsubdistrik: "ALL",
		prsuku: "ALL",
		praldeia: "ALL",
		prorder: 0,
		prsts_ar: "ALL",
		p_page_number: 1,
		p_rows_per_page: 10,
	},
	verifyElectorRegister: {
		noPendaftaran: "",
		urut: 0,
		prioritas: 0,
		prkodeUser: "",
	},
	findElector: {
		prkdelektor: "",
		prnama: "",
		prtglahir: "",
		prnmayah: "",
		prnmibu: "",
		prdistrik: "",
		prsubdistrik: "",
		prsuku: "",
		praldeia: "",
		prstatus: "",
		prsts_ar: "",
		prorder: 1,
		p_page_number: 1,
		p_rows_per_page: 10
	}
};

export const useElectorStore = create<ElectorStoreState>((set) => ({
	params: initialParams,

	data: {
		findElectorRegister: null,
		findDoubleElectorRegister: null,
		verifyElectorRegister: null,
		findElector: null,
        findElectorByID: null,
        findElectorRegisterByNoReg: null,
	},

	updateParam: (paramKey, key, value) =>
		set((state) => ({
			params: {
				...state.params,
				[paramKey]: {
					...state.params[paramKey],
					[key]: value,
				},
			},
		})),

	setDataByParamKey: (paramKey, value, reset = false) =>
		set((state) => ({
			data: {
				...state.data,
				[paramKey]: {
					...value,
					rows: reset
						? value.rows
						: state.data[paramKey]?.rows
							? [...state.data[paramKey].rows, ...value.rows]
							: value.rows,
				},
			},
		})),

	updateParams: (paramKey: keyof ElectorStoreState["params"], newParams: Record<string, any>) =>
		set((state) => ({
			params: {
				...state.params,
				[paramKey]: {
					...state.params[paramKey],
					...newParams,
				},
			},
		})),

    resetFindElectorByID: () =>
        set((state) => ({
            data: {
                ...state.data,
                findElectorByID: null,
            },
        })),

    resetFindElectorByNoReg: () =>
        set((state) => ({
            data: {
                ...state.data,
                findElectorRegisterByNoReg: null,
            },
        })),

    resetFindElectorDoubleByID: () =>
        set((state) => ({
            data: {
                ...state.data,
                resetFindElectorDoubleID: null,
            },
        })),

	resetParams: () =>
		set({
			params: initialParams,
			data: {
				findElectorRegister: null,
				findDoubleElectorRegister: null,
				verifyElectorRegister: null,
				findElector: null,
                findElectorByID: null,
                findElectorRegisterByNoReg: null,
                findElectorDoubleID: null,
			},
		}),
}));
