import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {router} from "expo-router";
import {APP_ROUTES} from "@/constants/urls";

export default function QRCodeScannerScreen() {
	const [facing, setFacing] = useState<CameraType>('back');
	const [permission, requestPermission] = useCameraPermissions();

	if (!permission) {
		return <View />;
	}

	if (!permission.granted) {
		return (
			<View style={styles.container}>
				<Text style={styles.message}>We need your permission to show the camera</Text>
				<Button onPress={requestPermission} title="grant permission" />
			</View>
		);
	}

	const handleAction = {
		onBarcodeScanned: async (e) => {
			const {type, data} = e
			router.push({pathname: `/dashboard/electors/${data}`, params: {electorData: data, fromScreen: APP_ROUTES.MAIN.SEARCH_BY_QR}})
		}
	}

	return (
		<View className="flex-1 justify-center">
			<CameraView style={styles.camera} facing={facing} barcodeScannerSettings={{barcodeTypes: ["qr", "code128", "ean13", "upc_e"]}} onBarcodeScanned={(e) => handleAction.onBarcodeScanned(e)} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
	},
	message: {
		textAlign: 'center',
		paddingBottom: 10,
	},
	camera: {
		flex: 1,
	},
	buttonContainer: {
		flex: 1,
		flexDirection: 'row',
		backgroundColor: 'transparent',
		margin: 64,
	},
	button: {
		flex: 1,
		alignSelf: 'flex-end',
		alignItems: 'center',
	},
	text: {
		fontSize: 24,
		fontWeight: 'bold',
		color: 'white',
	},
});
