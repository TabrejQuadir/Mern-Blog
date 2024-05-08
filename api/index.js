import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import postRoutes from './routes/post.route.js';
import commentRoutes from './routes/comment.route.js';
import cookieParser from "cookie-parser";
// import multer from "multer";
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/') // specify the directory where files will be stored
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + '-' + file.originalname) // generate unique filename
//   }
// });

// const upload = multer({ storage: storage });

// app.post('/upload', (req, res, next) => {
//   upload.single('image')(req, res, function (err) {
//     if (err instanceof multer.MulterError) {
//       // A Multer error occurred when uploading.
//       return res.status(400).json({ success: false, message: err.message });
//     } else if (err) {
//       // An unknown error occurred.
//       return res.status(500).json({ success: false, message: 'Internal Server Error' });
//     }
//     // File uploaded successfully.
//     // Construct the imageUrl based on your server setup.
//     const imageUrl = `http://localhost:4000/uploads/${req.file.filename}`;
//     res.json({ success: true, message: 'File uploaded successfully', imageUrl: imageUrl });
//   });
// });


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