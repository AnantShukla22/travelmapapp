const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const pinRoute = require("./routes/pins");
const userRoute = require("./routes/users");
var cors = require('cors')

const app = express();

app.use(cors())

dotenv.config()  // to make proces.env work

app.use(express.json())  // to read json or to input json

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("connected to mongo")
}).catch((err) => console.log)

// app.use, making use of modal

app.use("/api/pins", pinRoute)
app.use("/api/users", userRoute)


app.listen(5000, () => {
    console.log("server is running")
})