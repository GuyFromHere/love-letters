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


const MAPS = process.env.MAPS || config.get("MAPS");

// @route   GET /api/letters/map/:location
// @desc    Get map from Google API
// @access  Public
router.get("/map/:location", (req, res) => {
	// test geocode: Zip -> Coordinates
	// get lat and longitude from Zip 
	axios.get(uriStart + geoCodeArgs + req.params.location + uriKeyPrefix + MAPS).then(results => {
		console.log('geouri results')
		console.log(results.data.results[0].geometry.location)
	}).catch(err => { console.log(err) })          
	res.json({ uri: uriStart + staticMapArgs  + req.params.location + uriKeyPrefix + MAPS });

});

// @route   POST /api/letters/leave/
// @desc    Put a letter in the database
// @access  Public
router.post("/leave", (req, res) => {
	// Check letter type (image vs. text) 
	// Upload and save URL if it's an image...

	const newObj = {
		location: req.body.location,
	}
	if ( req.body.type === "text" ) {
		newObj.text = req.body.letter;
		newObj.type = req.body.type;
	}
	Letter.create(newObj)
		.then(data => {
			res.json(data);
		})
		.catch((err) => console.log(err));
});



module.exports = router;
