import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Camera } from 'expo-camera';

const CameraScreen = ({ navigation }) => {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const cameraRef = useRef(null);


    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        navigation.navigate('Results', { barcode: data });
        setScanned(false);
        // console.log(`Bar code with type ${type} and data ${data} has been scanned!`);
        // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    };

    const restartScanner = async () => {
        // navigation.navigate('Results', { barcode: "0068100084245" });

        setScanned(false);

        if (cameraRef.current) {
            await cameraRef.current.pausePreview();

            await cameraRef.current.resumePreview();
        }
    };

    return (
        <View style={styles.container}>
            <Camera
                style={styles.camera}
                type={Camera.Constants.Type.back}
                autoFocus={Camera.Constants.AutoFocus.continuous}
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            >
                <View style={styles.layer} />
                <TouchableOpacity style={styles.overlay} onPress={restartScanner}>
                    <Text style={styles.scanText}>Tap here to reset scanner</Text>
                </TouchableOpacity>
            </Camera>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    camera: {
        flex: 1,
    },
    layer: {
        flex: 2,
    },
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    scanText: {
        fontSize: 18,
        color: 'white',
    },
});

export default CameraScreen;