const router = require("express").Router();
const User = require("../models/User");
const Score = require("../models/Score");
const Prediction = require("../models/Prediction");

//register 
router.post('/register', async (req, res) => {
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })
    try {
        const savedUser = await newUser.save();
        res.status(201).json({ msg: 'Registred with success', savedUser}); 
    } catch (error) {
        console.log(error)
    }
})

//login
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        !user && res.status(401).json({msg: "Wrong email or password!"}); //wrong email
        user.password !== req.body.password && res.status(401).json({msg: "Wrong email or password!"}); //wrong password
		return res.status(200).send({ msg: "Logged with success", user });
    } catch (error) {
        res.status(500).json({msg: "server error", error: error.message}); 
    }
})


//GET ALL USERS
router.get("/", async (req, res) => {
    try {
        const users = await User.find().sort({ createdAt: -1 })
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json(error); 
    }
});

//EDIT USER
router.put('/:userId', async (req, res) => {
    try {
        const editedUser = await User.findByIdAndUpdate(
            req.params.userId, 
            {$set: req.body}, 
            { new: true }
        )
        res.status(200).json({msg: "User edited..", editedUser});
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
})

//DELETE USER
router.delete('/:userId', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.userId)
        res.status(200).json({msg: "User deleted.."});
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }  
})


module.exports = router