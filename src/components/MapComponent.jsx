import Mapbox, { Camera } from "@rnmapbox/maps";
import React, { useRef, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { getResourcesOfType, updateResourcesCoords } from "../DatabaseOperations";
import SearchBox from "./Search";
import Header from "./header";

Mapbox.setAccessToken(
	"pk.eyJ1IjoidXdjYW1wdXNjb21wYXNzIiwiYSI6ImNsczVlanlpaTBmOGUya3A2enNhemU3a2EifQ.0shmIuiEWiPRkc68amMBdQ"
);

const uwLat = 47.655548;
const uwLng = -122.3032;
const uwCoord = [uwLng, uwLat];

function MapComponent() {
	const mapViewRef = useRef(null);
	const [resources, setResources] = useState(null);
	const [selectedResourceId, setSelectedResourceId] = useState(null);

	const [movedResources, setMovedResources] = useState([]);

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
			const resources = await getResourcesOfType("fountain");
			setResources(resources);
		};
		getResources();
	}, []);

	const resourceSelected = (resource) => {
		//use selected a marker on map
		console.log(resource.item.description, resource.item.floor, resource.item.building);
		setSelectedResourceId(resource.id);
	};

	const handleMapPress = (event) => {
		//user touched map
		if (selectedResourceId && resources) {
			//if resource was selected, then move marker to new coord
			const moved = movedResources;
			//already moved before
			if (moved.some((resource) => resource.id === selectedResourceId)) {
				moved.map((resource) => {
					if (resource.id === selectedResourceId) {
						return { ...resource.item };
					}
				});
			} else {
				//not yet moved
				moved.push(resources.find((resource) => resource.id === selectedResourceId));
			}
			setMovedResources(moved);

			setSelectedResourceId(null);
			resources.map((resource) => {
				if (resource.id === selectedResourceId) {
					const selectedCoord = event.geometry.coordinates;
					resource.item.coords = { longitude: selectedCoord[0], latitude: selectedCoord[1] };
				}
				return resource;
			});
		}
	};

	const updateDatabaseWithMovedResources = async () => {
		console.log(movedResources);
		await updateResourcesCoords(movedResources);
		//reset movedResourcesRef
		setMovedResources([]);
	};

	return (
		<View style={styles.page}>
			<Header />
			<View style={styles.container}>
				<Mapbox.MapView
					style={styles.map}
					styleURL="mapbox://styles/mapbox/streets-v12"
					onDidFinishLoadingMap={() => scrollTo(uwCoord)}
					onPress={handleMapPress}
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
				{selectedResourceId && (
					<View style={styles.alert}>
						<Text style={{ color: "white" }}>
							(Tap to move)
							{resources.find((resource) => resource.id === selectedResourceId).item.description},{" "}
							{resources.find((resource) => resource.id === selectedResourceId).item.building},
							{resources.find((resource) => resource.id === selectedResourceId).item.floor} {"    "}
						</Text>
					</View>
				)}
				{/* <View>
					<Text>{movedResources.length} Moved</Text>
					<Button style={styles.btn} title="Save" onPress={updateDatabaseWithMovedResources}>
						Save
					</Button>
				</View> */}
				<SearchBox />
			</View>
		</View>
	);
}

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
	alert: {
		position: "absolute",
		top: 40,
		left: 10,
		padding: 10,
		backgroundColor: "red",
	},
	btn: {
		position: "absolute",
		bottom: 40,
		left: 10,
		padding: 10,
		backgroundColor: "green",
	},
});

export default MapComponent;
