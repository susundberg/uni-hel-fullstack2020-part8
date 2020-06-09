const mongoose = require('mongoose')

const schemaBook = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        minlength: 2
    },
    published: {
        type: Number,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Author',
    },
    genres: [
        { type: String }
    ]
})


const schemaUser = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 3
    },
    favoriteGenre: {
        type:  String,
        required: true,
    },
})

const schemaAuthor = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        minlength: 4
    },
    born: {
        type: Number,
    },
    bookCount : {
        type: Number,
        required: true,
        default: 0,
    }
})

module.exports = {
    Author: mongoose.model('Author', schemaAuthor),
    Book: mongoose.model('Book', schemaBook),
    User:  mongoose.model('User', schemaUser),
}