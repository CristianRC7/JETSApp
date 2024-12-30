import { useState } from "react";
import { StyleSheet, Button, View, Modal, Alert, SafeAreaView, Dimensions } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import Overlay from "../components/Overlay";

export default function Scanner() {
    const [modalIsVisible, setModalIsVisible] = useState(false);
    const [permission, requestPermission] = useCameraPermissions();

    async function handleOpenCamera() {
        try {
            const { granted } = await requestPermission();
            if (!granted) {
                return Alert.alert("Permisos requeridos", "Necesitas dar permisos para acceder a la cámara");
            }

            setModalIsVisible(true);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <Button title="Leer Codigo QR" onPress={handleOpenCamera} color="#cf152d"/>
            <Modal visible={modalIsVisible} style={{ flex: 1 }}>
                <CameraView style={{ flex: 1 }} facing="back" />
                <Overlay />
                <SafeAreaView style={styles.footer}>
                    <Button title="Cancelar" onPress={() => setModalIsVisible(false)} color="#cf152d"/>
                </SafeAreaView>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    footer: {
        padding: 16,
        backgroundColor: "#fff",
    },
    Button: {
       
    }
});