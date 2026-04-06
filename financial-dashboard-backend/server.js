import express from 'express';
import mongoose from 'mongoose';
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import authRoutes from "./APIs/authRoutes.js";
import userRoutes from "./APIs/userRoutes.js";
import recordRoutes from "./APIs/recordRoutes.js";
import dashboardRoutes from "./APIs/dashboardRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());


app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/records", recordRoutes);
app.use("/dashboard", dashboardRoutes);


app.use(errorMiddleware);

async function connectToDBAndStartServer() {
    try {
        await mongoose.connect(process.env.MONGO_URL); 

        console.log("Database connected");

        app.listen(process.env.PORT || 5000, () => {
            console.log("Server running on port", process.env.PORT);
        });

    } catch (err) {
        console.log("Error in connection:", err.message);
        process.exit(1);
    }
}

connectToDBAndStartServer();