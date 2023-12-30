import { Router } from "express";
import { createUser, loginUser } from "../controllers/user.controller";

const userRouter = Router();

userRouter.route("/create").post(createUser);
userRouter.route("/login").post(loginUser);

export default userRouter;
