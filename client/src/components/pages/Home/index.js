import React, { useState, useEffect } from "react";
import API from "../../../utils/api";
import "./style.css";

//	TODO:
//	Store marker types and coordinates in DB
// 	When page loads, get marker info and load it on to the map
// 	When a marker is added, post it to the DB then reload the page centered on the current location.

export default function Home() {
	//const [coordinates, setCoordinates] = useState({});
	const googleMapRef = React.createRef();

	useEffect(() => {
		loadCurrentLocation();
	}, []);

	const loadCurrentLocation = () => {
		// Set default map to current location
		navigator.geolocation.getCurrentPosition(function (position) {
			createGoogleMap(position.coords.latitude, position.coords.longitude);
			//setCoordinates({ lat: position.coords.latitude, lng: position.coords.longitude });
		});
	};

	// Function to draw marker based on db values for type, id, and coordinates
	const drawMarker = (marker, map) => {
		// get type, id, and coordinates
		const markerUri = "https://love-letters-gfh.s3-us-west-2.amazonaws.com/markers/";
		const icon = {
			url: markerUri + marker.type + ".png",
			scaledSize: new window.google.maps.Size(40, 30),
		};

		console.log("home drawMarker");
		console.log(marker.location);
		const newMarker = new window.google.maps.Marker({
			position: new window.google.maps.LatLng(marker.lat, marker.lng),
			icon: icon,
			map: map,
		});
	};

	const createGoogleMap = (lat, lng) => {
		const map = new window.google.maps.Map(googleMapRef.current, {
			zoom: 16,
			center: { lat: lat, lng: lng },
			disableDefaultUI: true,
		});

		// TEST - location by Mike's Drive In
		// (45.447707652248454, -122.63189489426377)
		const test = {
			type: "letter",
			text: "This is a test!",
			lat: 45.447707652248454,
			lng: -122.63189489426377,
		};
		drawMarker(test, map);

		/* API.getMarkers().then((result) => {
			result.data.forEach((item) => {
				drawMarker(item, map);
			});
		}); */

		let infoWindow = new window.google.maps.InfoWindow();

		map.addListener("click", function (mapsMouseEvent) {
			// TEST
			// Create a new InfoWindow.

			infoWindow.close();
			infoWindow = new window.google.maps.InfoWindow({ position: mapsMouseEvent.latLng });
			infoWindow.setContent(mapsMouseEvent.latLng.toString());
			infoWindow.open(map);

			//API.addMarker();
			// TEST
			// Add marker
			const markerUri = "https://love-letters-gfh.s3-us-west-2.amazonaws.com/markers/";
			const icon = {
				url: markerUri + "letter.png",
				scaledSize: new window.google.maps.Size(40, 30),
			};
			const marker = new window.google.maps.Marker({
				position: mapsMouseEvent.latLng,
				icon: icon,
				map: map,
			});
		});
	};

	return <div id="google-map" ref={googleMapRef} />;
}
