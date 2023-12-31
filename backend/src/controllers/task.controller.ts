import { Response } from "express";

import { AuthRequest } from "../middleware";

import { handleError } from "../utils/handleError";

import Task from "../models/taskModel";
import { ITask } from "../types";

export const getAllTasks = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user;

        const tasks = await Task.find({ user: userId });

        return res.json(tasks);
    } catch (error) {
        handleError(error, res);
        return;
    }
};

export const getAllTasksByCategory = async (
    req: AuthRequest,
    res: Response
) => {
    try {
        const userId = req.user;

        const { id } = req.params;

        const tasks = await Task.find({ user: userId, categoryId: id });

        return res.json(tasks);
    } catch (error) {
        handleError(error, res);
        return;
    }
};

export const getAllCompletedTasks = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user;

        const tasks = await Task.find({ user: userId, isCompleted: true });

        return res.json(tasks);
    } catch (error) {
        handleError(error, res);
        return;
    }
};

export const getTasksForToday = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user;

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const tasks = await Task.find({
            user: userId,
            date: today.toISOString()
        });

        return res.json(tasks);
    } catch (error) {
        handleError(error, res);
        return;
    }
};

export const createTask = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user;

        const { name, date, categoryId }: ITask = req.body;

        const task = await Task.create({
            name,
            date,
            categoryId,
            user: userId
        });

        return res.json(task);
    } catch (error) {
        handleError(error, res);
        return;
    }
};

export const toggleTaskStatus = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user;

        const { taskId } = req.params;
        const { isCompleted } = req.body;

        const task = await Task.findOne({ _id: taskId, user: userId });

        if (!task) {
            return res.status(404).json({ err: "Task not found" });
        }

        task.isCompleted = isCompleted;

        await task.save();

        return res.json({ msg: "Successfully updated task" });
    } catch (error) {
        handleError(error, res);
        return;
    }
};

export const deleteTask = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user;
        const { taskId } = req.params;

        const task = await Task.findOne({ _id: taskId, user: userId });

        if (!task) {
            return res.status(404).json({ err: "Task not found" });
        }

        await task.deleteOne();

        return res.json({ msg: "Successfully deleted task" });
    } catch (error) {
        handleError(error, res);
        return;
    }
};

export const editTask = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user;
        const { _id, categoryId, date, name }: ITask = req.body;

        const task = await Task.findOne({ _id, user: userId });

        if (!task) {
            return res.status(404).json({ err: "Task not found" });
        }

        await task.updateOne({ name, categoryId, date });

        await task.save();

        return res.json({ msg: "Successfully updated task" });
    } catch (error) {
        handleError(error, res);
        return;
    }
};
