import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
import { Button, StyleSheet, Text, View, Dimensions, TouchableOpacity, BackHandler } from 'react-native';
import { router } from "expo-router";
import { APP_ROUTES } from "@/constants/urls";
import { useFocusEffect } from 'expo-router';
import colors from "@/constants/colors";

const { width, height } = Dimensions.get("window");
const scannerSize = 250;
const overlayColor = "rgba(0, 0, 0, 0.7)";

export default function QRCodeScannerScreen() {
    const [permission, requestPermission] = useCameraPermissions();

    useFocusEffect(() => {
        const onBackPress = () => {
            router.back();
            return true;
        };
        BackHandler.addEventListener('hardwareBackPress', onBackPress);
    });

    if (!permission) return <View />;

    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text style={styles.message}>We need your permission to show the camera</Text>
                <Button onPress={requestPermission} title="Grant Permission" />
            </View>
        );
    }

    const handleAction = {
        onBarcodeScanned: async (e) => {
            router.replace({
                pathname: `/dashboard/electors/${e.data}`,
                params: { electorData: e.data, fromScreen: APP_ROUTES.MAIN.SEARCH_BY_QR }
            });
        }
    };

    return (
        <View className="flex-1 justify-center">
            <CameraView
                style={styles.camera}
                facing="back"
                barcodeScannerSettings={{ barcodeTypes: ["qr", "code128", "ean13", "upc_e"] }}
                onBarcodeScanned={handleAction.onBarcodeScanned}
            />

            <View style={styles.overlay}>
                <Text style={styles.titleText}>Scan from QRCode</Text>
                <View style={[styles.mask, { height: (height - scannerSize) / 2, width }]} />
                <View style={{ flexDirection: "row" }}>
                    <View style={[styles.mask, { width: (width - scannerSize) / 2, height: scannerSize }]} />
                    <View style={styles.scannerFrame} />
                    <View style={[styles.mask, { width: (width - scannerSize) / 2, height: scannerSize }]} />
                </View>
                <View style={[styles.mask, { height: (height - scannerSize) / 2, width }]} />
                <TouchableOpacity onPress={() => router.back()} style={styles.cancelButton}>
                    <Text style={styles.cancelText}>Cancel</Text>
                </TouchableOpacity>
            </View>
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
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    mask: {
        backgroundColor: overlayColor,
    },
    scannerFrame: {
        width: scannerSize,
        height: scannerSize,
        backgroundColor: 'transparent',
    },
    scanningText: {
        position: 'absolute',
        bottom: height * 0.15, // Position text below scanner
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        color: '#fff',
        fontSize: 18,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
    },
    cancelButton: {
        position: 'absolute',
        bottom: height * 0.2, // Below the scanning text
        backgroundColor: colors.secondary,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    cancelText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    titleText: {
        position: 'absolute',
        bottom: height * 0.7, // Below the scanning text
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
