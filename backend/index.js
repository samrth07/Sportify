const express = require("express");
const mongoose = require("mongoose");
const  adminRouter = require("./routes/admin");
const sportRouter = require("./routes/matches");
const userRouter = require('./routes/community')
const creatorRouter = require('./routes/creator');

const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/admin", adminRouter);
app.use("/matches", sportRouter);
app.use('/user', userRouter);
app.use('/creator', creatorRouter);


async function main() {
    await mongoose.connect(process.env.MONGO_URL);
    app.listen(process.env.PORT);
    console.log("connected to db");
}

main();