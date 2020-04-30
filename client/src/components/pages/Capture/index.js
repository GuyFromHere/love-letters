import React from "react";
import Webcam from "react-webcam";
import API from "../../../utils/api.js";

const getUniqueKey = () => {
	const keyOffset = new Date();
	const rand = Math.floor(Math.random() * keyOffset);
	console.log(rand);
	return rand;
};

class WebcamCapture extends React.Component {
	constructor() {
		super();
		const urlRoot = "https://love-letters-gfh.s3-us-west-2.amazonaws.com/publicprefix/";
		// Initialize state and set key
		this.state = {
			captureName: "",
			key: "",
		};
	}

	setRef = (webcam) => {
		this.webcam = webcam;
	};

	capture = () => {
		//console.log("Capture.js capture imageSrc:");
		// Get capture from webcam
		const imageData = this.webcam.getScreenshot();

		// Set capture name for upload
		this.setState({});
		// Perform upload...sending all state variables in case I want to send extra info in the route
		API.saveImage(imageData, this.state);

		// Get new key value for next image.
		this.setState({
			key: getUniqueKey(),
			captureName: this.state.key + "_image.png",
		});
	};

	componentDidMount() {
		this.setState({
			key: getUniqueKey(),
			captureName: this.state.key + "_image.png",
		});
	}

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
					<h1>{this.state.captureName}</h1>
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
					<img src={this.urlRoot + this.state.captureName} alt="TEST"></img>
				</div>
			</div>
		);
	}
}

export default WebcamCapture;
