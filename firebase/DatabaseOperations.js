import { collection, doc, getDoc, getDocs, getFirestore, query, updateDoc, where } from "firebase/firestore";
import { getDownloadURL, getStorage, ref } from "firebase/storage";

import firebaseApp from "./firebaseConfig";

const db = getFirestore(firebaseApp);
const resourcesRef = collection(db, "Resources");

const getResources = async (query_) => {
	const resources = [];

	const querySnapshot = await getDocs(query_);
	querySnapshot.forEach((doc) => {
		resources.push({ item: doc.data(), id: doc.id });
	});
	return resources;
};

/**
 * @params type - type of resource (either "vending" or "fountain")
 * @returns resources - list of resources (each a record with the resource and id {item, id})
 * @where
 *  item: {
 * 	building,
 * 	description,
 * 	floor,
 * 	type,
 * 	subtypes: [],
 *  coords: {latitude, longitude},
 * }
 */
const getResourcesOfType = async (type) => {
	const resourcesQuery = query(resourcesRef, where("type", "==", type));
	return await getResources(resourcesQuery);
};

/**
 * @params type - building name
 * @returns resources - list of resources (each a record with the resource and id {item, id})
 * @where
 * item: {
 * 	building,
 * 	description,
 * 	floor,
 * 	type,
 * 	subtypes: [],
 *  coords: {latitude, longitude},
 * }
 */
const getResourcesInBuilding = async (building) => {
	const resourcesQuery = query(resourcesRef, where("building", "==", building));
	return await getResources(resourcesQuery);
};

const func2 = async (url) => {
	const res = await fetch(url);
	console.log(res);
	const blob = await res.blob();
	const img = new Image();
	img.src = URL.createObjectURL(blob);

	// newer promise based version of img.onload
	await img.decode();

	document.body.append(<img width={100} src={img}></img>);

	// Don't forget to revoke the blob url when
	// you no longer need it (to release memory)
	URL.revokeObjectURL(img.src);
};

const getImage = async (docId) => {
	const storage = getStorage();
	const imagesRef = ref(storage, `images/${docId}`);

	getDownloadURL(imagesRef)
		.then((url) => {
			console.log(url);

			func2(url);
		})
		.catch((err) => {
			console.log(err);
		});
};

/**
 * Updates coords of resources in firestore
 * @param resources an array of resources
 */
const updateResourcesCoords = async (resources) => {
	try {
		const promises = resources.map((resource) => {
			const ref = doc(db, `Resources/${resource.id}`);
			return updateDoc(ref, {
				coords: resource.item.coords,
			});
		});

		await Promise.all(promises);
	} catch (err) {
		console.error("Error updating docs", err);
	}
};

export { getImage, getResourcesInBuilding, getResourcesOfType, updateResourcesCoords };
