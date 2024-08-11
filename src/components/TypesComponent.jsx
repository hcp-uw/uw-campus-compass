import Checkbox from "expo-checkbox";
import React, { useEffect, useState } from "react";
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Header from "./header.jsx";
import SearchBox from "./Search.jsx";


const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function TypesComponent(props) {
	const { onSearch, initialParams } = props;
	const { vending, fountain, drink, snack, utilities, drinking, bottle } = initialParams;

	const [isChecked1, setChecked1] = useState(vending); //vending machine
	const [isChecked2, setChecked2] = useState(drink); //drink
	const [isChecked3, setChecked3] = useState(snack); //snack
	const [isChecked4, setChecked4] = useState(utilities); //utilities
	const [isChecked5, setChecked5] = useState(fountain); //water fountain
	const [isChecked6, setChecked6] = useState(drinking); //drinking
	const [isChecked7, setChecked7] = useState(bottle); //bottle

	const readyToSubmit = () => {
		//format query output
		const params = {
			vending: isChecked1,
			drink: isChecked2,
			snack: isChecked3,
			utilities: isChecked4,
			fountain: isChecked5,
			drinking: isChecked6,
			bottle: isChecked7,
		};

		onSearch(params);
	};

	useEffect(() => {
		readyToSubmit();
	}, [isChecked1, isChecked2, isChecked3, isChecked4, isChecked5, isChecked6, isChecked7]);

	// auto check sub boxes
	const handleVendingCheckboxChange = (newValue) => {
		setChecked1(newValue);
		setChecked2(newValue);
		setChecked3(newValue);
		setChecked4(newValue);
  };
	const handleFountainCheckboxChange = (newValue) => {
    setChecked5(newValue);
		setChecked6(newValue);
		setChecked7(newValue);
  };


	return (
		<View style={styles.container}>
			<View style={styles.mainbody}>
				<View style={styles.rectanglecontent}>
					<View style={styles.rectangle}>
						{/* rectangle content */}
						<View style={styles.rectangleLeft}>
							{/* left column content */}
							<View style={styles.checkboxContainer}>
								{/* <Checkbox style={styles.checkbox} value={isChecked1} onValueChange={setChecked1} /> */}
								<Checkbox style={styles.checkbox} value={isChecked1} onValueChange={(newValue) => handleVendingCheckboxChange(newValue)} />
								<View style={styles.checkboxImageContainer}>
									{/* this is where the vending machine icon goes */}
									<Image
										source={require("../../assets/vending_machine_icon.png")}
										style={styles.vending_machine_icon}
									/>
									<Text style={styles.checkboxLabel}>Vending Machines </Text>
								</View>
							</View>
						</View>
						<View style={styles.rectangleRight}>
							{/* right column content */}
							<View style={styles.checkboxContainer}>
								<Checkbox style={styles.checkbox} value={isChecked2} onValueChange={setChecked2} />
								<Text style={styles.checkboxLabel}>Drinks</Text>
							</View>
							<View style={styles.checkboxContainer}>
								<Checkbox style={styles.checkbox} value={isChecked3} onValueChange={setChecked3} />
								<Text style={styles.checkboxLabel}>Snacks</Text>
							</View>
							<View style={styles.checkboxContainer}>
								<Checkbox style={styles.checkbox} value={isChecked4} onValueChange={setChecked4} />
								<Text style={styles.checkboxLabel}>Utilities </Text>
							</View>
						</View>
					</View>
					<View style={styles.rectangle}>
						{/* rectangle content */}
						<View style={styles.rectangleLeft}>
							{/* left column content */}
							<View style={styles.checkboxContainer}>
								{/* <Checkbox style={styles.checkbox} value={isChecked5} onValueChange={setChecked5} /> */}
								<Checkbox style={styles.checkbox} value={isChecked5} onValueChange={(newValue) => handleFountainCheckboxChange(newValue)} />
								<View style={styles.checkboxImageContainer}>
									{/* this is where the vending machine icon goes */}
									<Image
										source={require("../../assets/water_fountain_icon.png")}
										style={styles.vending_machine_icon}
									/>
									<Text style={styles.checkboxLabel}>Water Fountains </Text>
								</View>
							</View>
						</View>
						<View style={styles.rectangleRight}>
							{/* right column content */}
							<View style={styles.checkboxContainer}>
								<Checkbox style={styles.checkbox} value={isChecked6} onValueChange={setChecked6} />
								<Text style={styles.checkboxLabel}>Drinking </Text>
							</View>
							<View style={styles.checkboxContainer}>
								<Checkbox style={styles.checkbox} value={isChecked7} onValueChange={setChecked7} />
								<Text style={styles.checkboxLabel}>Bottle </Text>
							</View>
						</View>
					</View>
				</View>
			</View>
			{/* <View style={styles.locationbutton_container}>
				<TouchableOpacity style={styles.locationbutton} onPress={readyToSubmit}>
					<Text style={styles.sltext}>Select Location </Text>
				</TouchableOpacity>
			</View> */}
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
		justifyContent: "center",
		alignItems: "center",
	},
	mainbody: {
		paddingHorizontal: 20,
		marginBottom: 75,
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
		gap: 5,
	},
	rectangleRight: {
		flexDirection: "column",
		flex: 1,
		alignContent: "center",
		justifyContent: "center",
		marginLeft: windowWidth * 0.15,
		gap: 5,
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
	checkbox: {
		marginRight: 8,
	},
	checkboxContainer: {
		flexDirection: "row",
		alignItems: "center",
	},
	checkboxLabel: {
		fontSize: 16,
	},
	checkboxImageContainer: {
		alignItems: "center",
		marginBottom: 5,
	},
	vending_machine_icon: {
		resizeMode: "contain",
		width: windowWidth * 0.1,
		height: windowHeight * 0.1,
	},
});
