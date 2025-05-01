import React, { useEffect } from "react";
import { View } from "react-native";
import { useRegionStore } from "@/storage/useRegionStore";
import CDropdownRegionPicker from "@/components/CDropdownRegionPicker";
import useRegion from "@/queries/useRegion";
import {useAuth} from "@/queries/useAuth";

const CRegionPicker = ({ keyName, getDistrictUser=false, getSubdistrictUser=false }: { keyName: string, getDistrictUser: boolean, getSubdistrictUser: boolean }) => {
	const {user} = useAuth();
	const { data, setSelectedDistrict, setSelectedSubDistrict, setSelectedSucco, setSelectedAldeia } = useRegionStore();
	const { regions, fetchRegions, isLoading } = useRegion(keyName);

	const selectedDistrict = data[keyName]?.selectedDistrict || null;
	const selectedSubDistrict = data[keyName]?.selectedSubDistrict || null;
	const selectedSucco = data[keyName]?.selectedSucco || null;
	const selectedAldeia = data[keyName]?.selectedAldeia || null;

	useEffect(() => {
		if (getDistrictUser && selectedDistrict === null) {
			setSelectedDistrict(keyName, user?.kode_distrik)
		}

		if (getSubdistrictUser && selectedSubDistrict === null) {
			setSelectedSubDistrict(keyName, user?.kode_subdistrik)
		}
	}, [getDistrictUser, user?.kode_distrik, selectedDistrict]);

	useEffect(() => {
		if (regions.length === 0) {
			fetchRegions();
		}
	}, []);

	const districts = regions.filter((r) => r.kode.length === 2).map((r) => ({ label: r.nama, value: r.kode }));
	const subDistricts = regions.filter((r) => r.kode.length === 4 && r.kode.startsWith(selectedDistrict || "")).map((r) => ({ label: r.nama, value: r.kode }));
	const succos = regions.filter((r) => r.kode.length === 6 && r.kode.startsWith(selectedSubDistrict || "")).map((r) => ({ label: r.nama, value: r.kode }));
	const aldeias = regions.filter((r) => r.kode.length === 8 && r.kode.startsWith(selectedSucco || "")).map((r) => ({ label: r.nama, value: r.kode }));

	return (
		<View className="flex flex-col gap-2">
			<View className="flex flex-row gap-2">
				<CDropdownRegionPicker isLoading={isLoading} placeholder="Select District" unique={`${keyName}-district`} items={districts} selectedValue={selectedDistrict} onSelect={(val) => setSelectedDistrict(keyName, val)} disabled={getDistrictUser} />
				<CDropdownRegionPicker isLoading={isLoading} placeholder="Select Sub-District" unique={`${keyName}-subDistrict`} items={subDistricts} selectedValue={selectedSubDistrict} onSelect={(val) => setSelectedSubDistrict(keyName, val)} disabled={!selectedDistrict || getSubdistrictUser} />
			</View>
			<View className="flex flex-row gap-2">
				<CDropdownRegionPicker isLoading={isLoading} placeholder="Select Succo" unique={`${keyName}-succo`} items={succos} selectedValue={selectedSucco} onSelect={(val) => setSelectedSucco(keyName, val)} disabled={!selectedSubDistrict} />
				<CDropdownRegionPicker isLoading={isLoading} placeholder="Select Aldeia" unique={`${keyName}-aldeia`} items={aldeias} selectedValue={selectedAldeia} onSelect={(val) => setSelectedAldeia(keyName, val)} disabled={!selectedSucco} />
			</View>
		</View>
	);
};

export default CRegionPicker;
