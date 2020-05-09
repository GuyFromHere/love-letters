import axios from "axios";

export default {
	// save image from image capture
	saveImage: function (captureObj) {
		return axios.post("/api/letters/leave", captureObj);
	},
	// Send text letter
	sendLetter: function (letter) {
		return axios.post("/api/letters/leave", letter);
	},
	// get markers for each letter in the db
	getMarkers: function () {
		return axios.get("/api/letters/get");
	},
	// 
	searchMaps: function(query) {
		return axios.get("/api/letters/search/" + query )
	}
};
