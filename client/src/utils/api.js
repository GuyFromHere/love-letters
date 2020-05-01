import axios from "axios";

export default {
	// save image from image capture
	saveImage: function (imageData, captureInfo) {
		// Remove header from data and keep the string
		let base64Image = imageData.split(";base64,").pop();

		// Send to server as string and convert it to an image
		axios.post("/api/images/save", { imageData: base64Image, captureInfo: captureInfo });
	},
	// Get  URI for a static Google map of the specified location
	getLocation: function (location) {
		return axios.get("/api/letters/map/" + location);
	},
};
