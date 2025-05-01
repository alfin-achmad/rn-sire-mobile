import { MMKV } from "react-native-mmkv";

export const storage = new MMKV();

export const useMMKVStore = {
	set: (key: string, value: any) => {
		storage.set(key, JSON.stringify(value));
	},
	get: (key: string) => {
		const value = storage.getString(key);
		return value ? JSON.parse(value) : null;
	},
	remove: (key: string) => {
		storage.delete(key);
	},
};
