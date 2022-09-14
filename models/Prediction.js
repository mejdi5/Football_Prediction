const mongoose = require("mongoose");

const PredictionSchema = new mongoose.Schema(
{
    userId: {type: String, required: true},
    fixtureId: {type: String, required: true},
    matchId: {type: String, required: true},
    homeTeamScorePrediction: {type: Number, required: true},
    awayTeamScorePrediction: {type: Number, required: true},
    resultPrediction: {type: String}
},
{ timestamps: true }
);


module.exports = mongoose.model("Prediction", PredictionSchema);