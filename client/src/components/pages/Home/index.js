import React, { useState, useEffect } from "react";
import API from '../../../utils/api';
import './style.css';

export default function Home() {
	const [map, setMap] = useState();

	useEffect(() => {	
		// Set default map to current location
		navigator.geolocation.getCurrentPosition(function(position) {
			const latitude = position.coords.latitude;
			const longitude = position.coords.longitude;
			API.getEmbed(latitude + ',' + longitude).then(result => {
				setMap({uri: result.data.uri})
			});
		})

	},[])

	return (
		<div className="container">
			{map ? (<iframe
					src={map.uri} allowFullScreen></iframe>)
				: null}
			
		</div>
		);
}
