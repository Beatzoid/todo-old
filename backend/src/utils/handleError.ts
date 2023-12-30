import { Response } from "express";

export const handleError = async (error: any, res: Response) => {
    console.error("Error", error);
    return res.status(500).json({ err: "Internal server error" });
};
