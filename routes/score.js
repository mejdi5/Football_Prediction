const router = require("express").Router();
const Score = require("../models/Score");
const Fixture = require("../models/Fixture");
const Prediction = require("../models/Prediction");


//Post user scores
router.post("/", async (req, res) => {
    const newScore = new Score(req.body);
    try {
        const savedScore = await newScore.save();
        res.status(200).json(savedScore);
    } catch (error) {
        res.status(500).json(error);
    }
});


//GET all scores
router.get("/", async (req, res) => {
    try {
        const scores = await Score.find()
        res.status(200).json(scores);
    } catch (error) {
        res.status(500).json(error);
    }
});

//GET scores of one fixture
router.get("/:fixtureId", async (req, res) => {
    try {
        const fixtureScores = await Score.find({fixtureId: req.params.fixtureId})
        res.status(200).json(fixtureScores);
    } catch (error) {
        res.status(500).json(error);
    }
});

//GET scores of one user in one fixture
router.get("/:userId/:fixtureId", async (req, res) => {
    try {
        const fixtureUserScores = await Score.find({
            userId: req.params.userId,
            fixtureId: req.params.fixtureId
        })
        res.status(200).json(fixtureUserScores);
    } catch (error) {
        res.status(500).json(error);
    }
});


//EDIT score
router.put('/:userId/:fixtureId/:matchId', async (req, res) => {
    try {
        const fixture = await Fixture.findById(req.params.fixtureId)
        const match = fixture.matches.find(m => m._id.toString() === req.params.matchId)
        const prediction = await Prediction.findOne({
            userId: req.params.userId,
            fixtureId: req.params.fixtureId,
            matchId: req.params.matchId,
        })
        const scoreToEdit = await Score.findOne({
            userId: req.params.userId,
            fixtureId: req.params.fixtureId,
            matchId: req.params.matchId,
        })
        const rightWinner = prediction ? match.result === prediction.resultPrediction : false
        const rightHomeTeamScore = prediction ? match.homeTeamScore === prediction.homeTeamScorePrediction : false
        const rightAwayTeamScore = prediction ? match.awayTeamScore === prediction.awayTeamScorePrediction : false
        const rightGoalDifference = prediction ? (match.homeTeamScore - match.awayTeamScore) === (prediction.homeTeamScorePrediction - prediction.awayTeamScorePrediction) : false
            if(rightWinner && rightHomeTeamScore && rightAwayTeamScore) {
                await Score.findOneAndUpdate({
                _id: scoreToEdit._id
                }, 
                {$set: {
                    points: scoreToEdit.points + 6
                }}, 
                { new: true }
                )
            } else if (rightWinner && !rightHomeTeamScore && !rightAwayTeamScore && !rightGoalDifference) {
                await Score.findOneAndUpdate({
                    _id: scoreToEdit._id
                    }, 
                    {$set: {
                        points: scoreToEdit.points + 3
                    }}, 
                    { new: true }
                )
            } else if((rightWinner && rightHomeTeamScore && !rightAwayTeamScore && !rightGoalDifference) ||
                (rightWinner && !rightHomeTeamScore && rightAwayTeamScore && !rightGoalDifference) || 
                (rightWinner && !rightHomeTeamScore && !rightAwayTeamScore && rightGoalDifference)) {
                await Score.findOneAndUpdate(
                    {_id: scoreToEdit._id},
                    {$set: {
                        points: scoreToEdit.points + 4
                    }}, 
                    { new: true }
                )
            } else if((!rightWinner && rightHomeTeamScore && !rightAwayTeamScore) ||
                (!rightWinner && !rightHomeTeamScore && rightAwayTeamScore)) {
                await Score.findOneAndUpdate(
                    {_id: scoreToEdit._id},
                    {$set: {
                        points: scoreToEdit.points + 1
                    }}, 
                    { new: true }
                )
            } else {
                await Score.findOneAndUpdate(
                    {_id: scoreToEdit._id},
                    {$set: {
                        points: scoreToEdit.points 
                    }}, 
                    { new: true }
                )}
        res.status(200).json("score edited..");
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
})

router.delete('/:scoreId', async (req, res) => {
    try {        
            await Score.findByIdAndDelete(req.params.scoreId)
        res.status(200).json({msg: "scores deleted.."});
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
})

module.exports = router