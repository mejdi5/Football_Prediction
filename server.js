const express = require('express')
const app = express()
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require('morgan')


dotenv.config();
//database connection
mongoose
    .connect(process.env.MONGO_URI) 
    .then(() => console.log("Database connected.."))
    .catch((error) => {
    console.log(error, "Database is not connected..");
});

//deploy
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('../frontend/build'));
    app.get('/*', (req, res) => {
        res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'));
    });
}

app.use(cors())
app.use(express.json())
//app.use(morgan("dev"));


app.use("/api/users", require("./routes/user"));
app.use("/api/fixtures", require("./routes/fixture"));
app.use("/api/predictions", require("./routes/prediction"));
app.use("/api/scores", require("./routes/score"));


app.listen(process.env.PORT || 5000, () => {
    console.log("server is running!!"); 
});