import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import User from "../models/userModel";

export interface AuthRequest extends Request {
    user?: string;
}

export const authenticationMiddleware = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const { authorization: token } = req.headers;

        if (!token) return res.status(401).json({ err: "Unauthorized" });

        const { _id } = jwt.verify(token, process.env.JWT_TOKEN!) as {
            _id: string;
        };

        const user = await User.findOne({ _id });

        if (user) {
            req.user = user.id;
        }

        next();
    } catch (error) {
        console.error("Error in authentication middleware", error);
        throw error;
    }
};
