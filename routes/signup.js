const express = require("express");

const { customAlphabet } = require("nanoid");
const nanoid = customAlphabet("1234567890abcdef_", 10);

const { getDatabaseConnection } = require("../database");
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
      const client = getDatabaseConnection();

      // check if the email has been used before
      const { rows: accountsWithEmail } = await client.query(
        `SELECT * FROM USERS WHERE EMAIL='${email}'`
      );

      if (accountsWithEmail.length != 0) {
        res.json({
          message: "The email is already registered to a user",
          data: null,
        });
        return;
      }

      // if not, create the account
      const queryValues = [uuid, username, password, email];
      const { rows } = await client.query(
        "INSERT INTO USERS(ID, USERNAME, PASSWORD, EMAIL) VALUES($1, $2, $3, $4)",
        queryValues
      );
      res.json({
        message:
          "Your account was created successfully and you are now logged in",
        data: {
          createdUser: {
            id: uuid,
            username,
            email,
            password,
          },
          rows: rows || null,
        },
      });

      client.end();
    } catch (error) {
      handleUnexpectedError(req, res, error);
    }
  }
});

module.exports = router;
