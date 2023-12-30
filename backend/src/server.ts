import { config } from "dotenv";
config();

import express, { Request, Response } from "express";

import connectToDatabase from "./db";

import userRoutes from "./routes/user.route";
import morgan from "morgan";

const app = express();

app.use(morgan("dev"));
app.use(express.json());

const PORT = 4000;

connectToDatabase();

app.get("/ping", (_: Request, res: Response) => {
    res.send("Pong!");
});

app.use("/user", userRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
