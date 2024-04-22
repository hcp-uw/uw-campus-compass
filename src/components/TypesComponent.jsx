import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from "react-native";

const windowWidth = Dimensions.get('window').width;

export default function TypesComponent() {
    return (
        <View style={styles.container}>
            <View style={styles.mainbody}>
                <Text style={styles.headerText}>TYPE</Text>
                <View style={styles.rectanglecontent}>
                    <View style={styles.rectangle}></View>
                    <View style={styles.rectangle}></View>
                </View>
            </View>
            <View style={styles.locationbutton_container}>
                <TouchableOpacity style={styles.locationbutton}>
                    <Text style={styles.sltext}>Select Location</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.bottomslider}>
                <TouchableOpacity style={styles.sliderbutton}></TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#DBE5FF",
        flex: 1,
    },
    mainbody: {
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    headerText: {
        fontSize: windowWidth * 0.06,
        fontWeight: "bold",
        marginLeft: windowWidth * 0.1,
        color: "#00084A",
        marginBottom: windowWidth * 0.02,
    },
    rectanglecontent: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        paddingLeft: "5%",
    },
    rectangle: {
        width: "90%",
        height: windowWidth * 0.4,
        backgroundColor: "white",
        borderRadius: windowWidth * 0.15,
        borderWidth: 2,
        borderColor: "#00084A",
        marginBottom: windowWidth * 0.03,
    },
    locationbutton_container: {
        alignItems: "flex-end",
        paddingRight: "10%"
    },
    locationbutton: {
        alignItems: "center",
        justifyContent: "center",
        width: windowWidth * 0.25,
        height: windowWidth * 0.08,
        backgroundColor: "white",
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "#00084A",
        marginBottom: windowWidth * 0.03,
    },
    sltext: {
        color: "#00084A",
        fontSize: windowWidth * 0.03,
    },
    bottomslider: {
        alignItems: "center",
        justifyContent: "center",
        paddingLeft: "5%",
    },
    sliderbutton: {
        alignItems: "center",
        justifyContent: "center",
        width: windowWidth * 0.8,
        height: windowWidth * 0.12,
        backgroundColor: "white",
        borderRadius: windowWidth * 0.06,
        borderWidth: 2,
        borderColor: "#00084A",
    }
});