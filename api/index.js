import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import postRoutes from './routes/post.route.js';
import commentRoutes from './routes/comment.route.js';
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path"

const __dirname = path.resolve();

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());



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
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);

app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

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