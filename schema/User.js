const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    count: Number,
    log: [
        {
            description: String,
            duration: Number,
            date: {type: Date, 
                default: () => new Date().toDateString(),
            },
        }
    ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;