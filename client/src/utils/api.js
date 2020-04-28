import axios from "axios";

export default {
	// save image from image capture
	saveImage: function (imageData, captureInfo) {
		// Remove header from data and keep the string
		let base64Image = imageData.split(";base64,").pop();
		console.log("api saveImage base64Image");
		//console.log(base64Image);
		console.log(captureInfo);
		// Send to server as string and convert it to an image
		axios
			.post("/api/images/save", { imageData: base64Image, captureInfo: captureInfo })
			.then((result) => {
				// send image info back to browser
				console.log("api saveImage result");
				console.log(result);
			});
	},
};
