import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { SomeComponent } from "./src/SomeComponent";
import { MapContainer } from "./src/MapContainer"
import { MapContent } from "./src/MapContent";
import mapboxgl from "mapbox-gl";

export default function App() {
	return (
		// <View style={styles.container}>
		// 	<Text>This is me testing how to use Expo Go!</Text>
		// 	<StatusBar style="auto" />
		// 	<SomeComponent />
		// </View>
		<MapContainer /> // this is the react + mapbox one
		// <MapContent /> // this is the react native npm one 
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white",
		alignItems: "center",
		justifyContent: "center",
	},
});
