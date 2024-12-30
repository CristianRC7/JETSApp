import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const Overlay = () => {
    const overlaySize = Math.min(width, height) * 0.7; 
    const topBottomHeight = (height - overlaySize) / 2;
    const sideWidth = (width - overlaySize) / 2;

    return (
        <View style={styles.container}>
            <View style={[styles.overlay, { height: topBottomHeight, width }]} />

            <View style={{ flexDirection: "row" }}>
                <View style={[styles.overlay, { width: sideWidth, height: overlaySize }]} />
                <View style={[styles.transparentArea, { width: overlaySize, height: overlaySize }]} />
                <View style={[styles.overlay, { width: sideWidth, height: overlaySize }]} />
            </View>

            <View style={[styles.overlay, { height: topBottomHeight, width }]} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: "center",
        alignItems: "center",
    },
    overlay: {
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    transparentArea: {
        backgroundColor: "transparent",
        borderColor: "white",
        borderWidth: 3,
        borderRadius: 10,
    },
});

export default Overlay;
