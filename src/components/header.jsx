import React from "react";
import { Image, StatusBar, StyleSheet, Text, View } from "react-native";

function Header() {
	return (
		<View style={styles.header}>
			<Image source={require("./../../assets/logo-header.png")} style={styles.logo} />
			<Text style={styles.headerText}>UW Campus Compass</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	header: {
		width: "100%",
		height: 140,
		backgroundColor: "#292055",
		paddingTop: StatusBar.currentHeight,
		borderBottomColor: "#7B4D97",
		borderBottomWidth: 15,
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
	},
	headerText: {
		fontWeight: "bold",
		fontSize: 25,
		fontFamily: "josefin-sans",
		color: "#F4F0C9",
		letterSpacing: 1,
	},
	logo: {
		width: 80,
		height: 80,
		marginRight: 10,
	},
});

export default Header;
