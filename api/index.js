import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
dotenv.config();

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO)
  .then(() => {
    console.log("Connected");
  })
  .catch((error) => {
    console.error("Connection error:", error);
  });

app.listen("4000", () => {console.log("Listening on port 4000")})

app.use("/api/user", userRoutes);
app.use('/api/auth', authRoutes);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
      success: false,
      statusCode,
      message,
    });
  });

// mongodb+srv://tabrez:<password>@blog.akxexyx.mongodb.net/