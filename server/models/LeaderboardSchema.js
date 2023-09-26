const mongoose = require("mongoose");

const leaderboardSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    points: {
        type: Number,
        default: 0
    },
    time: {
        type: Number, // You can use Number to store time in seconds
        default: 100.000
    }
    // Add other fields as needed
},
{
    timestamps: true // Add this option to enable timestamps
});

const Leaderboard = mongoose.model("Leaderboard", leaderboardSchema);

module.exports = {Leaderboard};
