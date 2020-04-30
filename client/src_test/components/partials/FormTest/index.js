import React from "react";

export default function FormTest(props) {
	const handleClick = () => {
		console.log("formtest handleclick");
		const canvas = document.getElementById("imageCanvas");
		const context = canvas.getContext("2d");
		const imageObj = new Image();

		imageObj.onload = function () {
			context.drawImage(imageObj, 69, 50);
		};
		imageObj.src = "https://www.html5canvastutorials.com/demos/assets/darth-vader.jpg";
	};

	// TEST

	return (
		<form>
			<button
				onClick={() => {
					handleClick();
				}}
			>
				CLICK
			</button>
		</form>
	);
}
