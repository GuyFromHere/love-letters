import React, { Component } from "react";
import API from "../../../utils/api";
import Modal from "../../partials/Modal";
import Letter from "../../partials/Letter";
import SearchForm from "../../partials/SearchForm";
import "./style.css";

var map;

class Home extends Component {
	constructor(props) {
		super(props);
		this.googleMapRef = React.createRef();
		this.state = {
			location: {},
			activeMarker: {},
			showLeaveModal: false,
			showLetter: false,
		};
	}

	handleClick = (location, map) => {
		let locationString = location.toString().replace(")", "").replace("(", "").split(", ");
		this.setState({
			location: { lat: locationString[0], lng: locationString[1] },
			showLeaveModal: true,
		});
		document.getElementById("leaveLetterModal").showModal();
	};

	closeLeaveModal = () => {
		this.setState({ showLeaveModal: false });
	};

	closeLetter = () => {
		this.setState({ showLetter: false });
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
		const awsUri = "https://love-letters-gfh.s3-us-west-2.amazonaws.com/publicprefix/";
		const icon = {
			url: markerUri + marker.type + ".png",
			scaledSize: new window.google.maps.Size(40, 30),
		};
		const newMarker = new window.google.maps.Marker({
			position: new window.google.maps.LatLng(marker.lat, marker.lng),
			icon: icon,
			map: map,
			id: marker._id,
			type: marker.type,
		});
		if (marker.type === "letter") {
			newMarker.text = marker.text;
		} else {
			console.log("drawMarker type = capture");
			newMarker.src = awsUri + marker.fileName;
		}

		newMarker.addListener("click", (e) => {
			// Show letter in modal when marker is clicked
			map.panTo(newMarker.position);
			this.setState({ activeMarker: newMarker, showLetter: true });
			document.getElementById(newMarker.id).showModal();
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
			this.drawMarker(result.data, map);
			const position = new window.google.maps.LatLng(lat, lng);
			map.panTo(position);
		});
		this.setState({ showModal: false });
	};

	// submit search query and center map on first result
	searchMaps = (query) => {
		API.searchMaps(query).then(result => {
			map.setCenter(result.data.location);
		})
	};

	componentDidMount() {
		let currentComponent = this;

		// render googlemap
		map = new window.google.maps.Map(this.googleMapRef.current, {
			zoom: 16,
			center: { lat: -34.397, lng: 150.644 },
			disableDefaultUI: true,
		});

		map.addListener("click", function (mapsMouseEvent) {
			map.panTo(mapsMouseEvent.latLng);
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
				{this.state.showLeaveModal ? (
					<Modal
						id="leaveLetterModal"
						className="modal"
						map={map}
						send={this.newLetter}
						drawMarker={this.drawMarker}
						closeLeaveModal={this.closeLeaveModal}
						choice={this.state.choice}
						location={this.state.location}
						//chooseLetterType={this.chooseLetterType}
					/>
				) : null}
				{this.state.showLetter ? (
					<Letter
						className="letterModal"
						close={this.closeLetter}
						map={map}
						id={this.state.activeMarker.id}
						text={this.state.activeMarker.text}
						type={this.state.activeMarker.type}
						src={this.state.activeMarker.src}
					/>
				) : null}
			</div>
		);
	}
}

export default Home;
