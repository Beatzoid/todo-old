import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/userModel";

import { IUser } from "../types/index";
import { Types } from "mongoose";

const createUserToken = (_id: string | Types.ObjectId) => {
    const authenticatedUserToken = jwt.sign({ _id }, process.env.JWT_TOKEN!, {
        expiresIn: "7d"
    });

    return authenticatedUserToken;
};

export const createUser = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser)
            return res.status(409).json({ err: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 12);

        await User.create({
            name,
            email,
            password: hashedPassword
        });

        return res.status(201).json({ msg: "User successfully created" });
    } catch (error) {
        console.error("Error in create user", error);
        return res.status(500).json({ err: "Internal server error" });
    }
};

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password }: IUser = req.body;

        const user = await User.findOne({ email });

        if (!user) return res.status(400).json({ err: "User doesn't exist" });

        const passwordCorrect = await bcrypt.compare(password, user.password);

        if (passwordCorrect) {
            const token = createUserToken(user._id);
            return res.json({
                token,
                user: { email: user.email, name: user.name }
            });
        } else {
            return res.status(400).json({ err: "Invalid credentials" });
        }
    } catch (error) {
        console.error("Error in login user", error);
        return res.status(500).json({ err: "Internal server error" });
    }
};
