import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
dotenv.config();

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO)
.then(() => {console.log("Connected")})
.catch(() => { console.log("Not connected")})

app.listen("4000", () => {console.log("Listening on port 400")})

app.use("/api/user", userRoutes);
app.use('/api/auth', authRoutes);

// mongodb+srv://tabrez:<password>@blog.akxexyx.mongodb.net/