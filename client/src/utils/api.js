import axios from "axios";

export default {
	// save image from image capture
	saveImage: function (captureObj) {
		console.log('api saveImage');
		console.log(captureObj);
		// Remove header from data and keep the string
		//let base64Image = captureData.capture.split(";base64,").pop();
		return axios.post("/api/letters/leave", captureObj );
	},
	// Send text letter
	sendLetter: function (letter) {
		return axios.post("/api/letters/leave", letter);
	},
	// get markers for each letter in the db
	getMarkers: function () {
		return axios.get("/api/letters/get");
	},
};
