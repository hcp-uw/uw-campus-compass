import { useEffect, useState } from "react";
import { getResourcesOfType } from "./firebase/DatabaseOperations";
import Header from "./src/components/header";
import MapComponent from "./src/components/MapComponent";
import SearchBox from "./src/components/Search";
import TypesComponent from "./src/components/TypesComponent";

const App = () => {
	const [mapVisible, setMapVisible] = useState(true);
	const [searchParams, setSearchParams] = useState({
		vending: false,
		drink: false,
		snack: false,
		utilities: false,
		fountain: false,
		drinking: false,
		bottle: false,
	});
	const [resources, setResources] = useState([]);

	const handleSwitchView = (view) => {
		setMapVisible(view);
	};

	const handleSearch = (params) => {
		console.log(params);
		setSearchParams(params);
	};

	useEffect(() => {
		const getResources = async () => {
			let res;
			const { vending, fountain, drink, snack, utilities, drinking, bottle } = searchParams;
			if (vending && fountain) {
				const vend = await getResourcesOfType("vending");
				const fount = await getResourcesOfType("fountain");
				res = [...vend, ...fount];
			} else if (vending) {
				res = await getResourcesOfType("vending");
			} else {
				res = await getResourcesOfType("fountain");
			}

			const final = res.map((r) => {
				if (drink && r.item.subtypes.includes("drink")) {
					return r;
				} else if (snack && r.item.subtypes.includes("snack")) {
					return r;
				} else if (utilities && r.item.subtypes.includes("utilities")) {
					return r;
				} else if (drinking && r.item.subtypes.includes("drinking")) {
					return r;
				} else if (bottle && r.item.subtypes.includes("bottle")) {
					return r;
				}
			});
			setResources(final.filter((r) => r !== undefined));
		};

		//only if map is visible, get the resources
		if (mapVisible && searchParams) {
			getResources();
		}
	}, [mapVisible]);

	return (
		<>
			<Header />
			{mapVisible ? (
				<MapComponent resources={resources} />
			) : (
				<TypesComponent onSearch={handleSearch} initialParams={searchParams} />
			)}
			<SearchBox onSwitchView={handleSwitchView} />
		</>
	);
};
export default App;
