var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
	
var player = new Schema({
	idDevice: String,
	name: String,
	score: Number,
	level: String,
	positions: String,
	attemps: String,
	lastDate: String,
	like: String,
	os: String,
	model: String,
	pos:Number
});

module.exports = mongoose.model('Player',player);