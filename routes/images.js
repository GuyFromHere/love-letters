const axios = require("axios");
const express = require("express");
const router = express.Router();
const config = require("config");
const AWS = require("aws-sdk");
const fs = require("fs");

//////////////////////
// AWS

// Heroku:
const BUCKET = process.env.BUCKET || config.get("BUCKET");
const ID = process.env.ID || config.get("ID");
const SECRET = process.env.SECRET || config.get("SECRET");

const s3 = new AWS.S3({
	accessKeyId: ID,
	secretAccessKey: SECRET,
});

const uploadFile = (imageFile, filename) => {
	const fileContent = fs.readFileSync(imageFile);
	// Setting up S3 upload parameters
	const params = {
		Bucket: BUCKET,
		Key: filename, // File name you want to save as in S3
		Body: fileContent,
	};
	// Uploading files to the bucket
	s3.upload(params, function (err, data) {
		if (err) {
			throw err;
		}
		console.log(`File uploaded successfully. ${data.Location}`);
	});
};

// @route   POST /api/images/save
// @desc    Save images test route
// @access  Private
// router.post("/save", auth, (req, res) => {
router.post("/save", (req, res) => {
	const newFileName = req.body.captureInfo.captureName;
	// save image to root of the application
	fs.writeFile(newFileName, req.body.imageData, { encoding: "base64" }, function (err, fileData) {
		// Upload file to bucket
		uploadFile(newFileName, newFileName);
	});
});

module.exports = router;
