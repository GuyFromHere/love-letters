import React, { useState, useEffect } from "react";
import API from "../../../utils/api";
import "./style.css";

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
			setCoordinates({ lat: position.coords.latitude, lng: position.coords.longitude });
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
		const newMarker = new window.google.maps.Marker({
			position: new window.google.maps.LatLng(marker.lat, marker.lng),
			icon: icon,
			map: map,
		});
	};

	const addMarker = (location) => {
		
		let locationString = location.toString().replace(")","").replace("(","").split(", ");;
		const newObj = {
			type: "letter",
			text: "This is a test.",
			lat: locationString[0],
			lng: locationString[1],
		}
		API.sendLetter(newObj).then(result => {
			console.log('letter sent. reload map.');
			console.log(locationString[0])
			console.log(locationString[1])
			createGoogleMap(45.434928402922765, -122.64173556347656);
			//loadCurrentLocation();
		})
	}

	const createGoogleMap = (lat, lng) => {

		// Take a look at this:
		// https://www.newline.co/fullstack-react/articles/how-to-write-a-google-maps-react-component/#
		const map = new window.google.maps.Map(googleMapRef.current, {
			zoom: 16,
			center: { lat: lat, lng: lng },
			disableDefaultUI: true,
		});

		map.addListener("click", function (mapsMouseEvent) {
			// call addMarker to handle event
			addMarker(mapsMouseEvent.latLng)
		});

		API.getMarkers().then((result) => {
			console.log('home getMarkers')
			result.data.forEach((item) => {
				console.log('home getMarkers result data')
				drawMarker(item, map);
			});
		});
		
		
		/* API.getMarkers().then((result) => {
			const map = new window.google.maps.Map(googleMapRef.current, {
				zoom: 16,
				center: { lat: lat, lng: lng },
				disableDefaultUI: true,
			});
	
			map.addListener("click", function (mapsMouseEvent) {
				// call addMarker to handle event
				addMarker(mapsMouseEvent.latLng)

			});

			result.data.forEach((item) => {
				console.log('home getMarkers result data')
				drawMarker(item, map);
			});
		}); */ 
	};

	return <div id="google-map" ref={googleMapRef} />;
}
