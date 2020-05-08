const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LetterSchema = new Schema({
	fileName: {
		type: String,
		required: false,
	},
	lat: {
		type: String,
		required: true
	},
	lng: {
		type: String,
		required: true
	},
	text: {
		type: String,
		required: false
	},
	type: {
		type: String,
		required: true,
	},
});

const Letter = mongoose.model("Letter", LetterSchema);

module.exports = Letter;
