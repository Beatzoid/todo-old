import { Router } from "express";

import {
    createTask,
    deleteTask,
    editTask,
    getAllCompletedTasks,
    getAllTasks,
    getAllTasksByCategory,
    getTasksForToday,
    toggleTaskStatus
} from "../controllers/task.controller";

import { authenticationMiddleware } from "../middleware";

const taskRouter = Router();

taskRouter.use(authenticationMiddleware);

taskRouter.route("/").get(getAllTasks);
taskRouter.route("/category/:id").get(getAllTasksByCategory);
taskRouter.route("/completed").get(getAllCompletedTasks);
taskRouter.route("/today").get(getTasksForToday);

taskRouter.route("/create").post(createTask);
taskRouter.route("/update/:taskId").put(toggleTaskStatus);
taskRouter.route("/edit").put(editTask);
taskRouter.route("/delete/:taskId").delete(deleteTask);

export default taskRouter;
