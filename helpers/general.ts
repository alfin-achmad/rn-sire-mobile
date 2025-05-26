import { showMessage } from "react-native-flash-message";
import colors from "@/constants/colors";

export const capitalizeWords = (text: string): string => {
	if (!text) return '';
	return text
		.split(' ')
		.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
		.join(' ');
};


export function formatNumber(
	number: number,
	digits: number = 0,
	locale: string = "en-US",
	options: Intl.NumberFormatOptions = {}
) {
	const mergedOptions: Intl.NumberFormatOptions = {
		minimumFractionDigits: digits,
		maximumFractionDigits: digits,
		...options,
	};

	return new Intl.NumberFormat(locale, mergedOptions).format(number);
}

export function formatCurrency(amount, currency = "USD", locale = "en-US") {
	return new Intl.NumberFormat(locale, {
		style: "currency",
		currency,
		minimumFractionDigits: 0,
	}).format(amount);
}

export function formatPercentage(value, locale = "en-US") {
	return new Intl.NumberFormat(locale, {
		style: "percent",
		minimumFractionDigits: 2,
	}).format(value);
}

export function showToast(message, type = "success", duration = 3000, position = "top") {
	showMessage({
		message,
		type,
		position,
		duration,
		backgroundColor: getMessageColor(type),
		color: "#fff",
	});
}

export function generateAvatarInitialName(name) {
	return name
		.split(' ')
		.map(word => word.charAt(0).toUpperCase())
		.join('');
}

export function generateAvatarUrl(name, background = '275dad', color = 'ffffff') {
	const formattedName = name?.split(' ').join('+');
	return `https://ui-avatars.com/api/?name=${formattedName}&background=${background}&color=${color}`;
}

export function getLocationName(data) {
	const locationParts = [];

	if (data?.nama_distrik) locationParts.push(data.nama_distrik);
	if (data?.nama_subdistrik) locationParts.push(data.nama_subdistrik);
	if (data?.nama_suko) locationParts.push(data.nama_suko);
	if (data?.nama_aldeia) locationParts.push(data.nama_aldeia);

	return locationParts.join(' -> ') || 'All';
}

export function calculatePercentage(part, total){
	return total > 0 ? parseFloat(((part / total) * 100).toFixed(2)) : 0;
}

export function formatDistrictName(districtName) {
	if (!districtName) return "Total National";

	const lowerCaseName = districtName.toLowerCase();

	if (lowerCaseName === "all") {
		return "Total National";
	}

	return `Total Municipiu ${lowerCaseName.replace(/^\w/, (c) => c.toUpperCase())}`;
}

export function detectInputType(text){
	return /^\d+$/.test(text) ? "Numeric" : "String";
}

export function categorizeRegions(data, groupBy='DALAM NEGERI', selectedDistrict='ALL') {
	const regions = {};

	data.forEach(item => {
		if (!item.dpsa || typeof item.dpsa !== "string") return;
		if (item.kelompok !== groupBy) return; // Filter only "DALAM NEGERI"

		const levels = item.dpsa.split(" - ");
		const code = item.kode || "";

		if (levels.length > 0) {
			const districtName = levels[0];
			if (!regions[districtName]) {
				regions[districtName] = { code: code.substring(0, 2), subDistricts: {} };
			}

			if (levels.length > 1) {
				const subDistrictName = levels[1];
				if (!regions[districtName].subDistricts[subDistrictName]) {
					regions[districtName].subDistricts[subDistrictName] = { code: code.substring(0, 4), villages: {} };
				}

				if (levels.length > 2) {
					const villageName = levels[2];
					if (!regions[districtName].subDistricts[subDistrictName].villages[villageName]) {
						regions[districtName].subDistricts[subDistrictName].villages[villageName] = { code, subVillages: [] };
					}

					if (levels.length > 3) {
						const subVillageName = levels[3];
						regions[districtName].subDistricts[subDistrictName].villages[villageName].subVillages.push({
							code,
							name: subVillageName,
						});
					}
				}
			}
		}
	});

	let sortedRegions = Object.keys(regions)
		.sort((a, b) => a.localeCompare(b))
		.reduce((acc, key) => {
			acc[key] = regions[key];
			return acc;
		}, {});

	if (selectedDistrict !== 'ALL') {
		sortedRegions = Object.keys(regions)
			.filter(key => regions[key].code === selectedDistrict)
			.sort((a, b) => a.localeCompare(b))
			.reduce((acc, key) => {
				acc[key] = regions[key];
				return acc;
			}, {});
	}

	return sortedRegions;
}

export function reformatCodeElector(num){
	return String(num).padStart(9, "0")
}

export function randomColor() {
	return `#${Math.floor(Math.random()*0xFFFFFF).toString(16).padStart(6,'0')}`;
}

export function colorPalette() {
	return [
		'#e14f50', '#3c9fde', '#a7d12f', '#f1a93b', '#8e3bd1',
		'#2fb1a3', '#d1324f', '#3bd18e', '#de5c3c', '#b1d12f',
		'#4f3cde', '#d18e3b', '#3cd14f', '#de3c5c', '#a32fb1',
		'#1f7ad1', '#d13b7a', '#3bd17a', '#7a3bd1', '#d17a3b',
		'#3ad18e',
	];
}

export function getMaxField(records, fieldName = 'value') {
	if (!Array.isArray(records) || records.length === 0) {
		return 0;
	}
	return records.reduce((max, rec) => {
		let raw = rec[fieldName];
		let num = typeof raw === 'number'
			? raw
			: (typeof raw === 'string' ? parseFloat(raw) || 0 : 0);
		return num > max ? num : max;
	}, 0);
}

function getMessageColor(typeMessage) {
	switch (typeMessage) {
		case "success":
		case "info":
			return colors.secondary;
		case "danger":
			return colors.red;
		case "warning":
			return colors.darker3;
		default:
			return colors.secondary;
	}
}