import { useMutation } from "@tanstack/react-query";
import { dataAPI } from "@/api/internal";
import { showToast } from "@/helpers/general";
import { useRegionStore } from "@/storage/useRegionStore";

const useRegion = (keyName: string) => {
	const { setRegions, data, resetRegion } = useRegionStore();
	const regions = data[keyName]?.regions || [];

	const fetchRegions = useMutation({
		mutationFn: async () => {
			const response = await dataAPI.fetchRegions();
			return response.filter((region) => region.kelompok === "DALAM NEGERI")
				.sort((a, b) => a.nama.localeCompare(b.nama));
		},
		onSuccess: (regions) => {
			setRegions(keyName, regions);
		},
		onError: (error: any) => {
			const errorMessage = error.response?.data?.message || "Failed to fetch regions.";
			showToast(errorMessage, "danger");
		},
	});

	return {
		regions, resetRegions: resetRegion,
		selectedRegions: {
			district: data[keyName]?.selectedDistrict || "",
			subdistrict: data[keyName]?.selectedSubDistrict || "",
			succo: data[keyName]?.selectedSucco || "",
			aldeia: data[keyName]?.selectedAldeia || "",
		},
		fetchRegions: fetchRegions.mutate,
		isLoading: fetchRegions.isPending,
	};
};

export default useRegion;
