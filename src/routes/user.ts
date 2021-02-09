import makeExpressCallback from "../expressCallback";
import { getUsers, deleteUser, updateUser, createUser } from "../controllers";

const express = require("express");
const userRouter = express.Router();

userRouter.get("/:id", makeExpressCallback(getUsers));
userRouter.delete("/:id", makeExpressCallback(deleteUser));
userRouter.patch("/:id", makeExpressCallback(updateUser));
userRouter.post("/", makeExpressCallback(createUser));

export default userRouter;
