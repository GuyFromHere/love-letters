import React from 'react';

export default function Leave() {

	const getLocation = (choice) => {
		console.log('leave getLocation')
		if ( choice === 'here' ) {
			navigator.geolocation.getCurrentPosition(function(position) {
				const latitude = position.coords.latitude;
				const longitude = position.coords.longitude;
				// TEST
				// feed to maps api like
				// uriStart + latitude + ',' + longitude + uriEnd + MAPS)

			})
		}
		
	}

	return (
		<div className="leaveContainer">
			<h1>Leave</h1>
			<h1>Where would you like to leave a letter?</h1>
			<button onClick={() => {getLocation('here')}}>Current Location</button>
			<button onClick={() => {getLocation('there')}}>Somewhere Else</button>
		</div>
	)
}