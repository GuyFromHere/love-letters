const axios = require("axios");
const express = require("express");
const router = express.Router();
const config = require("config");
const Letter = require("../models/Letter");


const MAP = process.env.MAPS || config.get("MAPS");

// @route   GET /api/letters/map/:location
// @desc    Get map from Google API
// @access  Public
router.get("/map/:location", (req, res) => {
	const uriStart = "https://maps.googleapis.com/maps/api/staticmap?center=";
	const uriEnd = "&zoom=14&size=400x400&key=";
	res.json({ uri: uriStart + req.params.location + uriEnd + MAP });
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
