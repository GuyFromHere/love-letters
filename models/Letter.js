const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LetterSchema = new Schema({
	key: {
		type: String,
		required: false,
	},
	type: {
		type: String,
		required: true,
	},
	location: {
		type: String,
	},
});

const Letter = mongoose.model("Letter", LetterSchema);

module.exports = Letter;
