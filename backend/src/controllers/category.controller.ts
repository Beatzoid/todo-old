import { Response } from "express";

import Category from "../models/categoryModel";

import { ICategory } from "../types";
import { AuthRequest } from "../middleware";

import { handleError } from "../utils/handleError";

export const getAllCategories = async (req: AuthRequest, res: Response) => {
    try {
        const user = req.user;

        const categories = await Category.find({ user });

        return res.json(categories);
    } catch (error) {
        handleError(error, res);
        return;
    }
};

export const createCategory = async (req: AuthRequest, res: Response) => {
    try {
        const { color, icon, isEditable, name }: ICategory = req.body;
        const user = req.user;

        const category = await Category.create({
            color,
            icon,
            isEditable,
            name,
            user
        });

        return res.status(201).json(category);
    } catch (error) {
        handleError(error, res);
        return;
    }
};

export const deleteCategory = async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;
        const user = req.user;

        const category = await Category.findOne({ _id: id, user });

        if (!category)
            return res.status(404).json({ msg: "Category not found" });

        if (!category.isEditable)
            return res.status(400).json({ msg: "Category is read-only" });

        await category.deleteOne();

        return res.json({ msg: "Category deleted" });
    } catch (error) {
        handleError(error, res);
        return;
    }
};

export const updateCategory = async (req: AuthRequest, res: Response) => {
    try {
        const { _id, color, icon, isEditable, name }: ICategory = req.body;

        if (!isEditable)
            return res.status(400).json({ msg: "Category is read-only" });

        await Category.updateOne(
            { _id },
            { $set: { name, color, icon, isEditable } }
        );

        return res.json({ msg: "Category updated successfully" });
    } catch (error) {
        handleError(error, res);
        return;
    }
};
