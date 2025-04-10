const express = require("express");
const mongoose = require("mongoose");
const  adminRouter = require("./routes/admin");
const {cricketRouter,
    footballRouter,
    badmintonRouter,
    basketballRouter,
    carromRouter,
    kabaddiRouter
    } = require("./routes/matches");

const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/admin", adminRouter);
app.use("/matches", cricketRouter);
app.use("/football", footballRouter);
app.use("/basketball", basketballRouter);
app.use("/kabaddi", kabaddiRouter);
app.use("/carrom", carromRouter);
app.use("/badminton", badmintonRouter);


async function main() {
    await mongoose.connect(process.env.MONGO_URL);
    app.listen(process.env.PORT);
    console.log("connected to db");
}

main();