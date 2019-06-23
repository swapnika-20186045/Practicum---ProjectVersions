//Mongoose import
var mongoose = require('mongoose');

//Declaring schema
const schema = mongoose.Schema;

//Created new Schema for geners
var genresSchema = new schema ({
	phonenum: Number,
	G1: String,
	G2: String,
	G3: String,
	G4: String,
	G5: String,
});

//Exported reference model
module.exports = mongoose.model('genres', genresSchema);