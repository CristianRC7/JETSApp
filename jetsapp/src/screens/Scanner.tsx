import { useState } from "react";
import { StyleSheet, Button, View, Modal, Alert, SafeAreaView } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../types/navigation";
import Overlay from "../components/Overlay";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Scanner">;

export default function Scanner() {
    const [modalIsVisible, setModalIsVisible] = useState(false);
    const [permission, requestPermission] = useCameraPermissions();
    const navigation = useNavigation<NavigationProp>();

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

    const handleBarCodeScanned = ({ data }) => {
        try {
            const qrData = JSON.parse(data);
            console.log('QR Data:', qrData);
            
            if (qrData.id && qrData.usuario && qrData.nombre_completo) {
                setModalIsVisible(false);
                navigation.navigate('AddEventUser', { 
                    userData: {
                        id: qrData.id,
                        usuario: qrData.usuario,
                        nombre_completo: qrData.nombre_completo
                    }
                });
            } else {
                Alert.alert('Error', 'QR inválido: Datos incompletos');
            }
        } catch (error) {
            console.error('Error parsing QR:', error);
            Alert.alert('Error', 'QR inválido: Formato incorrecto');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Button title="Leer Codigo QR" onPress={handleOpenCamera} color="#cf152d"/>
            <Modal visible={modalIsVisible} style={{ flex: 1 }}>
                <CameraView 
                    style={{ flex: 1 }} 
                    facing="back"
                    onBarcodeScanned={handleBarCodeScanned}
                />
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
    }
});