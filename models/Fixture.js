const mongoose = require("mongoose");

const FixtureSchema = new mongoose.Schema(
{
    fixtureNumber: {type: Number, required: true, unique: true},
    matches: [
        {
            homeTeam: {type: String, required: true},
            awayTeam: {type: String, required: true},
            homeTeamScore: {type: Number, default: null},
            awayTeamScore: {type: Number, default: null},
            result: {
                type: String, 
                enum: ["home team win", "away team win", "draw"], 
                default: null
            }
        }
    ],
    deadline: {type: Date, required: true},
    isCalculated: {type: Boolean, default: false}
},
{ timestamps: true }
);


module.exports = mongoose.model("Fixture", FixtureSchema);