const express = require("express");
const cors = require("cors");

const { fetchUsers, handleUnexpectedError, handleEmptyData } = require("./routes/helpers");
const { getDatabase } = require("./database");
const { nanoid } = require("nanoid");

require("dotenv/config");

const app = express();

app.use(cors())
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
	message: "gramaro notes api v0.0.1"
  })
});

// return a list of all users
app.get("/users", async (req, res) => {
  fetchUsers((error, users) => {
	if (error) {
	  handleUnexpectedError(res, error);
	} else {
	  res.status(200).json({
		message: "ok",
		data: {
		  users: users
		}
	  })
	}
  })
})

const PORT = process.env.PORT || 3001;

app.listen(PORT, (error) => {
  if (error) {
	throw err;
  }
  console.log(`Started on PORT:${PORT}`);
});

