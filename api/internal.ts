import api from "./axiosInstance";
import {API_ENDPOINTS} from "@/constants/urls";

export const authAPI = {
	signIn: async (email: string, password: string) => {
		const response = await api.post(API_ENDPOINTS.SIGN_IN, {
			kodeUser: email,
			password,
		});
		return response.data;
	},
};

export const dataAPI = {
	input: async (data) => {
		try {
			const response = await api.post("/package-info/rekap-input", data);

			return response.data;
		} catch (error) {
			console.log("Error fetching:", error);
			throw error;
		}
	},
	inputThisYear: async (data) => {
		try {
			const response = await api.post("/package-info/proses-tahunini", data);

			return response.data;
		} catch (error) {
			console.log("Error fetching:", error);
			throw error;
		}
	},
	findElectorRegister: async (data: any) => {
		try {
			const response = await api.post("/package-info/cari-pendaftaran", data);

			return response.data;
		} catch (error) {
			console.log("Error fetching:", error);
			throw error;
		}
	},
	findDoubleElectorRegister: async (data: any) => {
		try {
			const response = await api.post("/package-info/elektor-double", data);

			return response.data;
		} catch (error) {
			console.log("Error fetching:", error);
			throw error;
		}
	},
	findElector: async (data) => {
		try {
			const response = await api.post("/package-info/cari-elektor", data);

			return response.data;
		} catch (error) {
			console.log("Error fetching:", error);
			throw error;
		}
	},
	fetchRegions: async () => {
		try {
			const response = await api.post("/vdsca-dev");

			return response.data;
		} catch (error) {
			console.log("Error fetching:", error);
			throw error;
		}
	},
	fetchPhotoBase64: async (data: any, urlBy="byelector") => {
		try {
			const urlList = {
				"byelector": "/elektor-photo/find",
				"byelector2014": "/elektor-photo/find2014",
				"byreg": "/elektor-photo/find-pendaftaran",
			}
			const url = urlList[urlBy];
			const response = await api.post(url, data);

			return response.data;
		} catch (error) {
			console.log("Error fetching:", error);
			throw error;
		}
	},
	fetchFingerBase64: async (data: any, urlBy="byelector") => {
		try {
			const urlList = {
				"byelector": "/elektor-finger/find",
				"byelector2014": "/elektor-finger/find2014",
				"byreg": "/elektor-finger/find-pendaftaran",
			}
			const url = urlList[urlBy];
			const response = await api.post(url, data);

			return response.data;
		} catch (error) {
			console.log("Error fetching:", error);
			throw error;
		}
	},
	fetchSignBase64: async (data, urlBy="byelector") => {
		try {
			const urlList = {
				"byelector": "/elektor-sign/find",
				"byelector2014": "/elektor-sign/find2014",
				"byreg": "/elektor-sign/find-pendaftaran",
			}
			const url = urlList[urlBy];
			const response = await api.post(url, data);

			return response.data;
		} catch (error) {
			console.log("Error fetching:", error);
			throw error;
		}
	},
	verifyElector: async (data) => {
		try {
			const response = await api.post("/package-pendaftaran/prioritas", data);

			return response.data;
		} catch (error) {
			console.log("Error fetching:", error);
			throw error;
		}
	},
	outstandingElector: async (data) => {
		try {
			const response = await api.post("/package-info/proses-sisa", data);

			return response.data;
		} catch (error) {
			console.log("Error fetching:", error);
			throw error;
		}
	},
	reportChartByDistrict: async (data) => {
		try {
			const response = await api.post("/package-info/hasil-input", data);

			return response.data;
		} catch (error) {
			console.log("Error fetching:", error);
			throw error;
		}
	},
	reportChartByDate: async (data) => {
		try {
			const response = await api.post("/package-info/proses-bulanini", data);

			return response.data;
		} catch (error) {
			console.log("Error fetching:", error);
			throw error;
		}
	},
	reportChartByMonth: async (data) => {
		try {
			const response = await api.post("/package-info/proses-tahunini", data);

			return response.data;
		} catch (error) {
			console.log("Error fetching:", error);
			throw error;
		}
	},
	reportRegionRecap: async (data) => {
		try {
			const response = await api.post("/package-laporan/elektor-wilayah-rekap", data);

			return response.data;
		} catch (error) {
			console.log("Error fetching:", error);
			throw error;
		}
	},
	reportRegionAgeRecap: async (data) => {
		try {
			const response = await api.post("/package-laporan/elektor-wilayah-rekap-umur", data);

			return response.data;
		} catch (error) {
			console.log("Error fetching:", error);
			throw error;
		}
	},
	reportRegionDisability: async (data) => {
		try {
			const response = await api.post("/package-laporan/elektor-cacat-rekap", data);

			return response.data;
		} catch (error) {
			console.log("Error fetching:", error);
			throw error;
		}
	},
}
