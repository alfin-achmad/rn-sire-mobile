import { useEffect, useState } from "react";
import { generateAvatarUrl } from "@/helpers/general";
import { dataAPI } from "@/api/internal";
import { ActivityIndicator, Image, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import colors from "@/constants/colors";
import {CACHE_EXPIRY_TIME} from "@/constants/general";

const CAvatar = ({
	                 no,
	                 name,
	                 urlBy,
	                 width = 56,
	                 height = 80,
	                 borderClass = "border-blue-950" // default
                 }) => {
	const [avatarUri, setAvatarUri] = useState(null);
	const [loading, setLoading] = useState(true);
	const { fetchPhotoBase64 } = dataAPI;
	const cacheKey = `avatar_${urlBy}_${no}`;

	useEffect(() => {
		const loadAvatar = async () => {
			try {
				const params = urlBy === "byreg" ? { noPendaftaran: no } : { kodeElektor: no };
				const response = await fetchPhotoBase64(params, urlBy);

				let newAvatarUri = generateAvatarUrl(name);
				if (response?.data?.photo) {
					newAvatarUri = `data:image/png;base64,${response.data.photo}`;
				}

				setAvatarUri(newAvatarUri);
			} catch (error) {
				console.error("Error fetching avatar:", error);
				setAvatarUri(generateAvatarUrl(name));
			} finally {
				setLoading(false);
			}
		};

		loadAvatar();
	}, [no, name, urlBy]);

	return (
		<View className="justify-center items-center" style={{ width, height }}>
			{loading ? (
				<ActivityIndicator size="small" color={colors.secondary} />
			) : (
				<Image
					key={avatarUri}
					source={{ uri: avatarUri }}
					className={`border rounded-md ${borderClass}`}
					style={{ width, height }}
				/>
			)}
		</View>
	);
};

export default CAvatar;
