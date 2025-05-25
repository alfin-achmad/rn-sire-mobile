import React, {useState, useEffect, useCallback, useRef} from 'react';
import { Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
import colors from "@/constants/colors";

export default function CLocationAddress({
	                                         isRetryGetLocation = false,
	                                         onRetryComplete = () => {},
                                         }) {
	const [address, setAddress] = useState(null);
	const [loading, setLoading] = useState(false);
	const [errorMsg, setErrorMsg] = useState(null);
	const didFirstLoad = useRef(false);

	const fetchAddress = useCallback(async () => {
		setLoading(true);
		setErrorMsg(null);

		try {
			const { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== 'granted') {
				setErrorMsg('Permission denied');
				return;
			}

			const { coords } = await Location.getCurrentPositionAsync({
				accuracy: Location.Accuracy.Highest,
			});
			const [place] = await Location.reverseGeocodeAsync(coords);

			if (place) {
				const full = [
					place.city,
					place.region,
					place.postalCode,
					place.country,
				]
					.filter(Boolean)
					.join(', ');
				setAddress(full);
			} else {
				setErrorMsg('No address found');
			}
		} catch (e) {
			setErrorMsg(e.message);
		} finally {
			setLoading(false);
			onRetryComplete();
		}
	}, [onRetryComplete]);

	useEffect(() => {
		if (!didFirstLoad.current) {
			didFirstLoad.current = true;
			fetchAddress();
		}
	}, [fetchAddress]);

	useEffect(() => {
		if (isRetryGetLocation) {
			fetchAddress();
		}
	}, [isRetryGetLocation, fetchAddress]);

	return (
		<TouchableOpacity
			onPress={fetchAddress}
			className="ml-1"
		>
			{loading && <ActivityIndicator size="small" style={{ transform: [{ scale: 0.8 }] }} />}
			{!loading && address && (
				<Text style={{fontSize: 12, color: colors.secondary, fontFamily: "IBMPlexSans"}}>
					{address}
				</Text>
			)}
			{!loading && errorMsg && (
				<Text style={{fontSize: 12}} className="text-center text-red-500">Failed get connection</Text>
			)}
		</TouchableOpacity>
	);
}
