const axios = require("axios");
const express = require("express");
const router = express.Router();
const config = require("config");
const Letter = require("../models/Letter");

// Maps api variables
const uriStart = "https://maps.googleapis.com/maps/api/";
const uriKeyPrefix = "&key=";
const staticMapArgs = "staticmap?zoom=14&size=400x400&center=";
const geoCodeArgs = "geocode/json?sensor=false&components=postal_code:";
const embedStart = "https://www.google.com/maps/embed/v1/place?q=";

const MAPS_CLIENT = process.env.MAPS_CLIENT || config.get("MAPS_CLIENT");
const MAPS_SERVER = process.env.MAPS_SERVER || config.get("MAPS_SERVER");

// @route   GET /api/letters/map/:location
// @desc    Get map from Google API
// @access  Public
router.get("/map/:location", (req, res) => {
	// TEST geocode api:
	// Accepts zip code as request param, converts to lat and lon and prints to console
	//
	axios
		.get(uriStart + geoCodeArgs + req.params.location + uriKeyPrefix + MAPS_SERVER)
		.then((results) => {
			console.log("geouri results");
			console.log(results.data.results[0].geometry.location);
		})
		.catch((err) => {
			console.log(err);
		});
	// return Google static map of the specified zip code
	res.json({ uri: uriStart + staticMapArgs + req.params.location + uriKeyPrefix + MAPS_CLIENT });
});

// @route   POST /api/letters/leave/
// @desc    Put a letter in the database
// @access  Public
router.post("/leave", (req, res) => {
	// Check letter type (image vs. text)
	// Upload and save URL if it's an image...
	const newObj = {
		lat: req.body.lat,
		lng: req.body.lng
	};
	if (req.body.type === "letter") {
		newObj.text = req.body.text;
		newObj.type = req.body.type;
	}
	Letter.create(newObj)
		.then((data) => {
			res.json(data);
		})
		.catch((err) => console.log(err));
});

// @route   GET /api/letters/location/
// @desc    Returns google embed URI for the given location
// @access  Public
router.post("/location", (req, res) => {
	res.json({ uri: embedStart + req.body.location + uriKeyPrefix + MAPS_CLIENT });
});

// @route   GET /api/letters/get/
// @desc    Returns letters so they can be drawn on the map
// @access  Public
router.get("/get", (req, res) => {
	Letter.find().then((results) => {
		res.json(results);
		//res.json({ uri: embedStart + req.body.location + uriKeyPrefix + MAPS_CLIENT });
	});
});

module.exports = router;
