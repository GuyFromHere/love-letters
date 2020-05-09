import React from "react";
import "./style.css";

export default function CaptureImg(props) {
	return (
		<div className="captureContainer">
			<img className="capturedImage" src={props.src} alt="Capture"></img>
			<div className="imageIcons">
				<i class="fas fa-cloud-upload-alt fa-3x" onClick={props.upload}></i>
				<i class="fas fa-ban fa-3x" onClick={props.reset}></i>
			</div>
		</div>
	);
}
