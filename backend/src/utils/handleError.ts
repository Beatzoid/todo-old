import { Response } from "express";

export const handleError = async (error: unknown, res: Response) => {
    console.error("Error", error);
    return res.status(500).json({ err: "Internal server error" });
};
