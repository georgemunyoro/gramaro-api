const express = require("express");
const cors = require("cors");

const { fetchUsers, handleUnexpectedError } = require("./routes/helpers");

require("dotenv/config");

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const signupRoute = require("./routes/signup");
const loginRoute = require("./routes/login");
const userRoute = require("./routes/user");
const notesRoute = require("./routes/notes");

app.use("/signup", signupRoute);
app.use("/login", loginRoute);
app.use("/user", userRoute);
app.use("/notes", notesRoute);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "gramaro notes api v0.0.1",
  });
});

app.get("/users", async (_req, res) => {
  fetchUsers((error, users) => {
    if (error) {
      handleUnexpectedError(res, error);
    } else {
      res.status(200).json({
        message: "ok",
        data: {
          users: users,
        },
      });
    }
  });
});

const PORT = process.env.CI ? 5432 : process.env.PORT || 1234;

app.listen(PORT, (error) => {
  if (error) {
    throw err;
  }
  console.log(`Server listening on PORT:${PORT}`);
});

module.exports = app;
