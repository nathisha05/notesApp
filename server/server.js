import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import noteRoutes from "./routes/noteRoutes.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());

/* IMPORTANT ROUTES */
app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);

app.get("/", (req, res) => res.send("API running"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("Server running"));
