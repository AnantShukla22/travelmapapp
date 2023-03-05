const mongoose = require("mongoose");

const PinSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    title: {
        type: String,
        require: true
    },
    desc: {
        type: String,
        require: true
    },
    latitude: {
        type: Number,
        require: true
    },
    longitude: {
        type: Number,
        require: true
    }
},
    { timestamps: true })

//Mongoose schemas support a timestamps option. If you set timestamps: true, Mongoose will add two properties of type Date to your schema:
//createdAt: a date representing when this document was created
//updatedAt: a date representing when this document was last updated

module.exports = mongoose.model("Pin", PinSchema)