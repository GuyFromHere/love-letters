import React from "react";
import Webcam from "react-webcam";
import CaptureImg from "../../partials/CaptureImg";
import API from "../../../utils/api.js";

class WebcamCapture extends React.Component {
	constructor() {
		super();
		// set name of capture file for upload
		this.state = {
			captureName: "",
			captureData: "",
			key: 0,
		};
	}

	setRef = (webcam) => {
		this.webcam = webcam;
	};

	capture = () => {
		//console.log("Capture.js capture imageSrc:");
		// Get capture from webcam
		const imageData = this.webcam.getScreenshot();
		this.setState({
			captureData: imageData,
			captureName: this.state.key + "_image.png",
		});
		// Set capture name for upload
		this.setState({});
		// Perform upload...sending all state variables in case I want to send extra info in the route
		API.saveImage(imageData, this.state);
		// Iterate key value for next image.
		this.setState({
			key: this.state.key + 1,
		});
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
					<Webcam
						className="webcam"
						audio={false}
						ref={this.setRef}
						width={350}
						screenshotFormat="image/png"
						videoConstraints={videoConstraints}
					/>
					<br></br>
					<input type="submit" onClick={this.capture} value="Capture"></input>
					<CaptureImg captureName={this.state.captureName} />
				</div>
			</div>
		);
	}
}

export default WebcamCapture;
