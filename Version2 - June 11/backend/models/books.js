//Mongoose import
var mongoose = require('mongoose');

//Declaring schema
const schema = mongoose.Schema;

//Created new Schema for books
var booksSchema = new schema ({
	book_id: Number,
    cover_image : String,
    title: String,
    author: String,
    cat_id :String,
    category : String
});

//Exported reference model
module.exports = mongoose.model('books', booksSchema);