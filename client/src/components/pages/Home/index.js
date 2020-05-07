import React, { useState, useEffect } from "react";
import API from "../../../utils/api";
import Modal from "../../partials/Modal";
import "./style.css";

//	TODO:
//	Store marker types and location in DB
// 	When page loads, get marker info and load it on to the map
// 	When a marker is added, post it to the DB then reload the page centered on the current location.

export default function Home() {
	const [location, setLocation] = useState({ lat: "", lng: "" });
	const [showModal, setShowModal] = useState(false);
	const googleMapRef = React.createRef();
	let map;

	useEffect(() => {
		loadCurrentLocation();
	}, []);

	const loadCurrentLocation = () => {
		// Set default map to current location
		navigator.geolocation.getCurrentPosition(function (position) {
			createGoogleMap(position.coords.latitude, position.coords.longitude);
			setLocation({ lat: position.coords.latitude, lng: position.coords.longitude });
		});
	};

	// Function to draw marker based on db values for type, id, and location
	const drawMarker = (marker, map) => {
		console.log("home drawmarker");
		console.log(map);
		// get type, id, and location
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

	const newLetter = (lat, lng, text, map) => {
		// test text for testing database
		const newObj = {
			type: "letter",
			text: text,
			lat: lat,
			lng: lng,
		};

		API.sendLetter(newObj).then((result) => {
			console.log("Letter saved to DB.");
			// Draw the new marker on the map and pan
			drawMarker(newObj, map);
			// panTo not working...
			const position = new window.google.maps.LatLng(lat, lng);
			console.log(position);
			//map.panTo(position);
		});
		setShowModal(false);
	};

	/* const addMarker = (location, map) => {
		// Parse location info from click event so we can save the location in the DB
		let locationString = location.toString().replace(")", "").replace("(", "").split(", ");
		const position = new window.google.maps.LatLng(locationString[0], locationString[1]);

		// Call function to create letter here...

		// test text for testing database
		const newObj = {
			type: "letter",
			text: "This is a test.",
			lat: locationString[0],
			lng: locationString[1],
		};

		API.sendLetter(newObj).then((result) => {
			console.log("Letter saved to DB.");
		});

		// Draw the new marker on the map and pan
		drawMarker(newObj, map);
		map.panTo(position);
	}; */

	const handleClick = (location, map) => {
		//
		let locationString = location.toString().replace(")", "").replace("(", "").split(", ");
		setShowModal(true);
		setLocation({ lat: locationString[0], lng: locationString[1] });
		document.getElementById("leaveLetter").showModal();
	};

	const closeModal = () => {
		setShowModal(false);
	};

	const createGoogleMap = (lat, lng) => {
		map = new window.google.maps.Map(googleMapRef.current, {
			zoom: 16,
			center: { lat: lat, lng: lng },
			disableDefaultUI: true,
		});

		map.addListener("click", function (mapsMouseEvent) {
			// call addMarker to handle event
			//addMarker(mapsMouseEvent.latLng, map);
			handleClick(mapsMouseEvent.latLng, map);
		});

		// Get letters from DB and draw them on the map after it loads
		API.getMarkers().then((result) => {
			result.data.forEach((item) => {
				drawMarker(item, map);
			});
		});
	};

	return (
		<div>
			<div id="google-map" ref={googleMapRef}></div>
			{showModal ? (
				<Modal
					id="leaveLetter"
					className="modal"
					send={newLetter}
					close={closeModal}
					location={location}
				/>
			) : null}
		</div>
	);
}
