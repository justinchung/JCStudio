const mongoose = require('mongoose');

let Schema = mongoose.Schema;

const audioSchema = new Schema({
	name: String,
	type: String
})

const Audio = mongoose.model('Audio', audioSchema);

module.exports = Audio;