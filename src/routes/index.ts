import Express from "express";
import loginRouter from "./login";
import notesRouter from "./notes";
import signupRouter from "./signup";
import usersRouter from "./user";
import { version } from "../../package.json";

const rootRouter = Express.Router();

rootRouter.use("/signup", signupRouter);
rootRouter.use("/login", loginRouter);
rootRouter.use("/user", usersRouter);
rootRouter.use("/notes", notesRouter);

rootRouter.get("/", (req, res) => {
  res.status(200).json({
    message: `gramaro notes api v${version}`,
  });
});

export default rootRouter;
