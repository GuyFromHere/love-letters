import React, { Component } from "react";
import Webcam from "react-webcam";
import CaptureImg from "../../partials/CaptureImg";
import API from "../../../utils/api.js";
import "./style.css";

const getUniqueKey = () => {
	const keyOffset = new Date();
	const rand = Math.floor(Math.random() * keyOffset);
	return rand;
};

class Capture extends Component {
	constructor() {
		super();
		// initialize empty state variable
		this.state = { key: getUniqueKey() };
	}

	setRef = (webcam) => {
		this.webcam = webcam;
	};

	capture = () => {
		// Get capture from webcam
		const imageData = this.webcam.getScreenshot();

		// load captured image in to img element
		this.setState({ capture: imageData });
	};

	reset = () => {
		// Return to webcam view
		this.setState({ capture: "" });
	};

	upload = () => {
		// Perform upload...sending all state variables in case I want to send extra info in the route
		API.saveImage(this.state.capture, this.state.key);
		this.setState({ key: getUniqueKey(), capture: "" });
	};

	render() {
		const videoConstraints = {
			width: 1280,
			height: 720,
			facingMode: "user",
		};

		const divStyle = {
			padding: 0,
			marginTop: 80,
			marginBottom: 20,
		};

		return (
			<div className="container">
				<div className="webcamContainer" style={divStyle}>
					{this.state.key ? <h1>{this.state.key}</h1> : <h1>key here</h1>}
					{this.state.capture ? (
						<CaptureImg
							src={this.state.capture}
							reset={this.reset}
							upload={this.upload}
						/>
					) : (
						<Webcam
							className="webcam"
							audio={false}
							ref={this.setRef}
							width={350}
							screenshotFormat="image/png"
							videoConstraints={videoConstraints}
						/>
					)}
					<br></br>
					<input type="submit" onClick={this.capture} value="Capture"></input>
				</div>
			</div>
		);
	}
}

export default Capture;
