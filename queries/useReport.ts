import {useDashboardStore} from "@/storage/useDashboardStore";
import {useMutation} from "@tanstack/react-query";
import {dataAPI} from "@/api/internal";
import {colorPalette, showToast} from "@/helpers/general";
import {useReportStore} from "@/storage/useReportStore";
import {useCallback, useRef} from "react";
import {useFocusEffect} from "expo-router";
import {getMonthAbbrev} from "@/helpers/formatDate";

interface FetchInputParams {
	codeDistrict: string;
}

const useReport = () => {
	const {codeDistrict, setDataByKey, data, paramChartbyDistrict, paramChartbyDate, paramChartbyMonth, paramRegionRecap, paramRegionDisabilityRecap, paramRegionAgeRecap, setParams, resetAllParams, resetParamChartbyDistrict, resetParamChartbyMonth, resetParamChartbyDate} = useReportStore();

	const didFirstFetch = useRef(false);
	const fetchChartByDistrict = useMutation({
		mutationFn: async ({ codeDistrict }: FetchInputParams) => {
			const params = {
				prtg01: paramChartbyDistrict?.date01,
				prtg02: paramChartbyDistrict?.date01,
				prdistrik: codeDistrict
			}
			return dataAPI.reportChartByDistrict(params)
		},
		onSuccess: async (data) => {
			if (data) {
				const colorFromPalette = colorPalette();
				const rawData = data?.map((d: any,i: any) => ({
					value: d.NTOTAL,
					label: d.INISIAL,
					frontColor: colorFromPalette[i % colorFromPalette.length],
				}));
				setDataByKey("reportChartByDistrict", rawData)
			}
		},
		onError: (error: any) => {
			const errorMessage =
				error.response?.data?.message || "Fetch data failed. Please try again.";
			showToast(errorMessage, "danger");
		},
	});

	const fetchChartByDate = useMutation({
		mutationFn: async ({ codeDistrict }: FetchInputParams) => {
			const params = {
				prtgl: paramChartbyDate?.date,
				prdistrik: codeDistrict
			}
			return dataAPI.reportChartByDate(params)
		},
		onSuccess: async (data) => {
			if (data) {
				const rawData = data?.map((d: any) => ({
					value: d.TOTAL,
					label: d.TG,
					dataPointText: `${d.TOTAL}`,
				}));
				setDataByKey("reportChartByDate", rawData)
			}
		},
		onError: (error: any) => {
			const errorMessage =
				error.response?.data?.message || "Fetch data failed. Please try again.";
			showToast(errorMessage, "danger");
		},
	});

	const fetchChartByMonth = useMutation({
		mutationFn: async ({ codeDistrict }: FetchInputParams) => {
			const params = {
				prtgl: paramChartbyMonth?.date,
				prdistrik: codeDistrict
			}
			return dataAPI.reportChartByMonth(params)
		},
		onSuccess: async (data) => {
			if (data) {
				const colorFromPalette = colorPalette();
				const rawData = data?.map((d: any,i: any) => ({
					value: d.NPROSES,
					label: getMonthAbbrev((d.BULAN).trimEnd()),
					frontColor: colorFromPalette[i % colorFromPalette.length],
				}));
				setDataByKey("reportChartByMonth", rawData)
			}
		},
		onError: (error: any) => {
			const errorMessage =
				error.response?.data?.message || "Fetch data failed. Please try again.";
			showToast(errorMessage, "danger");
		},
	});

	const fetchRegionRecap = useMutation({
		mutationFn: async () => {
			return dataAPI.reportRegionRecap(paramRegionRecap)
		},
		onSuccess: async (data) => {
			if (data) {
				const resultRecap = { NATIONAL: { man: 0, woman: 0, total: 0 }, DIASPORA: { man: 0, woman: 0, total: 0 }, ALL: { man: 0, woman: 0, total: 0 } };
				const dataRecap = data?.data;

				dataRecap.forEach(item => {
					const group = item.KELOMPOK.includes("NATIONAL") ? "NATIONAL" : "DIASPORA";
					resultRecap[group].man += item.TOTAL_PRIA;
					resultRecap[group].woman += item.TOTAL_WANITA;
				});

				resultRecap.NATIONAL.total = resultRecap.NATIONAL.man + resultRecap.NATIONAL.woman;
				resultRecap.DIASPORA.total = resultRecap.DIASPORA.man + resultRecap.DIASPORA.woman;

				resultRecap.ALL = {
					man: resultRecap.NATIONAL.man + resultRecap.DIASPORA.man,
					woman: resultRecap.NATIONAL.woman + resultRecap.DIASPORA.woman,
					total: resultRecap.NATIONAL.total + resultRecap.DIASPORA.total
				};

				setDataByKey("reportRegionRecap", dataRecap);
				setDataByKey("reportRegionSummaryRecap", resultRecap);
			}

		},
		onError: (error: any) => {
			console.log(error);
			const errorMessage =
				error.response?.data?.message || "Fetch data failed. Please try again.";
			showToast(errorMessage, "danger");
		},
	});

	const fetchRegionAgeRecap = useMutation({
		mutationFn: async () => {
			return dataAPI.reportRegionAgeRecap(paramRegionAgeRecap)
		},
		onSuccess: async (data) => {
			if (data) {
				const ageGroups = {
					"16": { total: "U16UP", man: "U16UP_MANE", woman: "U16UP_FETO" },
					"17-34": { total: "U1734UP", man: "U1734UP_MANE", woman: "U1734UP_FETO" },
					"35-59": { total: "U3559UP", man: "U3559UP_MANE", woman: "U3559UP_FETO" },
					">60": { total: "U60UP", man: "U60UP_MANE", woman: "U60UP_FETO" },
				};

				const resultRecap = {
					NATIONAL: {},
					DIASPORA: {},
					ALL: {},
				};

				Object.keys(ageGroups).forEach(age => {
					resultRecap.NATIONAL[age] = { man: 0, woman: 0, total: 0 };
					resultRecap.DIASPORA[age] = { man: 0, woman: 0, total: 0 };
					resultRecap.ALL[age] = { man: 0, woman: 0, total: 0 };
				});

				const dataRecap = data?.data;
				dataRecap.forEach(item => {
					const group = item.KELOMPOK.includes("NATIONAL") ? "NATIONAL" : "DIASPORA";

					Object.entries(ageGroups).forEach(([ageKey, fields]) => {
						const manCount = Number(item[fields.man]) || 0;
						const womanCount = Number(item[fields.woman]) || 0;
						const totalCount = Number(item[fields.total]) || manCount + womanCount;

						resultRecap[group][ageKey].man += manCount;
						resultRecap[group][ageKey].woman += womanCount;
						resultRecap[group][ageKey].total += totalCount;
					});
				});

				Object.keys(ageGroups).forEach(age => {
					resultRecap.ALL[age].man = resultRecap.NATIONAL[age].man + resultRecap.DIASPORA[age].man;
					resultRecap.ALL[age].woman = resultRecap.NATIONAL[age].woman + resultRecap.DIASPORA[age].woman;
					resultRecap.ALL[age].total = resultRecap.NATIONAL[age].total + resultRecap.DIASPORA[age].total;
				});

				const newDataRecap = dataRecap.reduce((acc, item) => {
					let groupName = item.KELOMPOK;
					if (groupName === "1.NATIONAL") groupName = "national";
					else if (groupName === "2.DIASPORA") groupName = "diaspora";

					if (!acc[groupName]) {
						acc[groupName] = [];
					}
					acc[groupName].push(item);

					if (!acc["all"]) {
						acc["all"] = [];
					}
					acc["all"].push(item);

					return acc;
				}, {});

				setDataByKey("reportRegionAgeRecap", newDataRecap);
				setDataByKey("reportRegionAgeSummaryRecap", resultRecap);
			}

		},
		onError: (error: any) => {
			console.log(error);
			const errorMessage =
				error.response?.data?.message || "Fetch data failed. Please try again.";
			showToast(errorMessage, "danger");
		},
	});

	const fetchRegionDisabilityRecap = useMutation({
		mutationFn: async () => {
			return dataAPI.reportRegionDisability(paramRegionDisabilityRecap)
		},
		onSuccess: async (data) => {
			if (data) {
				const resultRecap = {
					NATIONAL: { matan: 0, tilun: 0, fisico: 0, mental: 0, seluk: 0 },
					DIASPORA: { matan: 0, tilun: 0, fisico: 0, mental: 0, seluk: 0 },
					ALL: { matan: 0, tilun: 0, fisico: 0, mental: 0, seluk: 0 },
				};

				const dataRecap = data?.data;

				dataRecap.forEach(item => {
					const group = item?.KELOMPOK.includes("NATIONAL") ? "NATIONAL" : "DIASPORA";
					resultRecap[group].matan += item?.TOTAL_MATAN;
					resultRecap[group].tilun += item?.TOTAL_TILUN;
					resultRecap[group].fisico += item?.TOTAL_FISICO;
					resultRecap[group].mental += item?.TOTAL_MENTAL;
					resultRecap[group].seluk += item?.TOTAL_SELUK;
				});

				resultRecap.NATIONAL.total = resultRecap.NATIONAL.matan + resultRecap.NATIONAL.tilun + resultRecap.NATIONAL.fisico + resultRecap.NATIONAL.mental + resultRecap.NATIONAL.seluk;
				resultRecap.DIASPORA.total = resultRecap.DIASPORA.matan + resultRecap.DIASPORA.tilun + resultRecap.DIASPORA.fisico + resultRecap.DIASPORA.mental + resultRecap.DIASPORA.seluk;

				resultRecap.ALL = {
					matan: resultRecap.NATIONAL.matan + resultRecap.DIASPORA.matan,
					tilun: resultRecap.NATIONAL.tilun + resultRecap.DIASPORA.tilun,
					fisico: resultRecap.NATIONAL.fisico + resultRecap.DIASPORA.fisico,
					mental: resultRecap.NATIONAL.mental + resultRecap.DIASPORA.mental,
					seluk: resultRecap.NATIONAL.seluk + resultRecap.DIASPORA.seluk,
				};

				setDataByKey("reportRegionDisabilityRecap", dataRecap);
				setDataByKey("reportRegionDisabilitySummaryRecap", resultRecap);
			}

		},
		onError: (error: any) => {
			console.log(error);
			const errorMessage =
				error.response?.data?.message || "Fetch data failed. Please try again.";
			showToast(errorMessage, "danger");
		},
	});

	useFocusEffect(
		useCallback(() => {
			if (!didFirstFetch.current) {
				didFirstFetch.current = true;
				fetchChartByDistrict.mutate({ codeDistrict });
				fetchChartByDate.mutate({ codeDistrict });
				fetchChartByMonth.mutate({ codeDistrict });
				fetchRegionRecap.mutate();
				fetchRegionAgeRecap.mutate();
				fetchRegionDisabilityRecap.mutate();
			}
		}, [fetchChartByDistrict, fetchChartByDate, fetchChartByMonth, fetchRegionRecap, fetchRegionAgeRecap, fetchRegionDisabilityRecap, codeDistrict])
	);

	return {
		codeDistrict, setParams, paramChartbyDistrict, paramChartbyDate, paramChartbyMonth,
		fetchChartByDistrict: (district?: string) => fetchChartByDistrict.mutate({
			codeDistrict: district ?? codeDistrict,
		}),
		fetchChartByDate: (district?: string) => fetchChartByDate.mutate({
			codeDistrict: district ?? codeDistrict,
		}),
		fetchChartByMonth: (district?: string) => fetchChartByMonth.mutate({
			codeDistrict: district ?? codeDistrict,
		}),
		refetch: (district?: string) => {
			fetchChartByDistrict.mutate({
				codeDistrict: district ?? codeDistrict,
			});

			fetchChartByDate.mutate({
				codeDistrict: district ?? codeDistrict,
			});

			fetchChartByMonth.mutate({
				codeDistrict: district ?? codeDistrict,
			});
		},
		fetchRegionRecap: () => fetchRegionRecap.mutate(),
		fetchRegionAgeRecap: () => fetchRegionAgeRecap.mutate(),
		fetchRegionDisabilityRecap: () => fetchRegionDisabilityRecap.mutate(),
		isLoadingRegionRecap: fetchRegionRecap.isPending,
		isLoadingRegionAgeRecap: fetchRegionAgeRecap.isPending,
		isLoadingRegionDisabilityRecap: fetchRegionDisabilityRecap.isPending,
		isLoadingChartByDistrict: fetchChartByDistrict.isPending,
		isLoadingChartByDate: fetchChartByDate.isPending,
		isLoadingChartByMonth: fetchChartByMonth.isPending,
		isLoading: fetchChartByDistrict.isPending || fetchChartByDate.isPending || fetchChartByMonth.isPending || fetchRegionRecap.isPending || fetchRegionAgeRecap.isPending || fetchRegionDisabilityRecap.isPending,
		data,
		resetAllParams, resetParamChartbyDistrict, resetParamChartbyDate, resetParamChartbyMonth, paramRegionAgeRecap, paramRegionRecap, paramRegionDisabilityRecap
	}
};

export default useReport;