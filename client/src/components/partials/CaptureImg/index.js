import React from "react";
import imgSrc from "../../../images/bitlocker1.png";

const handleCapture = () => {
	console.log("you clicked save");
};

export default function CaptureImg(props) {
	return (
		<div className="captureContainer">
			<img
				className="capture"
				src="https://media.tmicdn.com/catalog/product/cache/393572b8c1f13fa8b2ac03b51a17cd45/g/l/glitterunicorn_2_.jpg"
				alt="Test"
			></img>
			<br></br>
			<input type="submit" onClick={handleCapture()} value="Save"></input>
		</div>
	);
}
