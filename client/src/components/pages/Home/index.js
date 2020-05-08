import React, { Component } from "react";
import API from "../../../utils/api";
import Modal from "../../partials/Modal";
import SearchForm from "../../partials/SearchForm";
import "./style.css";

var map;

class Home extends Component {
	constructor(props) {
		super(props);
		this.googleMapRef = React.createRef();
		this.state = {
			location: {},
			showModal: false,
		};
	}

	handleClick = (location, map) => {
		let locationString = location.toString().replace(")", "").replace("(", "").split(", ");
		this.setState({ location: { lat: locationString[0], lng: locationString[1] } });
		this.setState({ showModal: true });
		document.getElementById("leaveLetter").showModal();
	};

	closeModal = () => {
		this.setState({ showModal: false });
	};

	getCurrentLocation = () => {
		navigator.geolocation.getCurrentPosition(function (position) {
			const location = {
				lat: position.coords.latitude,
				lng: position.coords.longitude,
			};
			return location;
		});
	};

	// Function to draw marker based on db values for type, id, and location
	drawMarker = (marker, map) => {
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

	// send as prop to Modal.
	// Call in onClick event to get the info for the new letter.
	newLetter = (lat, lng, text, map) => {
		const newObj = {
			type: "letter",
			text: text,
			lat: lat,
			lng: lng,
		};

		API.sendLetter(newObj).then((result) => {
			// Draw the new marker on the map and pan
			this.drawMarker(newObj, map);
			const position = new window.google.maps.LatLng(lat, lng);
			console.log(position);
			map.panTo(position);
		});
		this.setState({ showModal: false });
	};

	searchMaps = (query, map) => {
		console.log("Home searchmaps query");
		console.log(query);
		const request = {
			query: query,
			fields: ["name", "geometry"],
		};
		/* const service = new window.google.maps.places.PlacesService(map);
		service.findPlaceFromQuery(request, function (results, status) {
			if (status === window.google.maps.places.PlacesServiceStatus.OK) {
				
				map.setCenter(results[0].geometry.location);
			}
		}); */
	};

	componentDidMount() {
		let currentComponent = this;

		// render googlemap
		map = new window.google.maps.Map(this.googleMapRef.current, {
			zoom: 16,
			center: { lat: -34.397, lng: 150.644 },
			disableDefaultUI: true,
		});
		console.log("home map object: ");
		console.log(map);
		map.addListener("click", function (mapsMouseEvent) {
			currentComponent.handleClick(mapsMouseEvent.latLng, map);
		});

		// Get letters from DB and draw them on the map after it loads
		API.getMarkers().then((result) => {
			result.data.forEach((item) => {
				this.drawMarker(item, map);
			});
		});

		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function (position) {
				var pos = {
					lat: position.coords.latitude,
					lng: position.coords.longitude,
				};
				map.setCenter(pos);
			});
		} else {
			// Browser doesn't support Geolocation
			// handleErrorFunctionHere();
		}
	}

	render() {
		return (
			<div>
				<SearchForm search={this.searchMaps} map={map} />
				<div id="google-map" ref={this.googleMapRef}></div>
				{this.state.showModal ? (
					<Modal
						id="leaveLetter"
						className="modal"
						map={map}
						send={this.newLetter}
						close={this.closeModal}
						location={this.state.location}
					/>
				) : null}
			</div>
		);
	}
}

export default Home;
