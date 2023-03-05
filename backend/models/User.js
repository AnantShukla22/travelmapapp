const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        min: 3,
        max: 20,
        unique: true
    },
    email: {
        type: String,
        require: true,
        max: 40,
        unique: true
    },
    password: {
        type: String,
        require: true,
        min: 7,
    },
},
    { timestamps: true })

    //Mongoose schemas support a timestamps option. If you set timestamps: true, Mongoose will add two properties of type Date to your schema:
    //createdAt: a date representing when this document was created
    //updatedAt: a date representing when this document was last updated

    module.exports=mongoose.model("User",UserSchema)