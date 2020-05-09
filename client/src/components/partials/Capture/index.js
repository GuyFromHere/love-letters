import React, { Component } from "react";
import Webcam from "react-webcam";
import CaptureImg from "../CaptureImg";
import API from "../../../utils/api.js";
import "./style.css";

const getUniqueKey = () => {
	const keyOffset = new Date();
	const rand = Math.floor(Math.random() * keyOffset);
	return rand;
};

class Capture extends Component {
	constructor(props) {
		super();
		// initialize empty state variable
		this.state = { key: getUniqueKey() };

		console.log("partials capture props");
		console.log(props);
	}

	setRef = (webcam) => {
		this.webcam = webcam;
	};

	capture = () => {
		// Get capture from webcam
		const imageData = this.webcam.getScreenshot();

		// load captured image in to img element
		this.setState({ capture: imageData });

		// Hide capture button
		document.getElementById("captureBtn").style.display = "none";
	};

	reset = () => {
		// Return to webcam view
		this.setState({ capture: "" });
	};

	upload = (location, map) => {
		//test values for lat and lng
		const newObj = {
			type: "capture",
			key: this.state.key,
			capture: this.state.capture,
			lat: location.lat,
			lng: location.lng,
		};

		API.sendLetter(newObj).then((result) => {
			console.log("Capture sendLetter result:");
			console.log(result);
			console.log("Capture sendLetter map:");
			console.log(map);

			if (result.status === 200) {
				// Draw the new marker on the map and pan
				this.props.drawMarker(result.data, map);
				const position = new window.google.maps.LatLng(newObj.lat, newObj.lng);
				map.panTo(position);
				this.props.closeLeaveModal();
			}
		});
		this.setState({ key: getUniqueKey(), capture: "" });
	};

	render() {
		/* const videoConstraints = {
			width: 1280,
			height: 720,
			facingMode: "user",
		}; */

		return (
			<div className="webcamContainer">
				{this.state.capture ? (
					<CaptureImg
						src={this.state.capture}
						reset={this.reset}
						upload={this.upload(this.props.location, this.props.map)}
					/>
				) : (
					<Webcam
						className="webcam"
						audio={false}
						ref={this.setRef}
						screenshotFormat="image/png"
						//videoConstraints={videoConstraints}
					/>
				)}
				<div className="captureBtnContainer">
					<i id="captureBtn" class="fas fa-record-vinyl fa-3x" onClick={this.capture}></i>
				</div>
				{/* <input type="submit" onClick={this.capture} value="Capture"></input> */}
			</div>
		);
	}
}

export default Capture;
