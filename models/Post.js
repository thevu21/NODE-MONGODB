const mongoose = require('mongoose')
const schema = mongoose.Schema

//tao models
const postsSchema = new schema({
    title:{
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('post', postsSchema)