const express = require("express");

const { customAlphabet } = require("nanoid");
const nanoid = customAlphabet('1234567890abcdef_', 10);


const { handleEmptyData, handleUnexpectedError } = require("./helpers");
const { getDatabase } = require("../database");

const router = express.Router();

// handle login authentication
router.post("/", async (req, res) => {
  const { email, password } = req.body;
  if (email == null || password == null) {
	handleEmptyData(req, res);
  } else {
	try {
	  const client = getDatabase();
	  const { rows: user } = await client.query(`SELECT ID, USERNAME, PASSWORD FROM USERS WHERE EMAIL='${email}'`);

	  // If no user is found
	  if (user.length == 0) {
		res.json({ message: "Could not find user" });
	  } 

	  // If the password is incorrect
	  if (user[0].password != password) {
		res.json({ message: "Incorrect password" });
	  }

	  res.json({
		message: "ok",
		data: { uuid: user[0].id }
	  });

	  client.end();
	} catch (error) {
	  handleUnexpectedError(res, error);
	}
  }
});

module.exports = router;

