import Mapbox from "@rnmapbox/maps";
import React, { useRef, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { getResourcesOfType } from "./src/DatabaseOperations";

Mapbox.setAccessToken(
	"pk.eyJ1IjoidXdjYW1wdXNjb21wYXNzIiwiYSI6ImNsczVlanlpaTBmOGUya3A2enNhemU3a2EifQ.0shmIuiEWiPRkc68amMBdQ"
);

const uwLat = 47.655548;
const uwLng = -122.3032;
const uwCoord = [uwLng, uwLat];
const App = () => {
	const mapViewRef = useRef(null);
	const [resources, setResources] = useState(null);

	/**scroll map camera to given coords  */
	const scrollTo = (coords) => {
		if (mapViewRef.current) {
			mapViewRef.current.setCamera({
				centerCoordinate: coords,
				zoomLevel: 12.9,
				animationMode: "easeTo",
			});
		}
	};

	useState(() => {
		const getResources = async () => {
			const resources = await getResourcesOfType("vending");
			setResources(resources);
		};
		getResources();
	}, []);

	const resourceSelected = (resource) => {
		console.log(resource);
	};

	return (
		<View style={styles.page}>
			<View style={styles.container}>
				<Mapbox.MapView
					style={styles.map}
					styleURL="mapbox://styles/mapbox/streets-v12"
					onDidFinishLoadingMap={() => scrollTo(uwCoord)}
				>
					<Mapbox.Camera ref={mapViewRef} centerCoordinate={uwCoord} zoomLevel={12.9} />
					{resources &&
						resources.map((resource) => {
							return (
								<Mapbox.PointAnnotation
									key={resource.id}
									id={resource.id}
									coordinate={[resource.item.coords.longitude, resource.item.coords.latitude]}
									onSelected={() => resourceSelected(resource)}
								></Mapbox.PointAnnotation>
							);
						})}
				</Mapbox.MapView>
			</View>
		</View>
	);
};

export default App;

const styles = StyleSheet.create({
	page: {
		flex: 1,
	},
	container: {
		flex: 1,
	},
	map: {
		flex: 1,
	},
});
