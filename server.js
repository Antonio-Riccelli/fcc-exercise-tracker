const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');
require('dotenv').config();//import config.env file
const User = require("./schema/User.js");
const ExerciseLog = require("./schema/ExerciseLog.js");
const multer  = require('multer');
const url = process.env.MONGO_URL;
const app = express();
const upload = multer();

app.use(cors());
app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));

mongoose.connect(url, () => {
    console.log("Yahoo, we're connected!")
});

const db = mongoose.connection;

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/index.html");
})

app.get("/api/users", async function (req, res, next) {
    const allUsers = await User.find({})
    console.log("All the users: ", allUsers)
    const arrOfUsers = allUsers.map(el => {return {"username": el.username, "_id": el._id}})
    res.send({arrOfUsers})
})

app.get("/api/users/:_id/logs", upload.none(), async function (req, res, next) {
    const id = String(req.params._id);
    const retrievedUser = await User.findById(id);
    await User.find

    res.send({retrievedUser});
})

app.post("/api/users", upload.none(), async function (req, res, next) {
    const username = req.body.username;
    const newUser = await User.create({"username": username});
    console.log("The new user: ", newUser);
    res.send({username: newUser.username, _id: newUser._id});
})

app.post("/api/users/:_id/exercises", upload.none(), async function (req, res, next) {
    const id = String(req.params._id);
    const description = req.body.description;
    const duration = req.body.duration;
    const date = (req.body.date) ? req.body.date : new Date().toDateString();
    const newLogEntry = {
        "description": description,
        "duration": duration,
        "date": date
    }

    const retrievedUser = await User.findByIdAndUpdate(id, {$push: {log: newLogEntry}});
    await User.findByIdAndUpdate(id, {$inc: {count: 1}});
    console.log(retrievedUser);
    
    const userToReturn = {
        "username": retrievedUser.username,
        "description": description,
        "duration": duration,
        "date": date,
        "_id": retrievedUser._id
    }

    res.send({userToReturn});
})




const listener = app.listen(process.env.PORT || 3000, () => {
    console.log("Listening on port " + listener.address().port);})