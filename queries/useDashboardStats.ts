import {useDashboardStore} from "@/storage/useDashboardStore";
import {useMutation} from "@tanstack/react-query";
import {dataAPI} from "@/api/internal";
import {calculatePercentage, showToast} from "@/helpers/general";

interface FetchInputParams {
	date01: string;
	date02: string;
	codeDistrict: string;
}

interface FetchInputThisYearParams {
	date: string;
}

const useDashboardStats = () => {
	const {date01, date02, codeDistrict, setDataByKey, data, setDate01, setDate02, resetDates} = useDashboardStore();

	const fetchInputMutation = useMutation({
		mutationFn: async ({ codeDistrict }: FetchInputParams) => {
			const params = {
				prtg01: date01,
				prtg02: date02,
				prdistrik: codeDistrict
			}
			return dataAPI.input(params)
		},
		onSuccess: async (data) => {
			if (data) {
				const result = data[0];
				const mappedData = {
					total: {
						man: result["NAKTUAL_PRIA"] + result["NREGIST_PRIA"],
						woman: result["NAKTUAL_WANITA"] + result["NREGIST_WANITA"],
						total: (result["NAKTUAL_PRIA"] + result["NREGIST_PRIA"]) + (result["NAKTUAL_WANITA"] + result["NREGIST_WANITA"]),
						percentMan: calculatePercentage(
							result["NAKTUAL_PRIA"] + result["NREGIST_PRIA"],
							(result["NAKTUAL_PRIA"] + result["NREGIST_PRIA"]) + (result["NAKTUAL_WANITA"] + result["NREGIST_WANITA"])
						),
						percentWoman: calculatePercentage(
							result["NAKTUAL_WANITA"] + result["NREGIST_WANITA"],
							(result["NAKTUAL_PRIA"] + result["NREGIST_PRIA"]) + (result["NAKTUAL_WANITA"] + result["NREGIST_WANITA"])
						),
					},
					existing: {
						man: result["TOTAL_PRIA_2014"],
						woman: result["TOTAL_WANITA_2014"],
						total: result["TOTAL_2014"],
						percentMan: calculatePercentage(result["TOTAL_PRIA_2014"], result["TOTAL_2014"]),
						percentWoman: calculatePercentage(result["TOTAL_WANITA_2014"], result["TOTAL_2014"]),
					},
					actualization: {
						man: result["NAKTUAL_PRIA"],
						woman: result["NAKTUAL_WANITA"],
						total: result["NAKTUAL"],
						percentTotal: calculatePercentage(result["NAKTUAL"], result["TOTAL_2014"]),
						percentMan: calculatePercentage(result["NAKTUAL_PRIA"], result["NAKTUAL_SUDAH"]),
						percentWoman: calculatePercentage(result["NAKTUAL_WANITA"], result["NAKTUAL_SUDAH"]),
					},
					outstanding: {
						man: result["SISA_PRIA"],
						woman: result["SISA_WANITA"],
						total: result["SISA_TOTAL"],
						percentTotal: calculatePercentage(result["SISA_TOTAL"], result["TOTAL_2014"]),
						percentMan: calculatePercentage(result["SISA_PRIA"], result["SISA_TOTAL"]),
						percentWoman: calculatePercentage(result["SISA_WANITA"], result["SISA_TOTAL"]),
					},
					registration: {
						man: result["NREGIST_PRIA"],
						woman: result["NREGIST_WANITA"],
						total: result["NREGIST"],
						percentMan: calculatePercentage(result["NREGIST_PRIA"], result["NREGIST_SUDAH"]),
						percentWoman: calculatePercentage(result["NREGIST_WANITA"], result["NREGIST_SUDAH"]),
					}
				}
				setDataByKey("input", mappedData)
			} else {
				showToast(data.message || "Fetch data failed", "danger");
			}
		},
		onError: (error: any) => {
			const errorMessage =
				error.response?.data?.message || "Fetch data failed. Please try again.";
			showToast(errorMessage, "danger");
		},
	});

	const fetchInputThisYearMutation = useMutation({
		mutationFn: async ({ date }: FetchInputThisYearParams) => {
			const params = {
				prtgl: date,
			}
			return dataAPI.inputThisYear(params)
		},
		onSuccess: async (data) => {},
		onError: (error: any) => {
			const errorMessage =
				error.response?.data?.message || "Fetch data failed. Please try again.";
			showToast(errorMessage, "danger");
		},
	});

	return {
		date01, date02, codeDistrict,
		setDate01, setDate02, resetDates,
		fetchInput: fetchInputMutation.mutate,
		fetchInputThisYear: fetchInputThisYearMutation.mutate,
		isLoading: fetchInputMutation.isPending || fetchInputThisYearMutation.isPending,
		data
	}
}

export default useDashboardStats;