import React, { Component, createRef } from "react";

class Maps extends Component {
	googleMapRef = React.createRef();

	componentDidMount() {
		/* const googleMapScript = document.createElement("script");
		googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCx2Djz7ZaFTANZABCtPLFUmBe4WG2VuYM&libraries=places`;
		window.document.body.appendChild(googleMapScript); */

		/*googleMapScript.addEventListener('load', {
            this.googleMap = this.createGoogleMap()
            this.marker = this.createMarker()
        }) */
		this.createGoogleMap();
	}

	createGoogleMap = () => {
		new window.google.maps.Map(this.googleMapRef.current, {
			zoom: 16,
			center: {
				lat: 43.642567,
				lng: -79.387054,
			},
			disableDefaultUI: true,
		});
	};

	render() {
		return <div id="google-map" ref={this.googleMapRef}></div>;
	}
}

export default Maps;
