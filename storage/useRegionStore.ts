import { create } from "zustand";

type RegionData = {
	regions: any[];
	selectedDistrict?: string | null;
	selectedSubDistrict?: string | null;
	selectedSucco?: string | null;
	selectedAldeia?: string | null;
};

type RegionStore = {
	data: Record<string, RegionData>;
	setRegions: (key: string, regions: any[]) => void;
	setSelectedDistrict: (key: string, district: string | null) => void;
	setSelectedSubDistrict: (key: string, subDistrict: string | null) => void;
	setSelectedSucco: (key: string, succo: string | null) => void;
	setSelectedAldeia: (key: string, aldeia: string | null) => void;
	resetRegion: (key: string) => void;
};

export const useRegionStore = create<RegionStore>((set) => ({
	data: {},

	setRegions: (key, regions) =>
		set((state) => ({
			data: {
				...state.data,
				[key]: { regions, selectedDistrict: null, selectedSubDistrict: null, selectedSucco: null, selectedAldeia: null },
			},
		})),

	setSelectedDistrict: (key, district) =>
		set((state) => ({
			data: {
				...state.data,
				[key]: { ...state.data[key], selectedDistrict: district, selectedSubDistrict: null, selectedSucco: null, selectedAldeia: null },
			},
		})),

	setSelectedSubDistrict: (key, subDistrict) =>
		set((state) => ({
			data: {
				...state.data,
				[key]: { ...state.data[key], selectedSubDistrict: subDistrict, selectedSucco: null, selectedAldeia: null },
			},
		})),

	setSelectedSucco: (key, succo) =>
		set((state) => ({
			data: {
				...state.data,
				[key]: { ...state.data[key], selectedSucco: succo, selectedAldeia: null },
			},
		})),

	setSelectedAldeia: (key, aldeia) =>
		set((state) => ({
			data: {
				...state.data,
				[key]: { ...state.data[key], selectedAldeia: aldeia },
			},
		})),

	resetRegion: (key) =>
		set((state) => ({
			data: {
				...state.data,
				[key]: { ...state.data[key], selectedDistrict: null, selectedSubDistrict: null, selectedSucco: null, selectedAldeia: null },
			},
		})),
}));
