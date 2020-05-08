const axios = require("axios");
const express = require("express");
const router = express.Router();
const config = require("config");
const AWS = require("aws-sdk");
const Letter = require("../models/Letter");

//////////////////////
// Maps api variables
const uriStart = "https://maps.googleapis.com/maps/api/";
const uriKeyPrefix = "&key=";
const staticMapArgs = "staticmap?zoom=14&size=400x400&center=";
const geoCodeArgs = "geocode/json?sensor=false&components=postal_code:";
const embedStart = "https://www.google.com/maps/embed/v1/place?q=";
const MAPS_CLIENT = process.env.MAPS_CLIENT || config.get("MAPS_CLIENT");
const MAPS_SERVER = process.env.MAPS_SERVER || config.get("MAPS_SERVER");
//////////////////////
// AWS
const BUCKET = process.env.BUCKET || config.get("BUCKET");
const ID = process.env.ID || config.get("ID");
const SECRET = process.env.SECRET || config.get("SECRET");
// Get S3 bucket
const s3 = new AWS.S3({
	accessKeyId: ID,
	secretAccessKey: SECRET,
});
// Upload function
const uploadFile = (imageFile, filename) => {
	const fileContent = new Buffer.from(imageFile, "base64");
	const params = {
		Bucket: BUCKET,
		Key: filename, // File name you want to save as in S3
		Body: fileContent,
		ContentEncoding: "base64",
		ContentType: "image/png",
	};
	// Uploading files to the bucket
	s3.upload(params, function (err, data) {
		if (err) {
			throw err;
		}
		console.log(`File uploaded successfully. ${data.Location}`);
	});
};

// @route   POST /api/letters/leave/
// @desc    Put a letter in the database
// @access  Public
router.post("/leave", (req, res) => {
	// Check letter type (capture vs. text)
	// Upload and save URL if it's an image...
	const newObj = {
		lat: req.body.lat,
		lng: req.body.lng,
		type: req.body.type,
	};

	if (newObj.type === "letter") {
		newObj.text = req.body.text;
	} else {
		// Remove header from data and keep the string
		let base64Image = req.body.capture.split(";base64,").pop();
		newObj.fileName = req.body.key + "_image.png";
		// Upload base64 image directly to AWS...
		uploadFile(base64Image, newObj.fileName);
	}
	Letter.create(newObj)
		.then((data) => {
			res.json(data);
		})
		.catch((err) => console.log(err));
});

// @route   GET /api/letters/get/
// @desc    Returns letters so they can be drawn on the map
// @access  Public
router.get("/get", (req, res) => {
	Letter.find().then((results) => {
		res.json(results);
	});
});

module.exports = router;
