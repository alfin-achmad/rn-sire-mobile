import {useElectorStore} from "@/storage/useElectorStore";
import {useMutation} from "@tanstack/react-query";
import {dataAPI} from "@/api/internal";
import {showToast} from "@/helpers/general";

const useElector = () => {
	const {params, updateParam, updateParams, setDataByParamKey, data, resetParams} = useElectorStore();

	const fetchElectorNeedVerify = useMutation({
		mutationFn: async ({ reset = false }) => {
			const { findElectorRegister } = params;
			const response = await dataAPI.findElectorRegister(findElectorRegister);
			return { data: response, reset };
		},
		onSuccess: async ({ data, reset }) => {
			setDataByParamKey("findElectorRegister", data, reset)
		},
		onError: (error: any) => {
			const errorMessage =
				error.response?.data?.message || "Fetch data failed. Please try again.";
			showToast(errorMessage, "danger");
		},
	});

	const verifyElector = useMutation({
		mutationFn: async () => {
			const { verifyElectorRegister } = params;
			return await dataAPI.verifyElector(verifyElectorRegister);
		},
		onSuccess: async ({ data}) => {
			setDataByParamKey("verifyElectorRegister", data, true)
		},
		onError: (error: any) => {
			console.log(error);
			const errorMessage =
				error.response?.data?.message || "Process verify failed. Please try again.";
			showToast(errorMessage, "danger");
		},
	});

	const findElector = useMutation({
		mutationFn: async ({ reset = false }) => {
			const { findElector } = params;
			const response = await dataAPI.findElector(findElector);
			return { data: response, reset };
		},
		onSuccess: async ({ data, reset }) => {
			setDataByParamKey("findElector", data, reset)
		},
		onError: (error: any) => {
			const errorMessage =
				error.response?.data?.message || "Fetch data failed. Please try again.";
			showToast(errorMessage, "danger");
		},
	});

	const findDoubleElector = useMutation({
		mutationFn: async ({ reset = false }) => {
			const { findDoubleElectorRegister } = params;
			const response = await dataAPI.findDoubleElectorRegister(findDoubleElectorRegister);
			return { data: response, reset };
		},
		onSuccess: async ({ data, reset }) => {
			setDataByParamKey("findDoubleElectorRegister", data, reset)
		},
		onError: (error: any) => {
			const errorMessage =
				error.response?.data?.message || "Fetch data failed. Please try again.";
			showToast(errorMessage, "danger");
		},
	});

	return {
		params,
		fetchElectorVerifyList: (reset = false) => fetchElectorNeedVerify.mutate({ reset }),
		fetchFindElector: (reset = false) => findElector.mutate({ reset }),
		fetchFindDoubleElector: (reset = false) => findDoubleElector.mutate({ reset }),
		processVerifyElector: verifyElector.mutate,
		data,
		updateParam,
		updateParams,
		isLoading: fetchElectorNeedVerify.isPending || findElector.isPending || findDoubleElector.isPending,
		resetParams
	}
}

export default useElector;