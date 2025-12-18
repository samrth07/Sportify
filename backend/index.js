import express from "express";
import mongoose from "mongoose";
import adminRouter from "./routes/admin.js"
import sportRouter from "./routes/matches.js";
import creatorRouter from './routes/creator.js';
import userRouter from './routes/community.js'



import cors from "cors";
import dotenv from "dotenv";
dotenv.config();


const app = express();
app.use(cors());
app.use(express.json());

app.use("/admin", adminRouter);
app.use("/matches", sportRouter);
app.use('/user', userRouter);
app.use('/creator/live', creatorRouter);


async function main() {
    await mongoose.connect(process.env.MONGO_URL);
    app.listen(process.env.PORT);
    console.log("connected to db");
}

main();