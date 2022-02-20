const mongoose = require('mongoose');

const ExerciseLogSchema = new mongoose.Schema({
    count: Number,
    log: [
        {
            description: String,
            duration: Number,
            date: {type: Date, 
                default: () => Date.now()
            },
        }
    ],
})

const ExerciseLog = mongoose.model("ExerciseLog", ExerciseLogSchema);

module.exports = ExerciseLog;