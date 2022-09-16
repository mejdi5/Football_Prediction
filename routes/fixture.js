const router = require("express").Router();
const Fixture = require("../models/Fixture");


//POST NEW Fixture (admin)
router.post("/", async (req, res) => {
    const newFixture = new Fixture(req.body);
    try {
        const savedFixture = await newFixture.save();
        res.status(200).json(savedFixture);
    } catch (error) {
        res.status(500).json(error);
    }
});

//GET ALL Fixtures
router.get("/", async (req, res) => {
    try {
        const fixtures = await Fixture.find()
        res.status(200).json(fixtures);
    } catch (error) {
        res.status(500).json(error);
    }
});

//GET one Fixture
router.get("/:fixtureId", async (req, res) => {
    try {
        const fixture = await Fixture.findOne({_id: req.params.fixtureId})
        res.status(200).json(fixture);
    } catch (error) {
        res.status(500).json(error);
    }
});

//EDIT Fixture (admin)
router.put('/:fixtureId', async (req, res) => {
    try {
        const editedFixture = await Fixture.findByIdAndUpdate(
            req.params.fixtureId, 
            {$set: req.body}, 
            { new: true }
        )
        res.status(200).json({msg: "fixture edited..", editedFixture});
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
})

//set Fixture as calculated (admin)
router.put('/calculate/:fixtureId', async (req, res) => {
    try {
        const editedFixture = await Fixture.findByIdAndUpdate(
            req.params.fixtureId, 
            {$set: {
                isCalculated: true
            }}, 
            { new: true }
        )
        res.status(200).json({msg: "fixture calculated..", editedFixture});
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
})

//Add one match to fixture (admin)
router.put('/add-match/:fixtureId', async (req, res) => {
    try {
        const fixtureToEdit = await Fixture.findById(req.params.fixtureId)
        const editedFixture = await Fixture.findByIdAndUpdate(
            req.params.fixtureId, 
            {$set: {
                matches: [
                    ...fixtureToEdit.matches,
                    req.body
                ]
            }}, 
            { new: true }
        )
        res.status(200).json({msg: "match added..", editedFixture});
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
})


//EDIT matches scores (admin)
router.put('/:fixtureId/:matchId', async (req, res) => {
    try {
        const result = req.body.homeTeamScore > req.body.awayTeamScore  
        ? "home team win"
        : req.body.homeTeamScore < req.body.awayTeamScore 
        ? "away team win" 
        :  "draw"
        const fixtureToEdit = await Fixture.findByIdAndUpdate(req.params.fixtureId)
        const matchToEdit = fixtureToEdit.matches.find(match => match?._id.toString() === req.params.matchId)
        const editedMatch = {
            _id: matchToEdit._id,
            homeTeam: matchToEdit.homeTeam,
            awayTeam: matchToEdit.awayTeam,
            homeTeamScore: req.body.homeTeamScore,
            awayTeamScore: req.body.awayTeamScore,
            result
        }
        const editedFixture = await Fixture.findByIdAndUpdate(
            req.params.fixtureId, 
            {$set: {
                matches: [
                    ...fixtureToEdit.matches.filter(match => match?._id !== editedMatch?._id),
                    editedMatch
                ]
            }}, 
            { new: true }
        )
        res.status(200).json({msg: "match edited..", editedFixture});
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
})

//delete a match from a fixture (admin)
router.put('/delete-match/:fixtureId/:matchId', async (req, res) => {
    try {
        const fixtureToDelete = await Fixture.findById(req.params.fixtureId)
        const editedFixture = await Fixture.findByIdAndUpdate(
            req.params.fixtureId, 
            {$set: {
                matches: fixtureToDelete.matches.filter(match => match._id.toString() !== req.params.matchId)
            }}, 
            { new: true }
        )
        res.status(200).json({msg: "match deleted..", editedFixture});
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
})

//DELETE Fixture (admin)
router.delete("/:fixtureId", async (req, res) => {
    try {
    await Fixture.findByIdAndDelete({_id: req.params.fixtureId});
        res.status(200).json("Fixture has been deleted...");
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router