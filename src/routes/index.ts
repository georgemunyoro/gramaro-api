import Express from "express";
import loginRouter from "./login";
import notesRouter from "./note";
import usersRouter from "./user";
import { version } from "../../package.json";

const rootRouter = Express.Router();

rootRouter.use("/login", loginRouter);
rootRouter.use("/user", usersRouter);
rootRouter.use("/note", notesRouter);

rootRouter.get("/", (req, res) => {
  res.status(200).json({
    message: `gramaro notes api v${version}`,
  });
});

export default rootRouter;
