import React from "react";
import Webcam from "react-webcam";
import CaptureImg from "../../partials/CaptureImg";
//import API from "../../utils/api";

class WebcamCapture extends React.Component {
	constructor() {
		super();
		// set name of capture file for upload
		this.state = {
			id: "",
			captureName: "",
			key: 0,
			ocrResults: [],
		};
	}

	setRef = (webcam) => {
		this.webcam = webcam;
	};

	capture = () => {
		const imageSrc = this.webcam.getScreenshot();
		this.setState({
			captureName: this.state.id + "_image.png",
			key: this.state.key + 1,
		});
		//API.saveImage(imageSrc, this.state);
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
					<input type="submit" onClick={this.capture}></input>
					<CaptureImg
						key={this.state.key}
						captureName={this.state.captureName}
						ocr={this.ocr}
					/>
				</div>
			</div>
		);
	}
}

export default WebcamCapture;
