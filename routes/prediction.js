const router = require("express").Router();
const Prediction = require("../models/Prediction");
const User = require("../models/User");
const Score = require("../models/Score");

//POST NEW Prediction (user)
router.post("/", async (req, res) => {
    const newPrediction = new Prediction({
        userId: req.body.userId,
        matchId: req.body.matchId,
        fixtureId: req.body.fixtureId,
        homeTeamScorePrediction: req.body.homeTeamScorePrediction,
        awayTeamScorePrediction: req.body.awayTeamScorePrediction,
        resultPrediction: req.body.homeTeamScorePrediction > req.body.awayTeamScorePrediction
        ? "home team win"
        : req.body.homeTeamScorePrediction < req.body.awayTeamScorePrediction 
        ? "away team win" 
        :  "draw"
    });
    try {
        const savedPrediction = await newPrediction.save();
        const newScore = new Score({
            userId: req.body.userId,
            fixtureId: req.body.fixtureId,
            matchId: req.body.matchId
        })
        await newScore.save()
        res.status(200).json(savedPrediction);
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
});

//GET ALL Predictions of one user in one fixture
router.get("/:userId/:fixtureId", async (req, res) => {
    try {
        const predictions = await Prediction.find({
            userId: req.params.userId,
            fixtureId: req.params.fixtureId
        })
        res.status(200).json(predictions);
    } catch (error) {
        console.log(error.message)
        res.status(500).json(error);
    }
});

//EDIT Prediction (user)
router.put('/:predictionId', async (req, res) => {
    try {
        const resultPrediction = req.body.homeTeamScorePrediction > req.body.awayTeamScorePrediction
        ? "home team win"
        : req.body.homeTeamScorePrediction < req.body.awayTeamScorePrediction 
        ? "away team win" 
        :  "draw"
        const editedPrediction = await Prediction.findByIdAndUpdate(
            req.params.predictionId, 
            {$set: {
                homeTeamScorePrediction: req.body.homeTeamScorePrediction,
                awayTeamScorePrediction: req.body.awayTeamScorePrediction,
                resultPrediction
            }}, 
            { new: true }
        )
        res.status(200).json({msg: "prediction edited..", editedPrediction});
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
})

module.exports = router