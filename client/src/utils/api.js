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
	// Send text letter
	sendLetter: function (location, letterText) {
		return axios.post("/api/letters/leave", {
			location: location,
			letter: letterText,
			type: "text",
		});
	},
	// get Embedded map
	getEmbed: function (location) {
		return axios.post("/api/letters/location", { location: location });
	},
	// get markers for each letter in the db
	getMarkers: function () {
		return axios.get("/api/letters/get");
	},
};
