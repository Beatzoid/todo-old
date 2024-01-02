import { config } from "dotenv";
config();

import express, { Request, Response } from "express";

import morgan from "morgan";
import cors from "cors";

import connectToDatabase from "./db";

import userRoutes from "./routes/user.route";
import categoryRoutes from "./routes/category.route";
import taskRoutes from "./routes/task.route";

const app = express();

const corsOptions = {
    // origin: "*",
    // methods: "*",
    // allowedHeaders: "*",
    // credentials: true
};

app.use(morgan("dev"));
app.use(express.json());

app.use(cors(corsOptions));

connectToDatabase();

app.get("/ping", (_: Request, res: Response) => {
    res.send("Pong!");
});

app.use("/users", userRoutes);
app.use("/categories", categoryRoutes);
app.use("/tasks", taskRoutes);

app.listen(process.env.PORT || 4000, () => console.log("Server running"));
