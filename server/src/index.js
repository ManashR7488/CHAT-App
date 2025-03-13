import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app, server } from "./lib/socket.js";
import path from "path";

dotenv.config();
const __dirname = path.resolve();

const port = process.env.PORT || 5000;

app.use(cookieParser());

// Use the CORS middleware with our options
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use(express.json({ limit: "5mb" })); // Increase to 5MB or more as needed
app.use(express.urlencoded({ limit: "5mb", extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "../client/dist")));
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "../client", "dist", "index.html"));
	});
}

server.listen(port,async () => {
  console.log(`Server is running on port ${port}`);
  // process.env.MONGODB_URI && console.log("MONGODB_URI is define");
   await connectDB()
  process.env.NODE_ENV === "development" && console.log(`http://localhost:${port}`);
}); 
