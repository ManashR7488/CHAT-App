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

const port = process.env.PORT || 3000;

app.use(cookieParser());

const FRONTEND_URL = (process.env.NODE_ENV === "development") ? "http://localhost:5173" : "https://mr2-chats.vercel.app/";
app.use(
  cors({
    origin: "https://mr2-chats.vercel.app/",
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);
app.use(express.json({ limit: "5mb" })); // Increase to 10MB or more as needed
app.use(express.urlencoded({ limit: "5mb", extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.get("/",(req, res)=>{
  res.send("app is runing");
})

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "../client/build")));

//   app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "../client", "dist", "index.html"));
//   });
// }

server.listen(port,async () => {
  console.log(`Server is running on port ${port}`);
  process.env.MONGODB_URI && console.log("MONGODB_URI is define");
   await connectDB();
  process.env.NODE_ENV === "development" && console.log(`http://localhost:${port}`);
}); 
