const axios = require("axios");
const express = require("express");
const router = express.Router();
const config = require("config");

const MAP = process.env.MAP || config.get("MAPS");

// @route   GET /api/letters/map/:location
// @desc    Get map from Google API
// @access  Public
router.get("/map/:location", (req, res) => {
	const uriStart = "https://maps.googleapis.com/maps/api/staticmap?center=";
	const uriEnd = "&zoom=14&size=400x400&key=";
	res.json({ uri: uriStart + req.params.location + uriEnd + MAP });
});

module.exports = router;
