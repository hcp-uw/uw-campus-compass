import Checkbox from "expo-checkbox";
import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Header from "./header.jsx";
import SearchBox from "./Search.jsx";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function TypesComponent(props) {
	const [isChecked1, setChecked1] = useState(false); //vending machine
	const [isChecked2, setChecked2] = useState(false); //drink
	const [isChecked3, setChecked3] = useState(false); //snack
	const [isChecked4, setChecked4] = useState(false); //utilities
	const [isChecked5, setChecked5] = useState(false); //water fountain
	const [isChecked6, setChecked6] = useState(false); //drinking
	const [isChecked7, setChecked7] = useState(false); //bottle

	const { onSearch } = props;

	const readyToSubmit = () => {
		//format query output
		const params = {
			vending: !isChecked1,
			drink: !isChecked2,
			snack: !isChecked3,
			utilities: !isChecked4,
			fountain: !isChecked5,
			drinking: !isChecked6,
			bottle: !isChecked7,
		};

		onSearch(params);
	};

	useEffect(() => {
		//when component dismounts
		return () => readyToSubmit();
	}, [isChecked1, isChecked2, isChecked3, isChecked4, isChecked5, isChecked6, isChecked7]);

	return (
		<View style={styles.container}>
			{/* <Header /> */}
			<View style={styles.mainbody}>
				<Text style={styles.headerText}>TYPE</Text>
				<View style={styles.rectanglecontent}>
					<View style={styles.rectangle}>
						{/* rectangle content */}
						<View style={styles.rectangleLeft}>
							{/* left column content */}
							<Checkbox style={styles.checkbox} value={isChecked1} onValueChange={setChecked1} />
							{/* this is where the vending machine icon goes */}
						</View>
						<View style={styles.rectangleRight}>
							{/* right column content */}
							<Checkbox style={styles.checkbox} value={isChecked2} onValueChange={setChecked2} />
							<Checkbox style={styles.checkbox} value={isChecked3} onValueChange={setChecked3} />
							<Checkbox style={styles.checkbox} value={isChecked4} onValueChange={setChecked4} />
						</View>
					</View>
					<View style={styles.rectangle}>
						{/* rectangle content */}
						<View style={styles.rectangleLeft}>
							{/* left column content */}
							<Checkbox style={styles.checkbox} value={isChecked5} onValueChange={setChecked5} />
						</View>
						<View style={styles.rectangleRight}>
							{/* right column content */}
							<Checkbox style={styles.checkbox} value={isChecked6} onValueChange={setChecked6} />
							<Checkbox style={styles.checkbox} value={isChecked7} onValueChange={setChecked7} />
						</View>
					</View>
				</View>
			</View>
			<View style={styles.locationbutton_container}>
				<TouchableOpacity style={styles.locationbutton} onPress={readyToSubmit}>
					<Text style={styles.sltext}>Select Location </Text>
				</TouchableOpacity>
			</View>
			{/* <View style={styles.bottomslider}>
				<TouchableOpacity style={styles.sliderbutton}></TouchableOpacity>
			</View> */}
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
		fontSize: windowWidth * 0.07,
		fontWeight: "bold",
		marginLeft: windowWidth * 0.1,
		color: "#00084A",
		marginBottom: windowWidth * 0.05,
	},
	rectanglecontent: {
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
	},
	rectangle: {
		width: windowWidth * 0.9,
		height: windowWidth * 0.5,
		backgroundColor: "white",
		borderRadius: windowWidth * 0.15,
		borderWidth: 2,
		borderColor: "#00084A",
		marginBottom: windowHeight * 0.025,
		flexDirection: "row",
	},
	rectangleLeft: {
		flexDirection: "row",
		flex: 1,
		alignContent: "center",
		justifyContent: "center",
		marginLeft: windowWidth * 0.06,
		alignItems: "center",
	},
	rectangleRight: {
		flexDirection: "column",
		flex: 1,
		alignContent: "center",
		justifyContent: "center",
		marginLeft: windowWidth * 0.15,
	},
	locationbutton_container: {
		alignItems: "flex-end",
		paddingRight: "10%",
	},
	locationbutton: {
		alignItems: "center",
		justifyContent: "center",
		width: windowWidth * 0.33,
		height: windowWidth * 0.1,
		backgroundColor: "white",
		borderRadius: 15,
		borderWidth: 2,
		borderColor: "#00084A",
		marginBottom: windowHeight * 0.02,
	},
	sltext: {
		color: "#00084A",
		fontSize: windowWidth * 0.03,
	},
	bottomslider: {
		marginTop: 60,
		alignItems: "center",
		justifyContent: "center",
	},
	sliderbutton: {
		alignItems: "center",
		justifyContent: "center",
		width: windowWidth * 0.9,
		height: windowWidth * 0.17,
		backgroundColor: "white",
		borderRadius: 40,
		borderWidth: 2,
		borderColor: "#00084A",
	},
	checkbox: {},
});
