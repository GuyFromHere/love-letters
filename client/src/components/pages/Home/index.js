import React, { useState, useEffect, createRef } from "react";
import API from "../../../utils/api";
import "./style.css";
import LetterMarker from "../../../images/markers/letter.png";

//	TODO:
//	Store marker types and coordinates in DB
// 	When page loads, get marker info and load it on to the map
// 	When a marker is added, post it to the DB then reload the page centered on the current location.

export default function Home() {
	const [coordinates, setCoordinates] = useState({});
	const googleMapRef = React.createRef();

	useEffect(() => {
		loadCurrentLocation();
	}, []);

	const loadCurrentLocation = () => {
		// Set default map to current location
		navigator.geolocation.getCurrentPosition(function (position) {
			createGoogleMap(position.coords.latitude, position.coords.longitude);
			setCoordinates(
				{ lat: position.coords.latitude, lng: position.coords.longitude },
				console.log("lat = " + coordinates.lat)
			);
			console.log("show lat: ");
			console.log(coordinates);
		});
	};

	const createGoogleMap = (lat, lng) => {
		const position = { lat: lat, lng: lng };
		const map = new window.google.maps.Map(googleMapRef.current, {
			zoom: 16,
			center: position,
			disableDefaultUI: true,
		});
		//let infoWindow = new window.google.maps.InfoWindow();
		map.addListener("click", function (mapsMouseEvent) {
			// Create a new InfoWindow.
			/* 			infoWindow.close();
			infoWindow = new window.google.maps.InfoWindow({ position: mapsMouseEvent.latLng });
			infoWindow.setContent(mapsMouseEvent.latLng.toString());
			infoWindow.open(map); */

			// Add marker
			const markerUriLetter =
				"https://love-letters-gfh.s3-us-west-2.amazonaws.com/markers/letter.png";

			const iconBase = "https://maps.google.com/mapfiles/kml/shapes/";
			const icon = {
				url: markerUriLetter,
				scaledSize: new window.google.maps.Size(50, 50),
			};
			const marker = new window.google.maps.Marker({
				position: mapsMouseEvent.latLng,
				//icon: { LetterMarker },
				icon: icon,
				map: map,
			});
		});
	};

	return <div id="google-map" ref={googleMapRef} />;
}
