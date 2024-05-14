import React, { useRef, useState } from "react";
import { Animated, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const SearchBox = (props) => {
	const [currentState, setCurrentState] = useState(true);
	const translateX = useRef(new Animated.Value(0)).current;
	const { onSwitchView } = props;

	const toggleState = () => {
		const toValue = currentState ? 1 : 0;
		Animated.timing(translateX, {
			toValue,
			duration: 600,
			useNativeDriver: true,
		}).start();
		onSwitchView(!currentState);
		setCurrentState(!currentState);
	};

	return (
		<View style={styles.outerContainer}>
			<View style={styles.container}>
				{/* Render the icon on the left if currentState is false */}

				<Animated.View
					style={[
						styles.slider,
						{
							transform: [
								{
									translateX: translateX.interpolate({
										inputRange: [0, 1],
										outputRange: [-85, -12],
									}),
								},
							],
						},
					]}
				>
					<TouchableOpacity style={styles.button} onPress={toggleState}>
						<View style={styles.inner}>
							<Ionicons name={currentState ? "map" : "search"} size={20} />
							<Text style={styles.text}>{currentState ? "Map" : "Search"}</Text>
						</View>
					</TouchableOpacity>
				</Animated.View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	outerContainer: {
		zIndex: 1000,
		display: "flex",
		flexDirection: "row",
		justifyContent: "flex-start",
		alignItems: "center",
		backgroundColor: "red",
	},
	container: {
		position: "absolute",
		bottom: 20,
		left: "10%",
		width: "80%",
		height: 66,
		paddingHorizontal: 30,
		paddingVertical: 8,
		backgroundColor: "rgba(0, 0, 0, 0.5)",
		borderRadius: 50,
		display: "flex",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
	slider: {
		position: "absolute",
		width: "50%", // Initial width, will animate to 100%
		height: "100%",
		borderRadius: 5,
	},
	button: {
		backgroundColor: "#4CAF50",
		height: 50,
		width: 220,
		borderRadius: 30,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	text: {
		color: "white",
		fontWeight: "bold",
	},
	inner: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		gap: 10,
	},
});

export default SearchBox;
