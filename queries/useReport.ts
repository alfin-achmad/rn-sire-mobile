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
	const {codeDistrict, setDataByKey, data, paramChartbyDistrict, paramChartbyDate, paramChartbyMonth, paramRegionRecap, setParams, resetAllParams, resetParamChartbyDistrict, resetParamChartbyMonth, resetParamChartbyDate} = useReportStore();

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

	useFocusEffect(
		useCallback(() => {
			if (!didFirstFetch.current) {
				didFirstFetch.current = true;
				fetchChartByDistrict.mutate({ codeDistrict });
				fetchChartByDate.mutate({ codeDistrict });
				fetchChartByMonth.mutate({ codeDistrict });
				fetchRegionRecap.mutate();
			}
		}, [fetchChartByDistrict, fetchChartByDate, fetchChartByMonth, fetchRegionRecap, codeDistrict])
	);

	return {
		codeDistrict, setParams, paramChartbyDistrict, paramChartbyDate, paramChartbyMonth, paramRegionRecap,
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
		isLoadingRegionRecap: fetchRegionRecap.isPending,
		isLoadingChartByDistrict: fetchChartByDistrict.isPending,
		isLoadingChartByDate: fetchChartByDate.isPending,
		isLoadingChartByMonth: fetchChartByMonth.isPending,
		isLoading: fetchChartByDistrict.isPending || fetchChartByDate.isPending || fetchChartByMonth.isPending || fetchRegionRecap.isPending,
		data,
		resetAllParams, resetParamChartbyDistrict, resetParamChartbyDate, resetParamChartbyMonth
	}
};

export default useReport;