import { config } from "dotenv";
config();

import express, { Request, Response } from "express";

import connectToDatabase from "./db";

const app = express();

const PORT = 4000;

connectToDatabase();

app.get("/ping", (_: Request, res: Response) => {
    res.send("Pong!");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
