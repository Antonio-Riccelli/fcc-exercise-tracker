const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: String,
    count: Number,
    log: [
        {
            description: String,
            duration: Number,
            date: {type: Date, 
                default: Date.now()
            },
        }
    ],
})

const User = mongoose.model("User", userSchema);

module.exports = User;