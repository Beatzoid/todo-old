import { Router } from "express";

import {
    createCategory,
    deleteCategory,
    updateCategory,
    getAllCategories
} from "../controllers/category.controller";

import { authenticationMiddleware } from "../middleware";

const categoryRouter = Router();

categoryRouter.use(authenticationMiddleware);

categoryRouter.route("/").get(getAllCategories);
categoryRouter.route("/create").post(createCategory);
categoryRouter.route("/delete/:id").delete(deleteCategory);
categoryRouter.route("/update").put(updateCategory);

export default categoryRouter;
