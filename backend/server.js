import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.route.js";
import cookieParser from "cookie-parser";

const server = express()
const PORT = process.env.PORT || 3000
dotenv.config()

// Middlewares
const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
    optionSuccessStatus: 200
}
server.use(cors(corsOptions))
server.use(express.json())
server.use(express.urlencoded({ extended: true }))
server.use(cookieParser())

// Routes
server.use('/api/auth', authRoutes)


server.listen(PORT, () => {
    connectDB()
    console.log(`Server is running on port ${PORT}`)
})