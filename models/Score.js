const mongoose = require("mongoose");

const ScoreSchema = new mongoose.Schema(
{
    userId: {type: String, required: true},
    fixtureId: {type: String, required: true},
    matchId: {type: String, required: true},
    points: {type: Number, default: 0},
},
{ timestamps: true }
);


module.exports = mongoose.model("Score", ScoreSchema);