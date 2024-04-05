import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js"

dotenv.config();

const app = express();

mongoose.connect(process.env.MONGO)
.then(() => {
    console.log("Connected")
}).catch(() => {
    console.log("Not connected")
})

app.use("/api/user", userRoutes)

app.listen("4000", () => {
    console.log("Listening on port 400")
})

// mongodb+srv://tabrez:<password>@blog.akxexyx.mongodb.net/