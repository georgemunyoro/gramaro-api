import Express from "express";
import morgan from "morgan";
import cors from "cors";
import { version } from "../package.json";
import rootRouter from "./routes";

const { fetchUsers, handleUnexpectedError } = require("./utils");

require("dotenv/config");

const app = Express();

app.use(morgan("dev"));
app.use(cors());
app.use(Express.urlencoded({ extended: true }));
app.use(Express.json());

app.use("/", rootRouter);

const PORT = process.env.CI ? 5432 : process.env.PORT || 1234;

app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});

module.exports = app;
