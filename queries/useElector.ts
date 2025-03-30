import {useElectorStore} from "@/storage/useElectorStore";
import {useMutation} from "@tanstack/react-query";
import {dataAPI} from "@/api/internal";
import {showToast} from "@/helpers/general";

const useElector = () => {
	const {params, updateParam, updateParams, setDataByParamKey, data, resetParams, resetFindElectorByID, resetFindElectorByNoReg, resetFindElectorDoubleByID} = useElectorStore();

	const fetchElectorNeedVerify = useMutation({
		mutationFn: async ({ reset = false, byid = false }) => {
			const { findElectorRegister } = params;
			const response = await dataAPI.findElectorRegister(findElectorRegister);
            return { data: response, reset, byid };
		},
		onSuccess: async ({ data, reset, byid }) => {
            setDataByParamKey((byid ?"findElectorRegisterByNoReg":"findElectorRegister"), data, reset)
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
		mutationFn: async ({ reset = false, byid = false }) => {
			const { findElector } = params;
			const response = await dataAPI.findElector(findElector);
			return { data: response, reset, byid };
		},
		onSuccess: async ({ data, reset, byid }) => {
			setDataByParamKey((byid ?"findElectorByID":"findElector"), data, reset)
		},
		onError: (error: any) => {
			const errorMessage =
				error.response?.data?.message || "Fetch data failed. Please try again.";
			showToast(errorMessage, "danger");
		},
	});

	const findDoubleElector = useMutation({
        mutationFn: async ({ reset = false, byid = false }) => {
			const { findDoubleElectorRegister } = params;
			const response = await dataAPI.findDoubleElectorRegister(findDoubleElectorRegister);
            return { data: response, reset, byid };
		},
        onSuccess: async ({ data, reset, byid }) => {
            setDataByParamKey((byid ?"findElectorDoubleID":"findDoubleElectorRegister"), data, reset)
        },
		onError: (error: any) => {
			const errorMessage =
				error.response?.data?.message || "Fetch data failed. Please try again.";
			showToast(errorMessage, "danger");
		},
	});

	return {
		params,
		fetchElectorVerifyList: (reset = false, byid = false) => fetchElectorNeedVerify.mutate({ reset, byid }),
		fetchFindElector: (reset = false, byid = false) => findElector.mutate({ reset, byid }),
		fetchFindDoubleElector: (reset = false, byid = false) => findDoubleElector.mutate({ reset, byid }),
		processVerifyElector: verifyElector.mutate,
		data,
		updateParam,
		updateParams,
		isLoading: fetchElectorNeedVerify.isPending || findElector.isPending || findDoubleElector.isPending,
		resetParams,
        resetFindElectorByID,
        resetFindElectorByNoReg,
        resetFindElectorDoubleByID
	}
}

export default useElector;