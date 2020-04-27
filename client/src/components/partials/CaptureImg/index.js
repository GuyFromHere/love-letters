import React from "react";

const handleCapture = () => {
	console.log("you clicked capture");
};

export default function CaptureImg(props) {
	return (
		<div className="captureContainer">
			<img
				className="capture"
				//src={"https://chow-babe.s3.amazonaws.com/publicprefix/" + props.captureName}
				alt="Test"
			></img>
			<input type="submit" onClick={handleCapture()}></input>
		</div>
	);
}
