import React, { useState, useEffect, createRef } from "react";
import API from "../../../utils/api";
import "./style.css";

export default function Home() {
	const googleMapRef = React.createRef();

	useEffect(() => {
		// Set default map to current location
		navigator.geolocation.getCurrentPosition(function (position) {
			const latitude = position.coords.latitude;
			const longitude = position.coords.longitude;
			createGoogleMap(latitude, longitude);
		});
	}, []);

	const createGoogleMap = (lat, lng) => {
		new window.google.maps.Map(googleMapRef.current, {
			zoom: 16,
			center: {
				lat: lat,
				lng: lng,
			},
			disableDefaultUI: true,
		});
	};

	return <div id="google-map" ref={googleMapRef} />;
}
