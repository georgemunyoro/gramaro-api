const express = require("express");

const { customAlphabet } = require("nanoid");
const nanoid = customAlphabet('1234567890abcdef_', 10);

const { getDatabase } = require("../database"); 
const { handleEmptyData, handleUnexpectedError } = require("./helpers");

const router = express.Router();

router.post("/", async (req, res) => {
  const { username, password, email } = req.body;
  const uuid = nanoid(10);

  // ensure data sent is not empty or null
  if (username == null || password == null) {
	handleEmptyData(req, res);
  } else {
	try {
	  const client = getDatabase(); 

	  // check if the email has been used before
	  const { rows: accountsWithEmail } = await client.query(`SELECT * FROM USERS WHERE EMAIL='${email}'`);

	  if (accountsWithEmail.length != 0) {
		res.json({
		  message: "the email already exists",
		  data: null
		});
		return;
	  }

	  // if not, create the account
	  const queryValues = [uuid, username, password, email];
	  const { rows } = await client.query("INSERT INTO USERS(ID, USERNAME, PASSWORD, EMAIL) VALUES($1, $2, $3, $4)", queryValues);
	  res.json({
		message: "user created successfully",
		data: {
		  createdUser: {
			id: uuid,
			username: username,
			password: password,
			email: email
		  },
		  rows: rows || null
		}
	  });

	  client.end();
	} catch (error) {
	  handleUnexpectedError(req, res, error);
	}
  }
});

module.exports = router;

